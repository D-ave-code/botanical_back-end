FROM node:18.18.0-slim
WORKDIR /app
COPY . .
VOLUME ["/postgres-data1"]
COPY  /postgres-data1 /postgres-data1
RUN npm install
CMD [ "npm","run","start:dev" ]