#!/usr/bin/env bash

set -e

apt-get update
apt-get install npm nodejs git

git clone https://github.com/rlmv/slacktex.git
cd slacktex
npm install
