FROM node:alpine as builder
WORKDIR /sample-react-app
ENV PATH="./node_modules/.bin:$PATH"
COPY package.json ./
COPY package-lock.json ./
RUN npm install i
COPY . ./
RUN npm run build
# EXPOSE 3000 We don't need to expose it !
# CMD ["npm", "start"] It was needed before

# ------------------------------------------------------------------
#     Stage 2 Build with the nginx server using the previous build
# ------------------------------------------------------------------

FROM nginx:1.21.6-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /sample-react-app/build .
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
