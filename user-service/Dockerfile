# Stage 1: Build the application
FROM node:22 AS builder

# Declare build-time arguments
ARG DATABASE_URL
ARG NATS_URL

# Set environment variables in the Docker image
ENV DATABASE_URL=$DATABASE_URL
ENV NATS_URL=$NATS_URL

# WORKDIR /app

COPY lib /lib
COPY user-service/package*.json /user-service/
RUN cd user-service && npm install

# COPY ../lib /lib
# COPY lib /lib
# COPY user-service/ .
RUN cd user-service && npm run build

# Stage 2: Run the application
FROM node:22

# Declare build-time arguments
ARG DATABASE_URL
ARG NATS_URL

# Set environment variables in the Docker image
ENV DATABASE_URL=$DATABASE_URL
ENV NATS_URL=nats://nats-streaming:4222

# WORKDIR /app

COPY user-service/package*.json /user-service/
RUN cd user-service && npm install --only=production

# COPY --from=builder /app/dist ./dist

COPY --from=builder /user-service/dist /user-service/dist

EXPOSE 3000

CMD ["node", "dist/app/src/main"]