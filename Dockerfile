FROM node as builder
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /usr/src/app .

EXPOSE 3333
CMD ["node", "dist/src/start/httpserver.js"]
