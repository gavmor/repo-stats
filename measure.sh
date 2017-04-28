#!/bin/sh -e

source ./git-log2json.sh
source ./git-stat2json.sh

pushd $1
tmp=$(mktemp -d)
stats > $tmp/stats.json
logs > $tmp/logs.json
popd

node merge.js $tmp
