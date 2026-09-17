# --- STAGE 1: Build Stage ---
FROM node:24-alpine AS build

WORKDIR /app

# Copy package files first to cache dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

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