# Stage 1: Build
FROM node:18 AS builder

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./

COPY prisma.config.ts ./

COPY src ./src

COPY prisma ./prisma

# Generate Prisma client (required!)
RUN npx prisma generate

RUN npm run build





# Stage 2: Runtime
FROM node:18 AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/src/swagger ./src/swagger

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
