FROM node:14

WORKDIR /usr/src/app
RUN mkdir images

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8088

CMD [ "node", "index.js" ]
