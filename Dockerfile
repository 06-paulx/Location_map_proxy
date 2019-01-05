# # Derived from official mysql image (our base image)
# FROM mysql
# # Add a database
# ENV MYSQL_DATABASE company
# # Add the content of the sql-scripts/ directory to your image
# # All scripts in docker-entrypoint-initdb.d/ are automatically
# # executed during container startup
# COPY ./sql-scripts/ /docker-entrypoint-initdb.d/


FROM node:7.6-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "start"] 