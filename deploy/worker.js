// Cloudflare Worker: 反向代理到阿里云源站
// 通过 sslip.io 连接源站（避免 Worker 直连裸 IP 的 1003），
// 但把回源 Host 显式设为裸 IP（阿里云未备案 DPI 对裸 IP 放行）。
// 绑定路由: suncar.live/*  和  www.suncar.live/*

const ORIGIN = 'http://121.41.26.131.sslip.io';

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
