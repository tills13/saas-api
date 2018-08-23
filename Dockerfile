FROM mhart/alpine-node:10.9

LABEL ImageBaseName=saas-api

ADD . /code

WORKDIR /code

RUN apk add --update git build-base python ca-certificates wget libpq postgresql-dev
RUN apk add --virtual build-deps build-base gcc
RUN yarn && npm rebuild bcrypt ----build-from-source
RUN apk del git python build-base wget ca-certificates postgresql-dev
RUN rm -rf /var/cache/apk/*

EXPOSE 3000
