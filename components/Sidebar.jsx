import { MdWhatshot, MdHome, MdVideoLibrary, MdLocalHospital } from 'react-icons/md';
import { useRouter } from 'next/router';

import styles from '../styles/sidebar.module.scss';

export default function Sidebar() {
    const router = useRouter();

    console.log(router.pathname);

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarM}>
                <ul>
                    <li style={{ color: router.pathname === '/' ? 'red' : '' }}>
                        <MdHome />
                        <span>Home</span>
                    </li>
                    <li style={{ color: router.pathname === '/trends' ? 'red' : '' }}>
                        <MdWhatshot />
                        <span>Trends</span>
                    </li>
                    <li style={{ color: router.pathname === '/subs' ? 'red' : '' }}>
                        <MdLocalHospital />
                        <span>Subscriptions</span>
                    </li>
                    <li style={{ color: router.pathname === '/library' ? 'red' : '' }}>
                        <MdVideoLibrary />
                        <span>Library</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}