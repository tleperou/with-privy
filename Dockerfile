# https://hub.docker.com/r/oven/bun
FROM oven/bun:latest

COPY package.json ./
COPY bun.lock ./
COPY . ./

ENV CI=true

RUN bun install
RUN bun run build

CMD ["bun", "./server/entry.bun.js"]
