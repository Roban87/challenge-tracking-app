FROM node:14.15.4
ENV MYSQL_HOST=challenge-app.clac0zq1aug7.eu-central-1.rds.amazonaws.com
ENV MYSQL_PORT=3306
ENV REACT_APP_FRONTEND=http://challenge-frontend.s3-website.eu-central-1.amazonaws.com
ENV EMAIL_ADDRESS=rubberduckings@protonmail.com
WORKDIR /backend
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 8080 3306
CMD ["yarn", "serve"]