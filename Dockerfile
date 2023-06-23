FROM node:16 as builder

# Create app dir
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install pm2 -g
RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM node:16

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/dist ./dist/

RUN npm ci

EXPOSE 8080

CMD ["npm", "run", "prod:start"]