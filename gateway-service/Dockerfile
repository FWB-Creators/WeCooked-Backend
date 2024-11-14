# Stage 1: Build the application
FROM node:22

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g prisma
COPY . .
RUN npm run build
RUN npm run prisma:generate
EXPOSE 3000
CMD ["sh", "-c", " npm run prisma:push && npm run start:dev"]
# CMD ["sh", "run.sh"]