import User from '@app/features/auth/models/User.model';

interface Center {
  id: number;
  address: string;
  description: string;
  lat: number;
  long: number;
}

interface Lecturer {
  id: number;
  info_description: string;
  skill_json: Record<string, any>;
  user: User;
  created_at: string;
  updated_at: string;
}

interface MentorSession {
  id: number;
  course_mentor_id: number;
  title: string;
  description: string;
  position: number;
  start_time: string;
  end_time: string;
  room_id: number;
  participant: any[];
  status: string;
  created_at: string;
  updated_at: string;
}

interface OfflineCourseMentor {
  id: number;
  title: string;
  description: string;
  image: string;
  amount: number;
  discount: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  status: string;
  center_id: number;
  course_id: number;
  center: Center;
  lecturer_id: number;
  lecturer: Lecturer;
  is_mentor: boolean;
  mentor_id: number | null;
  mentor: any | null; // Nếu có định nghĩa cụ thể về mentor, bạn có thể thay thế `any` bằng interface tương ứng
  mentor_session: MentorSession[];
}

export type { OfflineCourseMentor };
