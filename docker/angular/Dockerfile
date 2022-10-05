FROM node:18.9.0-buster as dev

# Add .bin folder in node_modules folder to path
# Needed to use local ng etc.
ENV PATH="/usr/src/node_modules/.bin:${PATH}"

# Set timezone
RUN ln -sf /usr/share/zoneinfo/Europe/Oslo /etc/localtime

# Install @angular/cli globally
RUN npm i -g @angular/cli

# Create app directory
WORKDIR /usr/src
