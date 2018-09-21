#!/bin/bash

set -o errexit

yarn && yarn build

scp -r build/app/* sbstn:/var/www/saas.sbstn.ca/server
scp package.json sbstn:/var/www/saas.sbstn.ca/server/
scp yarn.lock sbstn:/var/www/saas.sbstn.ca/server/
scp -r src/assets sbstn:/var/www/saas.sbstn.ca/server/static
scp -r config sbstn:/var/www/saas.sbstn.ca/server
