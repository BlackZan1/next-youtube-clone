import { useEffect, useState } from 'react';

import MainLayout from '../components/MainLayout';
import VideosWrapper from '../components/VideosWrapper';

import { videosAPI } from '../services/api';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await videosAPI.getItems();

      setVideos(res.videos);
      setFetching(false);
    })()
  }, [])

  useEffect(() => {
    console.log(screenY)
  }, [])

  return (
    <MainLayout>
      <VideosWrapper data={videos} isFetching={isFetching} />
    </MainLayout>
  )
}
