# https://hub.docker.com/r/oven/bun
FROM oven/bun:latest

COPY package.json ./
COPY bun.lock ./
COPY . ./

ARG PUBLIC_PRIVY_APP_ID
ARG PRIVY_APP_SECRET

ENV PUBLIC_PRIVY_APP_ID=$PUBLIC_PRIVY_APP_ID
ENV PRIVY_APP_SECRET=$PRIVY_APP_SECRET

ENV CI=true

RUN bun install
RUN bun run build

CMD ["bun", "./server/entry.bun.js"]
