# # Derived from official mysql image (our base image)
# FROM mysql
# # Add a database
# ENV MYSQL_DATABASE company
# # Add the content of the sql-scripts/ directory to your image
# # All scripts in docker-entrypoint-initdb.d/ are automatically
# # executed during container startup
# COPY ./sql-scripts/ /docker-entrypoint-initdb.d/


FROM node:8.12

RUN mkdir -p src/location

WORKDIR /src/location

COPY package*json /src/location/

RUN npm install

COPY . /src/location/

EXPOSE 3000

CMD ["npm", "start"] 