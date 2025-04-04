# DOCKERFILE
# https://docs.docker.com/engine/reference/builder
# https://docs.docker.com/reference/dockerfile
# https://github.com/BretFisher/node-docker-good-defaults
# https://github.com/nodejs/docker-node#nodealpine

# dependencies
# INSTALL DEPENDENCIES
FROM node:22.14.0-alpine AS dependencies

ENV HUSKY=0

WORKDIR /app
COPY .yarn ./.yarn
COPY .yarnrc.yml ./.yarnrc.yml
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
RUN yarn workspaces focus --production
ENV PATH=/app/node_modules/.bin:$PATH

# code
# COPY SERVER CODE
FROM dependencies AS code

WORKDIR /app
COPY src ./src

# runner
# RUN SERVER
FROM node:22.14.0-alpine AS runner

ENV HOST=0.0.0.0
ENV HOSTNAME=localhost
ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /app
COPY --from=code /app/src ./src
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./package.json
EXPOSE $PORT 9229
ENV PATH=/app/node_modules/.bin:$PATH
CMD ["bun", "run", "./src/main.mts"]
