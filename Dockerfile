# TODO: optimize Dockerfile and size by stages
FROM ubuntu:20.04
# Install nodejs
RUN apt-get update && apt-get install -y curl
RUN apt-get install -y libnss3 libxss1 libasound2 libatk-bridge2.0-0 libgtk-3-0 libgbm-dev
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get -y install nodejs
WORKDIR /app
COPY ["package.json", "./"]
COPY ["pnpm-lock.yaml", "./"]
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build
RUN echo "done"
