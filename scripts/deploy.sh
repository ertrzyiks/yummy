#!/bin/sh

rm -fr ./.git-deploy
npm run build
mkdir .git-deploy
cp -r public/* ./.git-deploy
touch ./.git-deploy/.static
cp ./app-nginx.conf.sigil ./.git-deploy
cd .git-deploy
git init
git remote add dokku dokku@ertrzyiks.me:yummy
git add .
git commit -m 'Update'
git push dokku master --force
