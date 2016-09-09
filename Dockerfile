FROM node:6.5.0
MAINTAINER Bertrand Martel "bmartel.fr@gmail.com"

# install pm2 (node package manager) & setup pm2 start script
RUN npm install -g pm2

ADD service /app
ADD start.sh /var/www/
RUN chmod +x /var/www/start.sh

EXPOSE 80

WORKDIR /app

RUN mkdir -p log
RUN npm install

ENV APP "app.js"

CMD ["/var/www/start.sh"] 