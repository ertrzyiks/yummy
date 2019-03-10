#!/bin/sh

npm run build
rm -fr ./.git-deploy
mkdir .git-deploy
cp -r public/ ./.git-deploy
cd .git-deploy
git init
git remote add dokku dokku@ertrzyiks.me:yummy
git add .
git commit -m 'Update'
git push dokku master --force
