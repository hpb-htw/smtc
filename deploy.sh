#!/bin/bash

DEMO=demo
DOC_REPO=zmdc-doc

install() {
    npm install
    pushd DEMO
    npm install
    popd
}


build() {
    npm run clean
    npm run build
    npm pack
}

build_demo() {
    pushd $DEMO
    npm run build
    popd
}

commit_change() {
  git commit -a -m "auto-commit $(date +"%Y-%m-%dT%H:%M:%S%:z")"
  git push origin master
}

# deploy the document to github page
deploy() {
    git -C ${DOC_REPO} checkout master
    git -C ${DOC_REPO} status .
    rm -rf ${DOC_REPO}/*
    cp -rf ${DEMO}/www/* ${DOC_REPO}
    git -C ${DOC_REPO} add --all
    git -C ${DOC_REPO} commit -a -m "auto commit"
    git -C ${DOC_REPO} push origin master
}

publish() {
  cp npmrc.template .npmrc
  npm publish
}

install
build
build_demo
commit_change
deploy
#publish