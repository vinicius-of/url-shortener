FROM node:lts AS build
WORKDIR /app
COPY yarn*.lock package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run migration:generate:auth
RUN yarn run migration:run:auth
RUN yarn run build

FROM node:lts-slim AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/yarn.lock ./
COPY --from=build /app/db ./db

CMD ["node", "dist/apps/auth/main"]
