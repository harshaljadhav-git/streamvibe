import { 
  admins, 
  videos, 
  videoViews, 
  type Admin, 
  type Video, 
  type VideoView, 
  type InsertAdmin, 
  type InsertVideo, 
  type InsertVideoView, 
  type UpdateVideo 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, sql, count, and } from "drizzle-orm";

interface IStorage {
  // Admin methods
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(insertAdmin: InsertAdmin): Promise<Admin>;
  getAdminStats(): Promise<{
    totalVideos: number;
    totalViews: number;
    storageUsed: string;
    categories: number;
  }>;

  // Video methods
  getVideos(page: number, limit: number, filter: string, category?: string): Promise<Video[]>;
  getTotalVideos(category?: string): Promise<number>;
  getVideo(id: number): Promise<Video | undefined>;
  getPopularVideos(limit?: number): Promise<Video[]>;
  getLatestVideos(limit?: number): Promise<Video[]>;
  getAllVideosForAdmin(page: number, limit: number): Promise<Video[]>;
  createVideo(insertVideo: InsertVideo): Promise<Video>;
  updateVideo(id: number, updateVideo: UpdateVideo): Promise<Video | undefined>;
  deleteVideo(id: number): Promise<boolean>;
  incrementVideoViews(id: number): Promise<void>;

  // Video view methods
  addVideoView(insertVideoView: InsertVideoView): Promise<VideoView>;
}

export class DatabaseStorage implements IStorage {
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin || undefined;
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const [admin] = await db
      .insert(admins)
      .values(insertAdmin)
      .returning();
    return admin;
  }

  async getAdminStats(): Promise<{
    totalVideos: number;
    totalViews: number;
    storageUsed: string;
    categories: number;
  }> {
    const [totalVideosResult] = await db
      .select({ count: count() })
      .from(videos);
    
    const [totalViewsResult] = await db
      .select({ totalViews: sql<number>`COALESCE(SUM(views), 0)` })
      .from(videos);
    
    const categoriesResult = await db
      .select({ category: videos.category })
      .from(videos)
      .groupBy(videos.category);

    return {
      totalVideos: totalVideosResult.count,
      totalViews: totalViewsResult.totalViews || 0,
      storageUsed: "0 GB", // Placeholder since we're using external URLs
      categories: categoriesResult.length,
    };
  }

  async getVideos(page: number, limit: number, filter: string, category?: string): Promise<Video[]> {
    const whereConditions = [eq(videos.isActive, true)];
    
    if (category) {
      whereConditions.push(eq(videos.category, category));
    }

    const whereClause = whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0];

    let orderBy;
    switch (filter) {
      case "popular":
        orderBy = desc(videos.views);
        break;
      case "most-viewed":
        orderBy = desc(videos.views);
        break;
      case "favorite":
        orderBy = desc(videos.likes);
        break;
      case "latest":
      default:
        orderBy = desc(videos.datePosted);
        break;
    }

    const offset = (page - 1) * limit;
    return await db
      .select()
      .from(videos)
      .where(whereClause)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
  }

  async getTotalVideos(category?: string): Promise<number> {
    const whereConditions = [eq(videos.isActive, true)];
    
    if (category) {
      whereConditions.push(eq(videos.category, category));
    }

    const whereClause = whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0];

    const [result] = await db
      .select({ count: count() })
      .from(videos)
      .where(whereClause);
    return result.count;
  }

  async getVideo(id: number): Promise<Video | undefined> {
    const [video] = await db.select().from(videos).where(eq(videos.id, id));
    return video || undefined;
  }

  async getPopularVideos(limit = 10): Promise<Video[]> {
    return await db
      .select()
      .from(videos)
      .where(eq(videos.isActive, true))
      .orderBy(desc(videos.views))
      .limit(limit);
  }

  async getLatestVideos(limit = 10): Promise<Video[]> {
    return await db
      .select()
      .from(videos)
      .where(eq(videos.isActive, true))
      .orderBy(desc(videos.datePosted))
      .limit(limit);
  }

  async getAllVideosForAdmin(page: number, limit: number): Promise<Video[]> {
    const offset = (page - 1) * limit;
    return await db
      .select()
      .from(videos)
      .orderBy(desc(videos.datePosted))
      .limit(limit)
      .offset(offset);
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const [video] = await db
      .insert(videos)
      .values(insertVideo)
      .returning();
    return video;
  }

  async updateVideo(id: number, updateVideo: UpdateVideo): Promise<Video | undefined> {
    const [video] = await db
      .update(videos)
      .set({
        ...updateVideo,
        updatedAt: new Date(),
      })
      .where(eq(videos.id, id))
      .returning();
    return video || undefined;
  }

  async deleteVideo(id: number): Promise<boolean> {
    const result = await db
      .delete(videos)
      .where(eq(videos.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async incrementVideoViews(id: number): Promise<void> {
    await db
      .update(videos)
      .set({
        views: sql`views + 1`,
        updatedAt: new Date(),
      })
      .where(eq(videos.id, id));
  }

  async addVideoView(insertVideoView: InsertVideoView): Promise<VideoView> {
    const [view] = await db
      .insert(videoViews)
      .values(insertVideoView)
      .returning();
    return view;
  }
}

export const storage = new DatabaseStorage();