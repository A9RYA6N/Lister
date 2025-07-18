# Use and official node.js runtime environment as a parent image
FROM node:22-alpine

#Set the working directory in the container
WORKDIR /app

#Copy the package.json and package-lock.json files to the container
COPY package*.json .

#Install dependencies
RUN npm install

#copy the rest of the code
COPY . .


# Build the TS code
RUN npm run build

#Expose the port that the app runs on
EXPOSE 5003

#Command to run your application
CMD ["npm", "start"]