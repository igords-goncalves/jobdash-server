FROM oven/bun:latest

WORKDIR /app

COPY bun.lock package.json tsconfig.json ./

RUN bun install

COPY . .

EXPOSE 3333

CMD ["bun", "start"]
