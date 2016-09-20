#!/bin/bash

# generate logstash configuration
envsubst < ./logstash/logstash-template.conf > ./logstash/logstash.conf
envsubst < docker-compose-template.yml > docker-compose.yml

export LOGSTASH_CONFIG=$(cat ./logstash/logstash.conf | sed ':a;N;$!ba;s/\n/ /g')

# eventually, generate stackfile
envsubst < stackfile-template.yml > stackfile.yml