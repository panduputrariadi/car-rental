# Gunakan image Node.js resmi
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file project
COPY . .

# Build Next.js app
# RUN npm run build

# Jalankan Next.js app
CMD ["npm", "run", "start"]

# Expose port Next.js (default: 3000)
EXPOSE 3000
