import { Lecturer, Mentor } from './User';

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
  lecturer?: Lecturer;
  course_skill?: any[];
  chapter?: Chapter[];
  course_mentor?: CourseMentor[];
  rating?: number;
}

export interface CourseMentor {
    id: number;
    title: string;
    description: string;
    image: string;
    amount: number;
    is_mentor: boolean;
    status: 'PUBLISHED' | 'DRAFT' | 'CLOSED';
    course_id: number;
    mentor_id: number | null;
    center_id: number | null;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    discount: number;
    mentor: Mentor;
    _count: {
        mentor_session: number;
    };
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: 'PUBLISHED' | 'DRAFT' | 'CLOSED';
}

export interface Chapter {
    id: number;
    title: string;
    position: number;
    created_at: string;
    updated_at: string;
    status: 'PUBLISHED' | 'DRAFT' | 'CLOSED';
    course_id: number;
    topic: Topic[];
}

export interface Topic {
    id: number;
    title: string;
    description: string;
    position: number;
    created_at: string;
    updated_at: string;
    status: 'PUBLISHED' | 'DRAFT' | 'CLOSED';
    chapter_id: number;
    element_topic: ElementTopic;
}

export interface ElementTopic {
    id: number;
    created_at: string;
    updated_at: string;
    topic_id: number;
    document_id: number | null;
    question_bank_id: number | null;
    video_id: number | null;
    video: Video | null;
    document: Document | null;
    question_bank: QuestionBank | null;
}

export interface Video {
    id: number;
    url: string;
    duration: number;
    platform: string;
    created_at: Date;
    updated_at: Date;
    videoUrl?: any;
}

export interface QuestionBank {
    id: string;
    title: string;
    description: string;
    total_question: number;
    duration: number;
    created_at: Date;
    updated_at: Date;
}
export interface Document {
    id: number;
    text: string;
    content: string;
    reference_url: string;
    min_read: number;
    created_at: Date;
    updated_at: Date;
}