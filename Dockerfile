# https://hub.docker.com/r/oven/bun
FROM oven/bun:latest

COPY package.json ./
COPY bun.lock ./
COPY . ./

# Set the env CI to true
ENV CI=true

# Install dependencies
RUN bun install

# Build the app
RUN bun run build

# Serve the app using the server index.js file
CMD ["bun", "start"]
