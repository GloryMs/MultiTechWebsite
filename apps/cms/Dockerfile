FROM node:18-alpine AS build

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1

WORKDIR /srv/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine

RUN apk add --no-cache vips-dev

WORKDIR /srv/app

COPY --from=build /srv/app ./

EXPOSE 1337

CMD ["sh", "-c", "npm run build && npm run start"]