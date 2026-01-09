# --- Giai đoạn 1: Build (Đổi sang Node 22) ---
FROM node:22-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# --- Giai đoạn 2: Production ---
FROM nginx:alpine

# Lưu ý: sửa 'BUILD_IMAGE' thành 'build' cho khớp với dòng 2
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]