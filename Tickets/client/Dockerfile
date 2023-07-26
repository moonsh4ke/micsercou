FROM node:alpine

WORKDIR /app
COPY package.json .
run npm install
copy . .

CMD ["npm", "run", "dev"]
