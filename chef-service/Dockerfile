# Stage 1: Build the application
FROM node:22 AS builder

# Declare build-time arguments
ARG DATABASE_URL
ARG NATS_URL

# Set environment variables in the Docker image
ENV DATABASE_URL=$DATABASE_URL
ENV NATS_URL=$NATS_URL

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:22

# Declare build-time arguments
ARG DATABASE_URL
ARG NATS_URL

# Set environment variables in the Docker image
ENV DATABASE_URL=$DATABASE_URL
ENV NATS_URL=nats://nats-streaming:4222

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]