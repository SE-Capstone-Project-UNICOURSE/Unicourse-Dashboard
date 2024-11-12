type CourseOnlinePublishModel = {
  id: number;
  title: string;
  price: number;
  title_description: string;
  thumbnail: string;
  learning_outcome: string[];
  students_enrolled: number;
  requirements: string[];
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  category_id: number;
  lecture_id: number;
  description: string; // HTML content as a string
  category: {
    id: number;
    name: string;
    description: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  };
  course_skill: string[];
  course_mentor: {
    id: number;
    title: string;
    description: string;
    image: string;
    amount: number;
    is_mentor: boolean;
    course_id: number;
    mentor_id: number | null;
    center_id: number | null;
    start_date: string; // ISO date string
    end_date: string; // ISO date string
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    discount: number;
    _count: {
      course_enroll: number;
    };
  }[];
};

interface CourseOnlineDetailModel {
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
  rating: number;
}

export type { CourseOnlinePublishModel, CourseOnlineDetailModel };
