interface updateCoursePayload {
  id: number;
  title: string;
  price: number;
  title_description: string;
  description: string;
  // thumbnail: string;
  learning_outcome: string[];
  requirements: string[];
  category_id: number;
  status: string;
}

// Default values
const updateCoursePayloadDefaultFormValues: updateCoursePayload = {
  id: 0,
  title: "",
  price: 0,
  title_description: "",
  description: "",
  // thumbnail: "",
  learning_outcome: [],
  requirements: [],
  category_id: 0,
  status: "",
};

export { updateCoursePayloadDefaultFormValues };
export type { updateCoursePayload };
