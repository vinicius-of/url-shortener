FROM node:lts AS build
WORKDIR /apps
COPY yarn*.lock package*.json ./
RUN yarn install --frozen-lockfile && yarn run build 
COPY . .

FROM node:slim AS production
WORKDIR /apps
COPY --from=build /app /app

CMD ["node", "dist/apps/url_shortener/main"]