// src/types/FormValues.ts
interface courseMentorCreationFormValues {
  title: string;
  amount: number;
  discount?: number;
  description?: string | null;
  image: string;
  center_id: number;
  start_date: string;
  end_date: string;
  mentor_sessions: MentorSession[];
  category: 'beginner' | 'intermediate' | 'advanced';
}

interface MentorSession {
  // Các field cụ thể của mentor session
}

// Default values
const courseMentorCreationDefaultFormValues: courseMentorCreationFormValues = {
  title: '',
  amount: 0,
  discount: undefined,
  description: null,
  image: '',
  center_id: 0,
  start_date: '',
  end_date: '',
  mentor_sessions: [],
  category: 'beginner',
};

export { courseMentorCreationDefaultFormValues };
export type { courseMentorCreationFormValues };
