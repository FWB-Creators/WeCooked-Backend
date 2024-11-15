######### First Stage #############

FROM node:20-alpine AS development

WORKDIR /app

COPY . .

RUN npx prisma generate \
    && npm run build


######### Second Stage #############

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/prisma ./prisma
COPY --from=development /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]