#!/usr/bin/env bash
set -e

docker run --rm \
  -v /srv/certbot/conf:/etc/letsencrypt \
  -v /srv/acme:/var/www/acme \
  m.daocloud.io/docker.io/certbot/certbot renew --webroot -w /var/www/acme --quiet

docker exec blog nginx -s reload || true
