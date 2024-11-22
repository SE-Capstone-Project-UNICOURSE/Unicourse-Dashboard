// Model for the MentorSession
interface MentorSession {
  title: string;
  description: string;
  position: number;
  start_time: string; // ISO 8601 format
  end_time: string; // ISO 8601 format
  room_id: number;
}

interface OfflineCourse {
  title: string;
  course_id: number;
  amount: number;
  discount?: number;
  description?: string | null;
  image: string | File;
  center_id: number;
  start_date: string; // ISO 8601 format
  end_date: string; // ISO 8601 format
  mentor_sessions: MentorSession[];
}

export type { MentorSession, OfflineCourse };
