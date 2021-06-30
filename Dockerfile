FROM node:latest

RUN npm install -g esbuild

WORKDIR /app/pogo-coding-challenge

EXPOSE 3000

CMD [ "yarn","start-dev" ]