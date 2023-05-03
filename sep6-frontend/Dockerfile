FROM nginx:alpine
LABEL author="Tymon"
COPY /dist/sep6-frontend /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]