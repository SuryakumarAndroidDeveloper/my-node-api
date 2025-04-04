FROM node:14.21.3
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
# If you are building your code for production
# RUN npm install --only=production
COPY . /usr/src/app
EXPOSE 8080
CMD [ "npm", "start" ]