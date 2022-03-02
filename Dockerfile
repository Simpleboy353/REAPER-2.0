FROM node:16

# Setup Work directory.
WORKDIR /usr/src/bot

# Copy project to our WORKDIR
COPY . .
RUN npm ci

# Let's run it!
CMD [ "node", "index.js" ]