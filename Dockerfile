FROM node:21-alpine
# FROM oven/bun:alpine

WORKDIR /api

COPY package.json .

# Check if yarn is there...
RUN if [ -z "$(which yarn)" ]; then npm install -g yarn; fi

RUN yarn
# RUN bun install --force

COPY . .

RUN yarn run build:prod

# EXPOSE 5001

RUN chmod +x ./scripts/start.sh

CMD ["sh", "./scripts/start.sh"]
