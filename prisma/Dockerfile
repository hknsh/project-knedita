FROM node:14
RUN openssl version -v
RUN uname -a

WORKDIR /app

RUN npm install -g prisma --unsafe-perm

ADD . ./prisma/

CMD ["prisma", "migrate", "up"]