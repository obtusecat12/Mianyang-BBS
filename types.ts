import React from 'react';

export interface Board {
  id: string;
  title: string;
  description: string;
  moderators: string[];
  postCount: number;
  icon?: string;
}

export interface Thread {
  id: string;
  boardId: string;
  title: string;
  author: string;
  date: string;
  views: number;
  replies: number;
  isHot?: boolean;
  isNew?: boolean;
  isSticky?: boolean;
}

export interface ThreadPost {
  id: number;
  author: User;
  content: React.ReactNode;
  date: string;
  floor: number; // 1 for OP, 2 for first reply, etc.
}

export interface User {
  username: string;
  rank: string; // e.g., "Newbie", "Senior Member", "Admin"
  posts: number;
  joinDate: string;
  avatar?: string; // Icon type or image URL
  signature?: string;
}