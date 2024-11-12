interface Vimeo {
  type: string;
  version: string;
  provider_name: string;
  provider_url: string;
  title: string;
  author_name: string;
  author_url: string;
  is_plus: string;
  account_type: string;
  html: string;
  width: number;
  height: number;
  duration: number;
  description: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  thumbnail_url_with_play_button: string;
  upload_date: string;
  video_id: number;
  uri: string;
}

interface VimeoRequest {
  videoUrl: string;
  width: number;
  height: number;
}

enum Platform {
  YOUTUBE = 'youtube',
  VIMEO = 'vimeo',
}

const GET_SOURCE_VIDEO = /src="([^"]+)"/;
const EMBED_YOUTUBE = 'https://www.youtube.com/embed';

export { Platform, GET_SOURCE_VIDEO, EMBED_YOUTUBE };
export type { Vimeo, VimeoRequest };
