FROM m.daocloud.io/docker.io/library/node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com \
    && npm install --omit=dev

COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "app.js"]
