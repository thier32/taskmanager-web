FROM alpine:latest

# Install git
RUN apk add --no-cache git

WORKDIR /app

# Clone the repository using the token
RUN git clone https://github.com/thier32/taskmanager-web.git .

ARG VITE_API_BASE_URL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm install

# --- STAGE 1: Build Stage ---
FROM node:24-alpine AS build


# Copy package files first to cache dependencies
#COPY package*.json ./


# Copy the rest of the source code
#COPY . .

RUN export CI=false
RUN npx vite build
# Build the project (creates the /dist or /build folder)
#RUN npm run build

# --- STAGE 2: Runtime Stage (The "Serving" Stage) ---
FROM nginx:stable-alpine

# Copy the static files from the build stage to Nginx's html folder
# Note: Vite uses 'dist', Create React App uses 'build'
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx config if you have one (optional, see below)
#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]