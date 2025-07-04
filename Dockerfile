FROM ghcr.io/puppeteer/puppeteer:latest

# 安装字体配置工具
# 切换到root用户
USER root

# 修复权限问题
RUN mkdir -p /var/lib/apt/lists/partial && \
    chmod -R 777 /var/lib/apt/lists/

# 更新并安装软件包
RUN apt-get update && \
    apt-get install -y \
    fontconfig \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

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