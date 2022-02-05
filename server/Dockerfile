# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12
# install package manager
RUN npm i -g npm@latest
# copy package.json into the container at /client
COPY . .
# install dependencies
RUN npm install
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD npm run start-dev