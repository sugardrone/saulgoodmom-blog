// Cloudflare Worker: 反向代理到阿里云源站
// 通过 sslip.io 连接源站 8880 端口（阿里云 ICP DPI 只拦 80/443，
// 且 8880 是 Cloudflare Workers 出站 fetch 允许的端口），
// 回源 Host 显式设为裸 IP。
// 绑定路由: suncar.live/*  和  www.suncar.live/*

const ORIGIN = 'http://121.41.26.131.sslip.io:8081';

export default {
  async fetch(request) {
    const url = new URL(request.url);
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
