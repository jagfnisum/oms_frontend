FROM node as build-deps
ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME
COPY omsfrontend/package.json ./
COPY . ./
WORKDIR $APP_HOME/omsfrontend
RUN npm install
# --save react react-dom react-router-dom react-scripts
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/omsfrontend/dist /usr/share/nginx/html/
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]