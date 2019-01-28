FROM node:10
EXPOSE 3000
ENV NODE_ENV=production

WORKDIR /app
COPY . /app/

RUN chgrp -R 0 /app/ && \
    npm install

CMD ["npm", "start"]
