#!/bin/sh

rm -fr ./.git-deploy
npm run build
mkdir .git-deploy
cp -r public/* ./.git-deploy
touch ./.git-deploy/.static
cd .git-deploy
git init
git remote add dokku dokku@ertrzyiks.me:yummy
git add .
git commit -m 'Update'
git push dokku master --force
