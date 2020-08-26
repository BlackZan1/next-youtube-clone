import LoaderGIF from '../public/img/loader.gif';

import styles from '../styles/loader.module.scss';

export default function Loader() {
    return (
        <div className={styles.mainLoader}>
            <img src={LoaderGIF} alt="loading..." />
        </div>
    )
}