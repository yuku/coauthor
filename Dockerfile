# syntax=docker/dockerfile:1
# check=error=true

# Variables
ARG BUILDER_APP_DIR=/app
ARG RUNNER_APP_DIR=/app

# Builder stage
FROM node:20-alpine3.18 AS builder

ARG BUILDER_APP_DIR

WORKDIR ${BUILDER_APP_DIR}
ENV NODE_ENV=production

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

RUN <<EOF
corepack enable
yarn install --immutable
EOF

COPY . .

RUN <<EOF
yarn build
yarn workspaces focus --all --production
EOF


# Runner stage
FROM node:20-alpine3.18 AS runtime

ARG BUILDER_APP_DIR
ARG RUNNER_APP_DIR

WORKDIR ${RUNNER_APP_DIR}

ENV NODE_ENV=production

COPY --from=builder ${BUILDER_APP_DIR}/build ./build
COPY --from=builder ${BUILDER_APP_DIR}/node_modules ./node_modules
COPY package.json ./

ENTRYPOINT ["./node_modules/.bin/remix-serve", "build/server/index.js"]
