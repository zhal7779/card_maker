import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from'./maker.module.css';

const Maker = ({FileInput, authService, cardRepository}) => {
    const navigate = useNavigate();
    const navigateState = useLocation().state;
    const [cards, setCards] = useState({});
    const [userId, setUserId] = useState(navigateState && navigateState.id);

    const onLogout = useCallback(() =>{
        authService.logout();
    },[authService]);

    useEffect(()=>{
        if(!userId) {
            return
        } 
        const stopSync = cardRepository.syncCards(userId, cards => {
            setCards(cards);
        })
        return () => {
            stopSync();
        }
    },[userId, cardRepository]);

    useEffect(()=>{ //useEffect는 로직별로 여러개 만들 수 있다.
        authService.onAuthChange(user => {
            if(user) {
                setUserId(user.uid);
            } else {
                navigate('/');
            }
        });
    },[authService, userId, navigate]);

    const createOrUpdateCard = (card) =>{
        setCards(cards => {
            const updated = {...cards};
            updated[card.id] = card;
            return updated;
        });
        cardRepository.saveCard(userId, card);
    };

    const deleteCard = (card) =>{
        setCards(cards => {
            const updated = {...cards};
            delete updated[card.id];
            return updated;
        });
        cardRepository.removeCard(userId, card);
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor 
                    FileInput = {FileInput}
                    cards ={cards}
                    addCard={createOrUpdateCard} 
                    updateCard={createOrUpdateCard} 
                    deleteCard={deleteCard}/>
                <Preview cards ={cards}/>
            </div>
            <Footer />

        </section>
    )
}
export default Maker;