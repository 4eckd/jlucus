FROM node:14
RUN npm install -g grunt-cli
COPY . /app
RUN grunt build