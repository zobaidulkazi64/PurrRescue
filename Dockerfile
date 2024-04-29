FROM node:20-alpine

WORKDIR /packages/services

COPY packages.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "build"]
