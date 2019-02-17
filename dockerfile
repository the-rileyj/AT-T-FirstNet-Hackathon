FROM node:10.15.1-alpine AS Front-End-Builder

COPY .npmrc package-lock.json package.json tsconfig.json ./

RUN npm install

COPY ./src ./src
COPY ./public ./public

RUN npm run build

FROM nginx:latest

EXPOSE 80

RUN rm -rf /usr/share/nginx/html/*

COPY --from=Front-End-Builder /build /usr/share/nginx/html

# COPY ./back-end/file-server/data/RJcert.crt /etc
# COPY ./back-end/file-server/data/RJsecret.key /etc

COPY ./back-end/file-server/nginx.conf /etc/nginx/nginx.conf
