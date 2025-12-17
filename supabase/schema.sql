-- -- Enable UUID extension
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -- Users table (synced with Clerk)
-- CREATE TABLE IF NOT EXISTS users (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   clerk_id TEXT UNIQUE NOT NULL,
--   email TEXT UNIQUE NOT NULL,
--   name TEXT,
--   username TEXT UNIQUE,
--   image_url TEXT,
--   is_admin BOOLEAN DEFAULT FALSE,
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- -- Blog posts table
-- CREATE TABLE IF NOT EXISTS blog_posts (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   slug TEXT UNIQUE NOT NULL,
--   title TEXT NOT NULL,
--   description TEXT,
--   content TEXT NOT NULL,
--   cover_image TEXT,
--   published BOOLEAN DEFAULT FALSE,
--   featured BOOLEAN DEFAULT FALSE,
--   reading_time INTEGER,
--   tags TEXT[] DEFAULT '{}',
--   views INTEGER DEFAULT 0,
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW(),
--   published_at TIMESTAMPTZ
-- );

-- -- Comments table (with nested replies support)
-- CREATE TABLE IF NOT EXISTS comments (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   content TEXT NOT NULL,
--   user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
--   parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
--   is_approved BOOLEAN DEFAULT TRUE,
--   is_edited BOOLEAN DEFAULT FALSE,
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- -- Likes table
-- CREATE TABLE IF NOT EXISTS likes (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   UNIQUE(user_id, post_id)
-- );

-- -- Indexes for performance
-- CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
-- CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
-- CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
-- CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
-- CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
-- CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
-- CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
-- CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);

-- -- Enable Row Level Security
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- -- RLS Policies for users
-- CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
-- CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = clerk_id);

-- -- RLS Policies for blog_posts
-- CREATE POLICY "Published posts are viewable by everyone" ON blog_posts FOR SELECT USING (published = true);
-- CREATE POLICY "Admins can manage all posts" ON blog_posts FOR ALL USING (
--   EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.uid()::text AND is_admin = true)
-- );

-- -- RLS Policies for comments
-- CREATE POLICY "Approved comments are viewable by everyone" ON comments FOR SELECT USING (is_approved = true);
-- CREATE POLICY "Authenticated users can create comments" ON comments FOR INSERT WITH CHECK (
--   EXISTS (SELECT 1 FROM users WHERE id = user_id AND clerk_id = auth.uid()::text)
-- );
-- CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (
--   EXISTS (SELECT 1 FROM users WHERE id = user_id AND clerk_id = auth.uid()::text)
-- );
-- CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (
--   EXISTS (SELECT 1 FROM users WHERE id = user_id AND clerk_id = auth.uid()::text)
-- );

-- -- RLS Policies for likes
-- CREATE POLICY "Likes are viewable by everyone" ON likes FOR SELECT USING (true);
-- CREATE POLICY "Authenticated users can manage own likes" ON likes FOR ALL USING (
--   EXISTS (SELECT 1 FROM users WHERE id = user_id AND clerk_id = auth.uid()::text)
-- );

-- -- Function to update updated_at timestamp
-- CREATE OR REPLACE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = NOW();
--   RETURN NEW;
-- END;
-- $$ language 'plpgsql';

-- -- Triggers for updated_at
-- CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();













-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (synced with Clerk)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  username TEXT UNIQUE,
  image_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  reading_time INTEGER,
  tags TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  is_approved BOOLEAN DEFAULT TRUE,
  is_edited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);