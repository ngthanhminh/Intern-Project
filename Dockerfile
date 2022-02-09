FROM node:16-alpine

WORKDIR /app/nestjs

COPY . .
RUN npm install
CMD npm run start:dev