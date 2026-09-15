# Cloudflare Tunnel（cloudflared）

未备案域名走阿里云 VPS 的回源方案。阿里云 DPI 拦截一切入站的域名 HTTP/HTTPS
（Cloudflare Worker 反代也被针对），因此改用 **Tunnel**：VPS 主动向 Cloudflare
发起出站连接，域名流量经隧道到达 nginx，无任何入站端口依赖。

## DNS（Cloudflare 控制台）

- `suncar.live`  → CNAME `23ae2cbd-7daf-43cf-82af-53bbf70a9f23.cfargotunnel.com`（橙云代理）
- `www.suncar.live` → 同上

## VPS 上的文件（/srv/blog-nginx/cloudflared/）

- `config.yml`（本目录，随仓库同步）
- `creds.json`（隧道凭证，勿入库！内容见创建隧道时的 credentials_file，
  在 VPS 上手工创建并 `chmod 600`）

## 部署 / 更新

```bash
cd /srv/blog-nginx && docker compose up -d cloudflared
docker logs blog-cloudflared --tail 20
```
