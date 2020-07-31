FROM node:erbium-alpine

ENV HOME=/home/node
ENV APP_DIR=$HOME/api
WORKDIR $APP_DIR

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
  tzdata \
  && cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime \
  && echo "Asia/Seoul" > /etc/timezone \
  && apk del build-dependencies \
  && apk add --no-cache git

COPY ./ $APP_DIR/

RUN npm install

EXPOSE 9000
CMD ["sh", "-c", "npm run build && npm run prod"]
