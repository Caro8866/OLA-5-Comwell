# Use a Node.js base image with alpine linux to reduce image size
FROM node:20.3.1-alpine

# Set the working directory in the Docker image
WORKDIR /backend

# Copy the package.json and package-lock.json files from the local environment to the Docker image
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the current directory contents into the container at /backend
COPY . .

# Build the app
RUN npm run build

# # Copy entrypoint script and make it executable
# COPY entrypoint.sh .
# RUN chmod +x entrypoint.sh

# Expose port 5000 to the outside world
EXPOSE 5000

# Run the server
# RUN npm run start

# # Run the entrypoint script when the container launches
# CMD ["./entrypoint.sh"]
