import { useEffect, useState } from "react";

import Loader from "./Loader";
import { videosAPI } from "../services/api";
import { roundViews } from '../utils/roundViews';

import styles from '../styles/relatedVideo.module.scss';
import Link from "next/link";

export default function RelatedVideoItem({ id }) {
    const [data, setData] = useState({});
    const [isFetching, setFetching] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await videosAPI.getById(id);

            debugger;

            setData(res.video.items[0]);
            setFetching(false);
        })()
    }, [])

    if(isFetching) {
        return <Loader />;
    }

    let relatedVideoTitle = data.snippet.title;
    let views = data.statistics.viewCount;
    
    if(relatedVideoTitle.length > 40) relatedVideoTitle = relatedVideoTitle.slice(0, 40 - 3) + '...';

    if(views >= 1000000) views = roundViews(views, 1000000, 'M');
    else if(views >= 1000) views = roundViews(views, 1000, 'k');

    return (
        <Link href='/watch/:id' as={`/watch/${id}`}>
            <a>
                <div className={styles.relatedV}>
                    <div className={styles.relatedV_image}>
                        <img src={ data.snippet.thumbnails.medium.url } alt='Loading...' />
                    </div>

                    <div className={styles.relatedV_info}>
                        <p>{ relatedVideoTitle }</p>

                        <span>{ data.snippet.channelTitle }</span>

                        <span>{ views } views</span>
                    </div>
                </div>
            </a>
        </Link>
    )
}