FROM node:latest as builder

ENV APP_ROOT / dist

ENV NODE_ENV production

WORKDIR ${APP_ROOT}

ADD . ${APP_ROOT}

RUN npm ci

RUN npm run build

CMD ["npm", "run", "start"]
