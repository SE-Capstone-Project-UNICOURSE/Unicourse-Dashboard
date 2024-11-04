export interface Course {
  id: number;
  title: string;
  price: number;
  title_description: string;
  thumbnail: string;
  learning_outcome: string[];
  students_enrolled: number;
  requirements: string[];
  status: 'PUBLISHED' | 'DRAFT' | 'CLOSED';
  updated_at: string;
  category_id: number;
  lecture_id: number;
  description: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: 'PUBLISHED' | 'DRAFT' | 'CLOSED';
}
