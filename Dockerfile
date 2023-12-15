FROM --platform=$BUILDPLATFORM node:21-alpine as base
RUN corepack enable
WORKDIR /app
ENV CYPRESS_INSTALL_BINARY=0
COPY package.json pnpm-lock.yaml ./

FROM base as build
RUN pnpm i --frozen-lockfile
COPY src/ ./src/
COPY pages/ ./pages/
COPY renderer/ ./renderer/
COPY scripts/ ./scripts/
COPY vite.config.ts .swcrc ./
ENV NODE_ENV=production
RUN pnpm build

FROM base as cleanedDeps
RUN pnpm i --production --frozen-lockfile
RUN rm package.json
RUN pnpm dlx modclean -r -f -a '*.ts|*.tsx' -I 'example*'

FROM node:21-alpine
ENV NODE_ENV=production
ENV TZ=Europe/Berlin
WORKDIR /app
COPY --from=cleanedDeps /app/node_modules/ ./node_modules/
COPY package.json pnpm-lock.yaml /app/
RUN corepack enable && npm_config_update_binary=true pnpm rb
COPY --from=build /app/dist/ ./dist/
USER node
CMD [ "node", "dist/node/server/index.js" ]
