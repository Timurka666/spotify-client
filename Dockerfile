FROM node:18

WORKDIR /spotify-client

COPY . .

RUN npm i

RUN npm run build

CMD [ "npm", "start" ]