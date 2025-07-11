import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authenticateAdmin, hashPassword, comparePassword, generateToken } from "./auth";
import { insertVideoSchema, updateVideoSchema, insertVideoViewSchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Public API routes
  
  // Get all videos with pagination and filtering
  app.get("/api/videos", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 12;
      const filter = req.query.filter as string || "latest";
      const category = req.query.category as string;
      
      const videos = await storage.getVideos(page, limit, filter, category);
      const totalVideos = await storage.getTotalVideos(category);
      
      res.json({
        videos,
        pagination: {
          page,
          limit,
          total: totalVideos,
          totalPages: Math.ceil(totalVideos / limit),
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  // Get popular videos
  app.get("/api/videos/popular", async (req, res) => {
    try {
      const videos = await storage.getPopularVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch popular videos" });
    }
  });

  // Get latest videos
  app.get("/api/videos/latest", async (req, res) => {
    try {
      const videos = await storage.getLatestVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch latest videos" });
    }
  });

  // Get single video
  app.get("/api/videos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const video = await storage.getVideo(id);
      
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video" });
    }
  });

  // Track video view
  app.post("/api/videos/:id/view", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const viewData = {
        videoId: id,
        viewerIp: req.ip,
        userAgent: req.headers['user-agent'],
      };
      
      const validatedData = insertVideoViewSchema.parse(viewData);
      await storage.addVideoView(validatedData);
      await storage.incrementVideoViews(id);
      
      res.json({ message: "View tracked successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to track view" });
    }
  });

  // Admin authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const admin = await storage.getAdminByUsername(username);
      if (!admin || !await comparePassword(password, admin.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const token = generateToken({ adminId: admin.id, username: admin.username });
      res.json({ token, admin: { id: admin.id, username: admin.username } });
    } catch (error) {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  // Protected admin routes
  app.use("/api/admin", authenticateAdmin);

  // Get admin dashboard stats
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Get all videos for admin
  app.get("/api/admin/videos", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      
      const videos = await storage.getAllVideosForAdmin(page, limit);
      const totalVideos = await storage.getTotalVideos();
      
      res.json({
        videos,
        pagination: {
          page,
          limit,
          total: totalVideos,
          totalPages: Math.ceil(totalVideos / limit),
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  // Create new video
  app.post("/api/admin/videos", async (req, res) => {
    try {
      const validatedData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(validatedData);
      res.json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid video data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create video" });
    }
  });

  // Update video
  app.put("/api/admin/videos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateVideoSchema.parse(req.body);
      
      const video = await storage.updateVideo(id, validatedData);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid video data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update video" });
    }
  });

  // Delete video
  app.delete("/api/admin/videos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteVideo(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete video" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
