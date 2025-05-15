FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
RUN npm install -g http-server

EXPOSE 4173
CMD ["http-server", "dist", "-p", "4173"]
