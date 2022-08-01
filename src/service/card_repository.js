import { getDatabase, ref, set, remove, onValue, off } from "firebase/database";

class CardRepository {
  constructor(app) {
    this.db = getDatabase(app);
  }
  syncCards(userId, onUpdate) {
    const query = ref(this.db, `${userId}/cards`);
    onValue(query, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => off(query);
  }
  saveCard(userId, card) {
    set(ref(this.db, `${userId}/cards/${card.id}`), card);
  }

  removeCard(userId, card) {
    remove(ref(this.db, `${userId}/cards/${card.id}`));
  }
};








// {
//   syncCards(userId, onUpdate) {
//     const db = getDatabase();
//     const syncRef = ref(db,`${userId}/cards`);
//     onValue(syncRef, snapshot => {
//       const value = snapshot.val();
//       value && onUpdate(value);
//     });
//     return () => syncRef.off();
//   }

//   saveCard(userId, card) {
//     const db = getDatabase();
//     set(ref(db, `${userId}/cards/${card.id}`), card);
//   }

//   removeCard(userId, card) {
//     const db = getDatabase();
//     const cardRef = ref(db, `${userId}/cards/${card.id}`);
//     remove(cardRef);
//   }





    // saveCard(userId, card) {
    //     firebaseApp.database().ref(`${userId}/cards/${card.id}`).set(card);
    // };

    // removeCard(userId, card) {
    //   ;  firebaseApp.database().ref(`${userId}/cards/${card.id}`).remove(card);
    // }


export default CardRepository;