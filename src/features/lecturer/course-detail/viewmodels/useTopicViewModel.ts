import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch } from '@app/stores';
import { useEffect, useState } from 'react';
import { getVideoVimeoWithAccessToken } from '../slices/actions';
import { VimeoRequest } from '../models/TopicVideo';

const useTopicViewModel = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const accessToken = localStorage.getItem('accessToken');
  const [vimeoRequest, setVimeoRequest] = useState<VimeoRequest | null>(null);

  // Fetch list course of lecture
  useEffect(() => {
    if (!accessToken) {
      router.push('/sign-in');
    } else if (vimeoRequest) {
      dispatch(
        getVideoVimeoWithAccessToken({
          accessToken: accessToken || '',
          videoUrl: vimeoRequest?.videoUrl || '',
          width: vimeoRequest?.width || 1460,
          height: vimeoRequest?.height || 586,
        })
      );
    }
  }, [accessToken, vimeoRequest]);

  return {
    vimeoRequest,
    setVimeoRequest,
  };
};

export default useTopicViewModel;
