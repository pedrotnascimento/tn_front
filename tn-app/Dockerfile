
FROM node:18-alpine  as compile-proj
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:production

FROM node:18-alpine
WORKDIR /app
ARG REACT_APP_PRODUCTION
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_PRODUCTION=$REACT_APP_PRODUCTION
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
COPY --from=compile-proj /app/build ./build
EXPOSE 3000
CMD [ "npx", "serve", "build" ]