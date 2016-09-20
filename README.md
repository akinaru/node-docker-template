# NodeJS service docker template

[![Build Status](https://travis-ci.org/akinaru/node-docker-template.svg?branch=master)](https://travis-ci.org/akinaru/node-docker-template)
[![](https://images.microbadger.com/badges/version/akinaru/node-docker-template.svg)](https://microbadger.com/images/akinaru/node-docker-template)
[![](https://images.microbadger.com/badges/image/akinaru/node-docker-template.svg)](https://microbadger.com/images/akinaru/node-docker-template)

A dockerized NodeJS server template connected to a mongodb service with log export via logstash 

![](./img/architecture.png)

Check <a href="https://github.com/akinaru/docker-monitoring">docker-monitoring</a> for log & metrics platform architecture & docker-dompose configuration.

## Build

Edit your own configuration in `vars-template` :

```
source vars-template
./sourcing.sh
```

ElasticSearch https configuration require : 
* a `keystore.jks` in `key` directory

### docker-compose 

```
docker-compose up
```

### docker-cloud

```
docker-cloud stack create --name node-service -f stackfile.yml
docker-cloud stack start node-service
```
