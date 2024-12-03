const COURSE_DETAIL_LECTURE_API_PATH = {
  GET_COURSE_DETAIL: '/api/courses/v2',
  GET_CATEGORIES: '/api/categories',
};

const TOPIC_VIDEO_API_PATH = {
  GET_PREVIEW: '/api/videos/vimeo/preview',
  GET_VIDEO_WITH_ACCESS_TOKEN: '/api/videos/dashboard',
  PUT_COURSE_DETAIL: 'api/courses'
};

const GET_SOURCE_VIDEO = /src="([^"]+)"/;
const EMBED_YOUTUBE = 'https://www.youtube.com/embed';

enum Platform {
  YOUTUBE = 'youtube',
  VIMEO = 'vimeo',
}

const labels = {
  DRAFT: 'Chờ phê duyệt',
  PUBLISHED: 'Đang hoạt động',
  CLOSED: 'Đã đóng',
};

export {
  COURSE_DETAIL_LECTURE_API_PATH,
  TOPIC_VIDEO_API_PATH,
  GET_SOURCE_VIDEO,
  EMBED_YOUTUBE,
  Platform,
  labels,
};
