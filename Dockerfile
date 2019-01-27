FROM node:alpine
EXPOSE 3000
ENV NODE_ENV=production
USER node
WORKDIR /app

COPY . /app/
RUN ["npm", "install"]

CMD ["npm", "start"]
