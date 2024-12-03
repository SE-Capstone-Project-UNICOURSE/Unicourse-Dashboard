interface CourseOfflineDetailResponseModel {
  id: number;
  title: string;
  description: string;
  image: string;
  amount: number;
  discount: number;
  is_mentor: boolean;
  status: string;
  course_id: number;
  lecturer_id: number | null;
  center: CenterDetail;
  mentor: MentorDetail | null;
  start_date: string; // ISO Date string
  end_date: string; // ISO Date string
  mentor_session: MentorSessionDetail[];
  created_at: string; // ISO Date string
  updated_at: string; // ISO Date string
}

interface CenterDetail {
  id: number;
  name: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  status: string;
}

interface MentorDetail {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_image: string | null;
  status: string;
}

interface MentorSessionDetail {
  id: number;
  title: string;
  description: string;
  position: number;
  status: string;
  start_time: string; // ISO Date string
  end_time: string; // ISO Date string
  room: RoomDetail;
}

interface RoomDetail {
  id: number;
  name: string;
  capacity: number;
  status: string;
}

export default CourseOfflineDetailResponseModel;
