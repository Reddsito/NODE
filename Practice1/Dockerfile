FROM node:16


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN apt-get update && apt-get install -y tzdata

# Configure date and hour
ENV DEBIAN_FRONTEND=noninteractive
ENV  TZ='America/Panama'

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]