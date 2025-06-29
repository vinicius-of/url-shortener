#!/bin/bash

set -e

yarn typeorm migration:generate ./migrations/users/CreateUsersTable -d apps/users/src/entities/datasource.ts
yarn typeorm migration:generate ./migrations/auth/CreateLoginsTable -d apps/auth/src/entities/datasource.ts
yarn typeorm migration:generate ./migrations/url_shortener/CreateUrlsTable -d apps/url_shortener/src/entities/datasource.ts
