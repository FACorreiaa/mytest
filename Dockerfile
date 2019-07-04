FROM node AS builder

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g @angular/cli
RUN npm run build:prod
RUN ls /build/dist/ 

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*


COPY --from=builder /build/dist/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]


