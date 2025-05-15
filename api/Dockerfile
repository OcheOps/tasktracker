FROM node:20-alpine

WORKDIR /api 

COPY /package*.json .

RUN npm install

COPY . .

EXPOSE 4001

CMD [ "node" , "index.js" ]
