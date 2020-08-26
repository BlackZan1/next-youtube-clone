import { GrYoutube } from 'react-icons/gr';
import { MdMenu, MdKeyboard, MdSearch, MdNotifications, MdVideocam } from 'react-icons/md';
import Link from 'next/link';
import { useState } from 'react';

import styles from '../styles/header.module.scss';

export default function Header({ changeValue, submitSearch }) {
    const [value, setValue] = useState('');

    const onChangeHandler = (ev) => {
        const { value } = ev.currentTarget;

        setValue(value);
    }

    const onKeyDownHandler = (ev) => {
        if(ev.keyCode === 13) {
            submitSearch(value);
        }
    }

    const onClickHandler = () => {
        debugger;

        submitSearch(value);
    }

    return (
        <header className={styles.h}>
            <div className={styles.hStart}>
                <button className={styles.hMenu}>
                    <MdMenu />
                </button>
                
                <div className={styles.hLogo}>
                    <Link href='/'>
                        <a>
                            <GrYoutube style={{ margin: '0 5px -2px 0' }} />
                            <p>YouRock</p>
                        </a>
                    </Link>
                </div>
            </div>
 
            <form className={styles.hForm} onSubmit={(ev) => ev.preventDefault()}>
                <div className={styles.hInput}>
                    <input value={value} type='text' placeholder='Enter here' onKeyDown={onKeyDownHandler} onChange={onChangeHandler} />

                    <button>
                        <MdKeyboard />
                    </button>
                </div>

                <button id='search-btn' disabled={!value.length} onClick={onClickHandler}>
                    <MdSearch />
                </button>
            </form>

            <div className={styles.hEnd}>
                <button><MdVideocam /></button>

                <button><MdNotifications /></button>

                <div className={styles.hUserImage}>
                    <img src='https://muzofond.fm/img/collections/321686_big.jpg' alt='Loading...' />
                </div>
            </div>
        </header>
    )
}