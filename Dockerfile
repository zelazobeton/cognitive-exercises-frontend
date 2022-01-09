# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:10-alpine as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies & Generate the build of the application
RUN npm install && npm run build -- --prod

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/cognitive-exercises-frontend /usr/share/nginx/html
COPY --from=build /usr/local/app/default.conf /etc/nginx/conf.d/default.conf

# Container will do nothing and nginx needs to be started manually - "service nginx start"
# this way it can be started aftr backend is set up
ENTRYPOINT ["tail"]
CMD ["-f","/dev/null"]

# Expose port 80
EXPOSE 80