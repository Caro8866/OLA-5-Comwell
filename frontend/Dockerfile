# Use a Node.js base image with alpine linux to reduce image size
FROM node:20.3.1-alpine

# Set the working directory to /frontend within the container 
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /frontend
COPY . .

# Build the app
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]
