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

export interface User {
  username: string;
  rank: string; // e.g., "Newbie", "Senior Member", "Admin"
  posts: number;
  joinDate: string;
  avatar?: string;
}