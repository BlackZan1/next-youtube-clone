import Loader from "./Loader";
import SearchVideoItem from "./SearchVideoItem";

import styles from '../styles/search.module.scss';

export default function SearchWrapper({ data, isFetching }) {
    return (
        <div className={styles.searchW}>
            {
                isFetching ?
                <Loader />
                :
                (
                    data.length ?
                    data.map(item => {
                        return <SearchVideoItem key={item.etag} id={item.id.videoId} />
                    })
                    :
                    <p>No results</p>
                )
            }
        </div>
    )
}