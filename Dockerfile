FROM node:22-alpine

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm docs:build

EXPOSE 4173

CMD ["pnpm", "exec", "vitepress", "preview", "docs", "--host", "0.0.0.0", "--port", "4173"]