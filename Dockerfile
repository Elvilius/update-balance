FROM node:latest
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --silent && npm cache clean --force

COPY tsconfig*.json ./
COPY src ./src

RUN npm run build
CMD ["npm", "run", "start:dev"]
