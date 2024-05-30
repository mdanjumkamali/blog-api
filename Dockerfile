# Stage 1: Build stage
FROM node:lts AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy prisma directory, source code, and generate prisma client
COPY ./prisma prisma
COPY . .
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:lts AS production

# Set working directory
WORKDIR /app

# Copy package.json and install only production dependencies
COPY package.json .
RUN npm install --only=production

# Copy built files from the build stage
COPY --from=build /app/build ./build

# Set the command to run the application
CMD ["node", "build/index.js"]
