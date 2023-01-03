FROM node:16-alpine

WORKDIR /app/nestjs

COPY . .
RUN npm update
RUN npm install
RUN npm install -g @nestjs/cli
CMD npm run start:dev
