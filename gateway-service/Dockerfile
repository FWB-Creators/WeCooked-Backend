# Use an official Node.js runtime as a base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port 3000
EXPOSE 3000

# Start the NestJS application
# CMD ["npm", "run", "start:prod"]
CMD [ "sh" , "run.sh" ]