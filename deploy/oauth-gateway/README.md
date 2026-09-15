# OAuth Gateway（Decap CMS GitHub 登录网关）

Decap CMS（`/admin`）通过 GitHub OAuth 登录。OAuth App 的 client secret
不能暴露在静态页面里，因此需要一个服务端做 code→token 交换，本目录即该服务。

- 上游源码：https://github.com/vencax/netlify-cms-github-oauth-provider （MIT）
- 以 Docker 容器运行，仅监听内部 3000 端口，由 nginx 在 `https://suncar.live/oauth/` 反代
- GitHub OAuth App 回调地址须为：`https://suncar.live/oauth/callback`

## 环境变量（VPS 上 /srv/blog-nginx/oauth-gateway.env）

```ini
ORIGINS=suncar.live
OAUTH_CLIENT_ID=<GitHub OAuth App Client ID>
OAUTH_CLIENT_SECRET=<GitHub OAuth App Client Secret>
REDIRECT_URL=https://suncar.live/oauth/callback
PORT=3000
```

## 部署 / 更新（在 VPS 上，仓库部署于 /srv/blog-nginx）

```bash
cd /srv/blog-nginx
docker compose up -d --build oauth-gateway
docker compose restart blog   # nginx.conf 变更后
```
