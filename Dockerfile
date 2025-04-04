# Use Node.js LTS version
FROM node:14.21.3

RUN mkdir -p /usr/src/app

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies first
COPY package.json /usr/src/app/

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Copy rest of the project files
COPY . /usr/src/app

# Expose port (adjust if your app uses a different one)
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]