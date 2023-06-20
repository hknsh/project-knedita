FROM node:16 as builder

# Create app dir
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "prod:start"]