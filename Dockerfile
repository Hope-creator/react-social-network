# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12
# install package manager
RUN npm i -g npm@latest
# copy package.json into the container at /client
COPY package.json .
# install dependencies
RUN npm install
# Run the app when the container launches
RUN npm run build-prod