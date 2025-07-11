# Video Streaming Platform

A modern, full-stack video streaming platform built with React, Express.js, and PostgreSQL. Features a light, refreshing theme with comprehensive video management capabilities.

## Features

- 🎥 **Video Streaming**: Custom HTML5 video player with fullscreen support
- 📱 **Responsive Design**: Optimized for mobile and desktop
- 🔐 **Admin Panel**: Secure authentication with CRUD operations
- 📊 **Analytics**: View tracking and engagement metrics
- 🎨 **Modern UI**: Light theme with gradient backgrounds
- 🔍 **Search & Filter**: Multiple filtering options for videos
- 📄 **Pagination**: Numbered pagination system
- 🏷️ **Categories**: Organized video content by categories and tags

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** with shadcn/ui components
- **TanStack Query** for server state management
- **Wouter** for client-side routing

### Backend
- **Express.js** with TypeScript
- **JWT** authentication with bcrypt
- **Drizzle ORM** for database operations
- **PostgreSQL** for data storage

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v13 or higher)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd video-streaming-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

#### Option A: Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a new database:
```sql
CREATE DATABASE video_streaming;
```

#### Option B: Cloud PostgreSQL (Recommended)
- Use services like **Neon**, **Supabase**, or **Railway**
- Create a new PostgreSQL database
- Copy the connection string

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/video_streaming

# JWT Secret (change this to a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-key

# Server Port (optional, defaults to 5000)
PORT=5000
```

### 5. Database Migration

Push the database schema:

```bash
npm run db:push
```

### 6. Seed Sample Data

Populate the database with sample videos and admin user:

```bash
npm run seed
```

This creates:
- **Admin user**: username = `Ashwatthama`, password = `Harshal-2002-69`
- **12 sample videos** with real thumbnails and video URLs

## Running the Application

### Development Mode

Start both frontend and backend servers:

```bash
npm run dev
```

This will:
- Start the Express server on `http://localhost:5000`
- Start the Vite dev server with hot reloading
- Open the application in your browser

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Usage

### Public Access
- **Home Page**: `http://localhost:5000/`
- **Videos Page**: `http://localhost:5000/videos`
- **Video Player**: Click any video thumbnail (opens in new tab)

### Admin Access
- **Admin Panel**: `http://localhost:5000/admin-panel`
- **Login Credentials**:
  - Username: `Ashwatthama`
  - Password: `Harshal-2002-69`

### Admin Features
- Add new videos with thumbnails and video URLs
- Edit existing video details
- Delete videos
- View analytics and statistics
- Manage categories and tags

## Project Structure

```
video-streaming-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── lib/            # Utilities
│   │   └── hooks/          # Custom hooks
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   ├── auth.ts            # Authentication
│   └── seed.ts            # Database seeding
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema
└── package.json
```

## API Endpoints

### Public Routes
- `GET /api/videos` - Get paginated videos with filters
- `GET /api/videos/popular` - Get popular videos
- `GET /api/videos/latest` - Get latest videos
- `GET /api/videos/:id` - Get single video
- `POST /api/videos/:id/view` - Track video view

### Admin Routes (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/videos` - Get all videos for admin
- `POST /api/admin/videos` - Create new video
- `PUT /api/admin/videos/:id` - Update video
- `DELETE /api/admin/videos/:id` - Delete video

## Video Integration

### Adding Videos
1. Access the admin panel
2. Click "Add Video"
3. Fill in the form with:
   - **Title**: Video title
   - **Description**: Video description
   - **Thumbnail URL**: Direct link to thumbnail image
   - **Video URL**: Direct link to video file (MP4, WebM, etc.)
   - **Category**: Video category
   - **Tags**: Comma-separated tags

### Supported Video Formats
- MP4 (recommended)
- WebM
- OGV

### Recommended Video Hosting
- **AWS S3**: For scalable video storage
- **Cloudinary**: For video optimization
- **Vimeo**: For professional video hosting
- **YouTube**: For embedded videos

## Development

### Adding New Features
1. Update the database schema in `shared/schema.ts`
2. Run `npm run db:push` to update the database
3. Update the storage interface in `server/storage.ts`
4. Add API routes in `server/routes.ts`
5. Create frontend components in `client/src/`

### Database Commands
```bash
# Push schema changes
npm run db:push

# View database in Drizzle Studio
npm run db:studio

# Reset database (careful!)
npm run db:reset
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your `DATABASE_URL` in `.env`
   - Ensure PostgreSQL is running
   - Verify database credentials

2. **Port Already in Use**
   - Change the `PORT` in `.env`
   - Kill existing processes: `lsof -ti:5000 | xargs kill`

3. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear build cache: `rm -rf dist`

4. **Video Playback Issues**
   - Ensure video URLs are accessible
   - Check video format compatibility
   - Verify CORS settings for external videos

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please create an issue in the repository or contact the development team.