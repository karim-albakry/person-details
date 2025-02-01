FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package.json package-lock.json ./

# ✅ Ensure the "data" directory exists before copying
RUN mkdir -p /app/src/data
COPY ./src/data/persons.csv /app/src/data/persons.csv

RUN npm install --only=production

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/server.js"]
