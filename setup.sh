#!/bin/bash

echo "🚀 Setting up Video Streaming Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install PostgreSQL or use a cloud provider."
    echo "   Cloud options: Neon, Supabase, Railway, or Heroku Postgres"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Database Configuration
# Replace with your actual database URL
DATABASE_URL=postgresql://username:password@localhost:5432/video_streaming

# JWT Secret - Change this to a secure random string
JWT_SECRET=your-super-secure-jwt-secret-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development
EOF
    echo "✅ .env file created! Please update DATABASE_URL with your actual database credentials."
else
    echo "✅ .env file already exists."
fi

# Push database schema
echo "🗄️  Setting up database schema..."
npm run db:push

# Seed database
echo "🌱 Seeding database with sample data..."
npx tsx server/seed.ts

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your DATABASE_URL in .env file"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:5000"
echo "4. Admin panel: http://localhost:5000/admin-panel"
echo "   - Username: Ashwatthama"
echo "   - Password: Harshal-2002-69"
echo ""
echo "Happy coding! 🎥"