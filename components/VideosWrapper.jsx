import { Fragment } from 'react';

import VideoItem from './VideoItem';
import Loader from './Loader';

import styles from '../styles/videosWrapper.module.scss';

export default function VideosWrapper({ data, isFetching }) {
    return (
        <Fragment>
            {
                isFetching ?
                <Loader />
                :
                <div className={styles.videoW}>
                    {
                        data.length ?
                        data.map(item => {
                            return (
                                <div key={item.etag}>
                                    <VideoItem 
                                        contentDetails={item.contentDetails} 
                                        snippet={item.snippet} 
                                        statistics={item.statistics} 
                                        id={item.id}
                                    />
                                </div>
                            )
                        })
                        :
                        null
                    }
                </div>
            }
        </Fragment>
    )
}