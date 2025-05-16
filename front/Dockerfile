FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4173

RUN npm run build

CMD [ "npm" , "run" , "preview" ]