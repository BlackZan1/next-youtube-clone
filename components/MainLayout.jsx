import Head from 'next/head';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Header from './Header';
import Sidebar from './Sidebar';
import useSearch from '../hooks/search.hook';
import { setSearchItemsAction } from '../redux/store';

export default function MainLayout({ children, title = 'YouRock' }) {
    const [sidebar, setSidebar] = useState('small');
    const [searchMode, setSearchMode] = useState(false);
    const { search, isFetching, results } = useSearch();
    const dispatch = useDispatch();
    const router = useRouter();

    const submitSearch = async (value) => {
        await search(value);

        setSearchMode(true);
    }

    if(searchMode) {
        setSearchMode(false);

        dispatch(setSearchItemsAction(results));

        router.push('/search');
    }

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta name='keywords' content='yourock,youtube clone,videos' />
                <meta name='description' content='Watch videos with YouRock!' />
            </Head>

            <Header submitSearch={submitSearch} />

            <div style={{ display: 'grid', gridTemplateColumns: `${sidebar === 'small' ? '75px' : '240px'} 1fr` }}>
                <Sidebar />

                { children }
            </div>
        </Fragment>
    )
}