FROM alpine:3.16 as development
ENV NODE_VERSION 19.6.0
WORKDIR /usr/src/app
COPY package*.json .
RUN sudo npm cache clean --force
RUN npm install
COPY . .
RUN npm run build
FROM node:16-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci --only=production
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/index.js"]

