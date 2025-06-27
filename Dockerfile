FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /node-app

COPY ./package.json ./

RUN npm install --production

COPY ./index.js ./
COPY ./server.js ./

EXPOSE 8040

# 启动应用
CMD ["node", "index.js"]