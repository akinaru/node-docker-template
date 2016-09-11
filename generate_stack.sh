#!/bin/bash

# generate logstash configuration
envsubst < ./logstash/logstash.conf > ./logstash/logstash-expand.conf

export LOGSTASH_CONFIG=$(cat ./logstash/logstash-expand.conf | sed ':a;N;$!ba;s/\n/ /g')

# eventually, generate stackfile
envsubst < stackfile-template.yml > stackfile.yml