FROM node:lts AS build
WORKDIR /apps
COPY yarn*.lock package*.json ./
RUN yarn install --frozen-lockfile
COPY . .

FROM node:slim AS production
WORKDIR /apps
COPY --from=build /app /app

CMD ["node", "dist/apps/auth/main"]