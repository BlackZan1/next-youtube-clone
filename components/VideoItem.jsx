import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { channelAPI } from '../services/api';
import { roundViews } from '../utils/roundViews';

import noIMG from '../public/img/noimage.png';

import styles from '../styles/videoItem.module.scss';

export default function VideoItem({ contentDetails, snippet, statistics, id }) {
    const [channelImage, setChannelImage] = useState(noIMG);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const res = await channelAPI.getById(snippet.channelId);

            debugger;

            setChannelImage(res.channel.items[0].snippet.thumbnails.default.url);
        })()
    }, [])

    const onClickHandler = () => {
        router.push(`/watch/${id}`);
    }

    let videoText = snippet.localized.title;
    let views = statistics.viewCount;
    let date = new Date(snippet.publishedAt).toLocaleDateString();

    if(videoText.length > 50) {
        videoText = videoText.slice(0, 50 - 3) + '...';
    }

    if(views >= 1000000) views = roundViews(views, 1000000, 'M');
    else if(views >= 1000) views = roundViews(views, 1000, 'k');

    return (
        <div className={styles.videoIt} onClick={onClickHandler}>
            <div className={styles.videoItImage}>
                <img src={snippet.thumbnails.medium.url} alt='Loading...' />
            </div>

            <div className={styles.videoItBottom}>
                <div className={styles.videoItChannel}>
                    <img src={channelImage} alt='Loading...' />
                </div>

                <div className={styles.videoItInfo}>
                    <p>{ videoText }</p>

                    <span>{ snippet.channelTitle }</span>

                    <span>{ views } views | { date }</span>
                </div>
            </div>
        </div>
    )
}