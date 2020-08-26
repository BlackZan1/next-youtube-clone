import { useRouter } from 'next/router';
import { useEffect, useState, Fragment } from 'react';
import { MdThumbUp, MdThumbDown, MdRedo, MdPlaylistAdd } from 'react-icons/md';

import { videosAPI, channelAPI } from '../../services/api';

import MainLayout from '../../components/MainLayout';
import RelatedVideoItem from '../../components/RelatedVideoItem';
import Loader from '../../components/Loader';
import { roundViews } from '../../utils/roundViews';

import styles from '../../styles/watchVideo.module.scss';

const roundCount = (count) => {
    if(count >= 1000000) count = roundViews(count, 1000000, 'M');
    else if(count >= 1000) count = roundViews(count, 1000, 'k');

    return count;
}

export default function WatchVideo() {
    const [video, setVideo] = useState(null);
    const [data, setData] = useState({});
    const [channelData, setChannelData] = useState({});
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [isFetching, setFetching] = useState(true);

    const { pid } = useRouter().query;

    useEffect(() => {
        if(!pid) return;

        (async () => {
            const res = await videosAPI.getById(pid);

            setVideo(res.video.items[0].player.embedHtml);
            setData(res.video.items[0]);

            const relatedRes = await videosAPI.getRelatedVideosById(pid);

            setRelatedVideos(relatedRes.relatedVideos.items);
            setFetching(false);
        })()
    }, [pid])

    useEffect(() => {
        if(!data.snippet) return;

        (async () => {
            const res = await channelAPI.getById(data.snippet.channelId);

            setChannelData(res.channel.items[0]);
        })()
    }, [data])

    if(isFetching) return <Loader />

    if(!data.snippet) return null;
    if(!channelData.snippet) return null;

    let date = new Date(data.snippet.publishedAt).toLocaleDateString();
    let likes = roundCount(data.statistics.likeCount);
    let dislikes = roundCount(data.statistics.dislikeCount);
    let subs = roundCount(channelData.statistics.subscriberCount);
    
    return (
        <MainLayout>
            <div className={styles.watchV}>
                <div className={styles.watchV_left}>
                    <div className={styles.watchV_video} dangerouslySetInnerHTML={{__html: video}} />
                

                    <div className={styles.watchV_left_info}>
                        <p>{ data.snippet.title }</p>

                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            paddingBottom: '1.2rem', 
                            borderBottom: '1px solid #dcdcdc' 
                        }}>
                            <div>
                                <span>
                                    { data.statistics.viewCount } views | { date }
                                </span>
                            </div>

                            <div className={styles.watchV_left_menu}>
                                <div >
                                    <span>
                                        <MdThumbUp />

                                        &nbsp; { likes }
                                    </span>

                                    <span>
                                        <MdThumbDown />

                                        &nbsp; { dislikes }
                                    </span>
                                </div>

                                <div>
                                    <MdRedo /> 
                                    &nbsp; SHARE
                                </div>

                                <div>
                                    <MdPlaylistAdd /> 
                                    &nbsp; SAVE
                                </div>
                            </div>
                        </div>

                        <div className={styles.watchV_left_desc}>
                            <div>
                                <div className={styles.watchV_left_image}>
                                    <img src={channelData.snippet.thumbnails.default.url} alt='Loading...' />
                                </div>

                                <div>
                                    <p>{ channelData.snippet.title }</p>

                                    <span>{ subs } subscribers</span>
                                </div>

                                <button id='yt-button'>
                                    Subscribe
                                </button>
                            </div>

                            <div style={{ paddingLeft: '5.9rem', width: '70%', paddingTop: '2rem'}}>
                                { data.snippet.description }
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className={styles.watchV_right}>
                    {
                        !relatedVideos.length ?
                        <Loader />
                        :
                        <Fragment>
                            <p>Up next</p>

                            <div>
                                <RelatedVideoItem id={relatedVideos[0].id.videoId} />
                            </div>

                            <hr />

                            <div>
                                {
                                    relatedVideos.slice(1).map(video => {
                                        return <RelatedVideoItem id={video.id.videoId} />
                                    })
                                }
                            </div>
                        </Fragment>
                    }
                </div>
            </div>
        </MainLayout>
    )
}