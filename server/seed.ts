import { db } from "./db";
import { admins, videos } from "../shared/schema.ts";
import { hashPassword } from "./auth";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Create default admin user
    const hashedPassword = await hashPassword("Harshal-2002-69");

    await db
      .insert(admins)
      .values({
        username: "Ashwatthama",
        password: hashedPassword,
      })
      .onConflictDoNothing();

    console.log("✅ Admin user created");

    // Create sample videos
    const sampleVideos = [
      {
        title: "Introduction to Web Development",
        description:
          "Learn the basics of web development including HTML, CSS, and JavaScript fundamentals.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        category: "Education",
        tags: ["web development", "programming", "tutorial"],
        views: 1250,
        likes: 89,
        isActive: true,
      },
      {
        title: "React Tutorial for Beginners",
        description:
          "Complete React tutorial covering components, state management, and modern React patterns.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        category: "Programming",
        tags: ["react", "javascript", "frontend"],
        views: 2840,
        likes: 234,
        isActive: true,
      },
      {
        title: "Node.js Backend Development",
        description:
          "Build robust backend applications with Node.js, Express, and MongoDB.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        category: "Programming",
        tags: ["nodejs", "backend", "express"],
        views: 1876,
        likes: 156,
        isActive: true,
      },
      {
        title: "Database Design Fundamentals",
        description:
          "Learn how to design efficient and scalable database schemas with practical examples.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=225&fit=crop",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        category: "Database",
        tags: ["database", "sql", "design"],
        views: 987,
        likes: 78,
        isActive: true,
      },
      {
        title: "Modern CSS Techniques",
        description:
          "Explore modern CSS features including Grid, Flexbox, and CSS custom properties.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        category: "Design",
        tags: ["css", "styling", "frontend"],
        views: 1543,
        likes: 112,
        isActive: true,
      },
      {
        title: "JavaScript ES6+ Features",
        description:
          "Master modern JavaScript features including arrow functions, destructuring, and async/await.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=225&fit=crop",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        category: "Programming",
        tags: ["javascript", "es6", "modern"],
        views: 2156,
        likes: 189,
        isActive: true,
      },
      {
        title: "API Development with Express",
        description:
          "Build RESTful APIs with Express.js including authentication and error handling.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        category: "Programming",
        tags: ["api", "express", "rest"],
        views: 1698,
        likes: 134,
        isActive: true,
      },
      {
        title: "Git and Version Control",
        description:
          "Learn Git fundamentals and best practices for version control in software development.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=225&fit=crop",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        category: "Tools",
        tags: ["git", "version control", "development"],
        views: 1432,
        likes: 98,
        isActive: true,
      },
      {
        title: "Responsive Web Design",
        description:
          "Create responsive websites that work perfectly on all devices and screen sizes.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=225&fit=crop",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        category: "Design",
        tags: ["responsive", "mobile", "design"],
        views: 2045,
        likes: 167,
        isActive: true,
      },
      {
        title: "TypeScript for JavaScript Developers",
        description:
          "Learn TypeScript and how it enhances JavaScript development with static typing.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=225&fit=crop",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        category: "Programming",
        tags: ["typescript", "javascript", "typing"],
        views: 1789,
        likes: 142,
        isActive: true,
      },
      {
        title: "Docker for Developers",
        description:
          "Containerize your applications with Docker and learn container orchestration basics.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=225&fit=crop",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
        category: "DevOps",
        tags: ["docker", "containers", "devops"],
        views: 1234,
        likes: 89,
        isActive: true,
      },
      {
        title: "AWS Cloud Fundamentals",
        description:
          "Get started with Amazon Web Services and learn core cloud computing concepts.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        category: "Cloud",
        tags: ["aws", "cloud", "infrastructure"],
        views: 1567,
        likes: 123,
        isActive: true,
      },
    ];

    for (const video of sampleVideos) {
      await db.insert(videos).values(video).onConflictDoNothing();
    }

    console.log("✅ Sample videos created");
    console.log("🎉 Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seed function when script is executed directly
seed()
  .then(() => {
    console.log("✅ Seeding finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });

export { seed };
