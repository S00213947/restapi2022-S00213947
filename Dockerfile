# need to use the specific version of node that is dist is built 
#FROM node:16.16.0 AS builder
#WORKDIR /year3cocktail
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#FROM nginx:latest
#COPY --from=builder /year3cocktail/dist/year3cocktail /usr/share/nginx/html
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

#original docker file

FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "server.js"]