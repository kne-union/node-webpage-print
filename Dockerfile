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

# 设置苹方为系统默认字体（通过修改fontconfig配置）
RUN mkdir -p /etc/fonts/conf.d && \
    echo '<?xml version="1.0"?> \
    <!DOCTYPE fontconfig SYSTEM "fonts.dtd"> \
    <fontconfig> \
        <match target="pattern"> \
            <test qual="any" name="family"> \
                <string>sans-serif</string> \
            </test> \
            <edit name="family" mode="prepend" binding="strong"> \
                <string>PingFang SC</string> \
            </edit> \
        </match> \
    </fontconfig>' > /etc/fonts/conf.d/65-pingfang.conf

# 验证字体安装
RUN fc-list | grep "PingFang"

COPY ./package.json /app_build/

COPY ./server/package.json /node-app/

RUN cd /app_build && npm install

RUN cd /node-app && npm install --production

WORKDIR /app_build

COPY . .

RUN npm run build

WORKDIR /node-app

COPY ./server/* ./

RUN cp -r /app_build/build ./build

EXPOSE 8040

# 启动应用
CMD ["npm", "run", "start"]