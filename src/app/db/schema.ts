/**
 * Drizzle ORM schema for the posts table
 * IMPORTANT: This file is here for reference only or to recreate the database schema.
 *
 * This file defines the database schema using Drizzle ORM.
 * It includes the posts table structure and type definitions.
 */
import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";

// Posts table schema
export const posts = pgTable(
  "posts",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    excerpt: text("excerpt").notNull(),
    date: text("date").notNull(), // Using text to match the mockData format (YYYY-MM-DD)
    author: text("author").notNull(),
    slug: text("slug").unique().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    slugIndex: index("idx_posts_slug").on(table.slug),
    dateIndex: index("idx_posts_date").on(table.date),
  })
);

// Types
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

// RLS Policies (for documentation - these are applied at the database level)
/*
-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public read access to all posts
CREATE POLICY "Enable read access for all users" ON posts
  FOR SELECT USING (true);

-- Policy 2: Allow authenticated users to insert posts
CREATE POLICY "Enable insert for authenticated users" ON posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy 3: Allow authenticated users to update their own posts
CREATE POLICY "Enable update for post authors" ON posts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy 4: Allow authenticated users to delete their own posts
CREATE POLICY "Enable delete for post authors" ON posts
  FOR DELETE USING (auth.role() = 'authenticated');
*/

// SQL Migration (for reference)
/*
-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  date DATE NOT NULL,
  author TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for post authors" ON posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for post authors" ON posts
  FOR DELETE USING (auth.role() = 'authenticated');
*/
