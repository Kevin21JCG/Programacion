FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN npm ci --prefix frontend
COPY frontend ./frontend
RUN npm run build --prefix frontend
FROM node:24-bookworm-slim
WORKDIR /app
COPY backend ./backend
COPY package.json ./
COPY --from=build /app/frontend/dist ./frontend/dist
ENV HOST=0.0.0.0 PORT=3000 DEVTASK_DB=/datos/devtask.db
RUN mkdir /datos && chown node:node /datos
USER node
EXPOSE 3000
CMD ["node","backend/servidor.js"]
