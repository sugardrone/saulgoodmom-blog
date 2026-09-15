// Cloudflare Worker: 反向代理到阿里云源站
// 通过 sslip.io 连接源站 8880 端口（阿里云 ICP DPI 只拦 80/443，
// 且 8880 是 Cloudflare Workers 出站 fetch 允许的端口），
// 回源 Host 显式设为裸 IP。
// 绑定路由: suncar.live/*  和  www.suncar.live/*

const ORIGIN = 'http://121.41.26.131.sslip.io:8081';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // 临时诊断端点：测试不同回源方式
    if (url.pathname === '/__probe') {
      const results = {};
      const probe = async (name, target, extraHeaders) => {
        try {
          const h = new Headers({ 'User-Agent': 'curl/8.0', 'Accept': '*/*' });
          if (extraHeaders) {
            for (const [k, v] of Object.entries(extraHeaders)) h.set(k, v);
          }
          const r = await fetch(target, { headers: h, redirect: 'manual' });
          const body = await r.text();
          results[name] = {
            status: r.status,
            icp: body.includes('ICP') || body.includes('beian'),
            title: (body.match(/<title>([^<]*)<\/title>/) || [])[1] || '',
          };
        } catch (e) {
          results[name] = 'ERR: ' + e.message;
        }
      };
      await probe('minimal_sslip_8081', ORIGIN + '/');
      await probe('explicit_host_bareip', ORIGIN + '/', { 'Host': '121.41.26.131' });
      await probe('with_cfworker_hdr', ORIGIN + '/', { 'CF-Worker': 'x.y.workers.dev' });
      await probe('with_xff', ORIGIN + '/', { 'X-Forwarded-For': '1.2.3.4' });
      await probe('direct_ip', 'http://121.41.26.131:8081/');
      return Response.json(results);
    }

    const target = ORIGIN + url.pathname + url.search;

    const headers = new Headers();
    for (const [k, v] of request.headers) {
      if (['host', 'cf-connecting-ip', 'cf-ipcountry', 'cf-ray', 'cf-visitor'].includes(k)) continue;
      headers.set(k, v);
    }
    headers.set('Host', '121.41.26.131');

    const init = {
      method: request.method,
      headers,
      redirect: 'manual',
    };
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      init.body = request.body;
    }

    const upstream = await fetch(target, init);
    const out = new Headers(upstream.headers);
    out.set('x-proxied-by', 'cf-worker');
    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: out,
    });
  },
};
