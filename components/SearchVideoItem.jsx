import Link from 'next/link';
import { useEffect, useState } from 'react';

import { videosAPI } from '../services/api';

import Loader from './Loader';

import styles from '../styles/relatedVideo.module.scss';
import { roundViews } from '../utils/roundViews';

export default function SearchVideoItem({ id }) {    
    const [data, setData] = useState({});
    const [isFetching, setFetching] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await videosAPI.getById(id);

            if(!res.video.items[0]) return;

            setData(res.video.items[0]);
            setFetching(false);
        })()
    }, [id])

    if(!data.snippet) return null;

    const { snippet, contentDetails, statistics } = data;

    let views = statistics.viewCount;
    let date = new Date(snippet.publishedAt).toLocaleDateString();
    let description = snippet.description;
    let videoText = snippet.title;

    if(description.length > 150) {
        description = description.slice(0, 120 - 3) + '...';
    }

    if(videoText.length > 70) {
        videoText = videoText.slice(0, 50 - 3) + '...';
    }

    if(views >= 1000000) views = roundViews(views, 1000000, 'M');
    else if(views >= 1000) views = roundViews(views, 1000, 'k');

    if(isFetching) {
        return <Loader />;
    }
    
    return (
        <Link href='/watch/[slug]' as={`/watch/${id}`}>
            <a>
                <div className={styles.relatedV}>
                    <div className={styles.relatedV_image}>
                        <img style={{ width: '220px' }} src={ snippet.thumbnails.medium.url } alt='Loading...' />
                    </div>

                    <div className={styles.relatedV_info}>
                        <p style={{ fontSize: '17.5px' }}>{ videoText }</p>

                        <span style={{ fontSize: '13px' }}>{ snippet.channelTitle } | { views } views | { date }</span>

                        <span style={{ fontSize: '13px' }}>{ description }</span>
                    </div>
                </div>
            </a>
        </Link> 
    )
}