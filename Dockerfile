FROM node:18 as builder

# Create app dir
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install -D @swc/cli @swc/core
RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM node:18

WORKDIR /app

RUN npm i pm2 -g

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/dist ./dist/

RUN npm ci

EXPOSE 8080

CMD ["npm", "run", "prod:start"]