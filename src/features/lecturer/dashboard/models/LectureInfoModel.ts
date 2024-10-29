// Certification Type
interface CertificationType {
  id: number;
  organization_name: string;
  description: string | null;
  is_intranet: boolean;
  created_at: string;
  updated_at: string;
  status: string;
}

// Certification
interface Certification {
  id: number;
  title: string;
  description: string | null;
  certification_url: string;
  created_at: string;
  updated_at: string;
  status: string;
  issued_date: string;
  expiration_date: string;
  certification_type_id: number;
  user_id: number;
  course_id: number;
  certification_type: CertificationType;
}

// Skill
interface Skill {
  name: string;
  level: string;
}

// Certification Detail in Skill JSON
interface SkillCertification {
  name: string;
  year: number;
}

// Skill JSON
interface SkillJson {
  skills: Skill[];
  certifications: SkillCertification[];
}

// User Profile
interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  date_of_birth: string | null;
  role: string;
  profile_image: string;
  title: string | null;
  phone_num: string | null;
  address: string | null;
  deleted_schedule: string | null;
  banned_reason: string | null;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
  hashed_password: string | null;
  bio: string | null;
  self_intro_url: string | null;
  facebook_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  path_profile_image: string | null;
}

// Course Mentor
interface CourseMentor {
  id: number;
  title: string;
  description: string;
  image: string;
  amount: number;
  is_mentor: boolean;
  status: string;
  course_id: number;
  mentor_id: number | null;
  center_id: number | null;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  discount: number;
}

// Course
interface Course {
  id: number;
  title: string;
  price: number;
  title_description: string;
  thumbnail: string;
  learning_outcome: string[];
  students_enrolled: number;
  requirements: string[];
  status: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  lecture_id: number;
  description: string;
  course_mentor: CourseMentor[];
}

// Lecturer Profile Data
interface LecturerProfileData {
  id: number;
  info_description: string;
  skill_json: SkillJson;
  created_at: string;
  updated_at: string;
  user_id: number;
  user: UserProfile;
  course: Course[];
  total_courses: number;
  total_enrollments: number;
  certificates: Certification[];
}

export default LecturerProfileData;
