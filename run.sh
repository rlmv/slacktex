#!/usr/bin/env bash

set -e

log="forever.log"
touch ~/.forever/$forever.log

source config.sh
forever start -a -l $log --minUptime=1000 --spinSleepTime=null bot.js
forever list
