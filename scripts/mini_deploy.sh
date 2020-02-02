#!/bin/sh

GATSBY_SOURCE=mini npm run build
rm -fr ./.git-deploy
mkdir .git-deploy
cp -r public/ ./.git-deploy
cd .git-deploy
git init
git remote add minidokku dokku@ertrzyiks.me:mini-yummy
git add .
git commit -m 'Update'
git push minidokku master --force
