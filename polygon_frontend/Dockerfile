FROM node:12.2.0-alpine

# Will create a directory, and sets the working directory, so you won't have to specify it in most later commands
WORKDIR /polygon_frontend

COPY package.json package.json
RUN npm install
COPY . .
CMD ["npm", "start"]

