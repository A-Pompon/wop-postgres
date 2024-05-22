FROM node:14

ENV NODE_ENV development

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "serve"]
