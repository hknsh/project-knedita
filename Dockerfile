# LOCAL
FROM node:20-alpine AS dev

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma/

RUN npm ci

COPY --chown=node:node . .

USER node

# BUILD
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=dev /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=dev /usr/src/app/prisma ./prisma/
COPY --chown=node:node .husky ./.husky
COPY --chown=node:node tsconfig.json tsconfig.build.json ./
COPY --chown=node:node docker.env ./.env
COPY --chown=node:node . .

RUN npm install husky -g

RUN npm run prisma:generate

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

# PROD
FROM node:20-alpine as production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=build /usr/src/app/.husky ./.husky
COPY --chown=node:node --from=build /usr/src/app/.env ./
COPY --chown=node:node --from=build /usr/src/app/package*.json ./

CMD ["npm", "run" , "prod"]
