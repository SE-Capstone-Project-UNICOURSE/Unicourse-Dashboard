import React, { useEffect, useState, useCallback } from 'react';
import { Topic, Video } from '@app/common/models/Course';
import { Box, Card } from '@mui/material';
import {
  EMBED_YOUTUBE,
  GET_SOURCE_VIDEO,
  Platform,
} from '../../../../../../../models/TopicVideo';
import useTopicViewModel from '@app/features/lecturer/course-detail/viewmodels/useTopicViewModel';
import { useAppSelector } from '@app/stores';

interface TopicVideoProps {
  topic: Topic | null;
}

const TopicVideo: React.FC<TopicVideoProps> = ({ topic }) => {
  const [videoState, setVideoState] = useState<{ url: string | null; platform: string | null }>({
    url: null,
    platform: null,
  });
  const { vimeoVideo } = useAppSelector((state) => state.courseDetailLecture);
  const { setVimeoRequest } = useTopicViewModel();
  
  useEffect(() => {
    const handleGetVimeoVideoUrl = (video: Video) => {
      if (video) {
        setVimeoRequest({
          videoUrl: video.url,
          width: 1460,
          height: 586,
        });
      }
    }

    if (topic?.element_topic.video) {
      switch (topic.element_topic.video.platform.toLowerCase()) {
        case Platform.YOUTUBE:
          setVideoState({
            platform: Platform.YOUTUBE,
            url: `${EMBED_YOUTUBE}/${topic.element_topic.video.url}`,
          });
          break;
        case Platform.VIMEO:
          handleGetVimeoVideoUrl(topic.element_topic.video);
          break;
        default:
          setVideoState({ platform: null, url: null });
      }
    } else {
      setVideoState({ platform: null, url: null });
    }
  }, [topic]);

  useEffect(() => {
    if (!vimeoVideo.isLoadingVimeoVideo && vimeoVideo.data) {
      const urlMatch = vimeoVideo.data.html.match(GET_SOURCE_VIDEO);
      if (urlMatch) {
        setVideoState({ url: urlMatch[1], platform: Platform.VIMEO });
      } else {
        setVideoState({ url: null, platform: null });
      }
    }
  }, [vimeoVideo]);

  if (!videoState.url) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box sx={{ height: 400 }}>
      <iframe
          src={videoState.url}
          allowFullScreen
          style={{ border: 'none', width: '100%', height: '100%' }}
          title={topic?.title || 'Video'}
        />
    </Box>
  );
};

export default TopicVideo;