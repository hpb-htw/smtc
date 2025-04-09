#!/bin/bash

DEMO=demo
DOC_REPO=zmdc-doc

install() {
    npm install
    pushd DEMO
    npm install
    popd
}

aux_replace_path() {
    sed -i "s|$(pwd)|/tmp|g" coverage/*
}

build() {
    npm run clean
    npm run build
    npm run test
    aux_replace_path
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
    # copy manual doc to $DOC_REPO
    cp -rfL ${DEMO}/www/* ${DOC_REPO}
    # copy coverage to $DOC_REPO
    cp -rf coverage ${DOC_REPO}
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
#build_demo
commit_change
deploy
#publish