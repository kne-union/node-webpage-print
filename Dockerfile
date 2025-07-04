FROM ghcr.io/puppeteer/puppeteer:latest

# 安装字体配置工具
RUN apt-get update && apt-get install -y \
    fontconfig \
    --no-install-recommends

# 将字体文件复制到镜像中
COPY fonts/PingFang.ttc /usr/share/fonts/

# 更新字体缓存
RUN fc-cache -vf

WORKDIR /node-app

COPY ./package.json ./

RUN npm install --production

COPY ./index.js ./
COPY ./server.js ./

EXPOSE 8040

# 启动应用
CMD ["node", "index.js"]