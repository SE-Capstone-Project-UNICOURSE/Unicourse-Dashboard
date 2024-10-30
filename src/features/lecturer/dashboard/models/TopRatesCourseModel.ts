interface Course {
  id: number;
  title: string;
  price: number;
  title_description: string;
  thumbnail: string;
  learning_outcome: string[];
  students_enrolled: number;
  requirements: string[];
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'; // Adjust according to possible status values
  created_at: string; // Use Date type if parsed from string
  updated_at: string; // Use Date type if parsed from string
  category_id: number;
  lecture_id: number;
}

interface TopRatesCourseModel {
  course: Course;
  averageRating: number;
  totalRevenue: number;
}

interface TopRatesCourseRequestModel {
  page: number;
  pageSize: number;
}
export type { TopRatesCourseRequestModel };
export default TopRatesCourseModel;
