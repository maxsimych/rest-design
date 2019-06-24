FROM node
WORKDIR /app
COPY . /app
EXPOSE 80
RUN npm i
CMD [ "node", "server.js" ]