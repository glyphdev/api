# DOCKERFILE
# https://docs.docker.com/engine/reference/builder
# https://github.com/BretFisher/node-docker-good-defaults
# https://github.com/nodejs/docker-node#nodealpine

# dependencies
# INSTALL DEPENDENCIES
FROM node:22.14.0-alpine As dependencies

ARG NODE_ENV production

ENV HUSKY 0
ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY .yarn ./.yarn
COPY .yarnrc.yml ./.yarnrc.yml
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
RUN yarn
ENV PATH /app/node_modules/.bin:$PATH

# code
# COPY SOURCE CODE
FROM dependencies As code

WORKDIR /app
COPY src ./src
COPY tsconfig.json ./tsconfig.json
