import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from'./maker.module.css';
const Maker = ({authService}) => {
    const [cards, setCards] = useState([
        {
            id: '1',
            name: 'minyoung1',
            company: 'Naver',
            theme: 'dark',
            title: 'Software Engineer',
            email: 'zhal7779@naver.com',
            message: 'go for it',
            fileName:'minyoung',
            fileURL: null,
        },
        {
            id: '2',
            name: 'minyoung2',
            company: 'Naver',
            theme: 'light',
            title: 'Software Engineer',
            email: 'zhal7779@naver.com',
            message: 'go for it',
            fileName:'minyoung',
            fileURL: null,
        },
        {
            id: '3',
            name: 'minyoung3',
            company: 'Naver',
            theme: 'colorful',
            title: 'Software Engineer',
            email: 'zhal7779@naver.com',
            message: 'go for it',
            fileName:'minyoung',
            fileURL: null,
        }
    ]);

    const navigate = useNavigate();

    const onLogout = () =>{
        authService.logout();
    }

    useEffect(()=>{
        authService.onAuthChange(user => {
            if(!user) {
                navigate('/');
            }
        });
    });

    const addCard = (card) =>{
        const updated = [...cards, card];
        setCards(updated);
    }

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor cards ={cards} addCard={addCard}/>
                <Preview cards ={cards}/>
            </div>
            <Footer />

        </section>
    )
}
export default Maker;