FROM mhart/alpine-node:9.1.0

LABEL ImageBaseName=saas-api

ADD . /code

WORKDIR /code

RUN apk add --update \
    git \
    build-base \
    python \
    ca-certificates \
    wget \
    libpq \
    postgresql-dev \
  && yarn && yarn cache clean \
  && apk del \
    git \
    python \
    build-base \
    wget \
    ca-certificates \
    libpq \
    postgresql-dev \
  && rm -rf /var/cache/apk/*

EXPOSE 3000
