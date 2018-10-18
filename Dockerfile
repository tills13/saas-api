FROM mhart/alpine-node:10.9

WORKDIR /code
ADD . /code

RUN apk add --update git python build-base ca-certificates wget libpq postgresql-dev
RUN apk add --virtual build-deps build-base gcc
RUN yarn && npm rebuild bcrypt ----build-from-source
RUN apk del python git build-base wget ca-certificates postgresql-dev
RUN rm -rf /var/cache/apk/*

CMD [ "yarn", "start" ]
EXPOSE 3000
