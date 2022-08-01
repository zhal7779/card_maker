// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
//import firebaseApp from './firebase';


//     class AuthService {
//         login(providerName) {
//             const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
//             return firebase.auth().signInWithPopup(authProvider);
//         } 

//         logout() {
//             firebase.auth().signOut();
//         }
        
//         onAuthChange(onUserChanged) {
//             firebase.auth().onAuthStateChanged (user =>{
//                 onUserChanged(user);
//             });
//         }
//     }
//         export default AuthService;

import {getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';

    
class AuthService {
    constructor() {
        this.firebaseAuth = getAuth();
        this.googleProvider = new GoogleAuthProvider();
        this.githubProvider = new GithubAuthProvider();
    }
    
    login(providerName) {
        const authProvider = this.getProvider(providerName);
        return signInWithPopup(this.firebaseAuth, authProvider);
    }
    
    logout() {
        this.firebaseAuth.signOut();
    }
    
    onAuthChange(onUserChanged) {
        this.firebaseAuth.onAuthStateChanged((user) => {
            onUserChanged(user);
        });
    }
    
    getProvider(providerName) {
        switch (providerName) {
            case 'Google':
                return this.googleProvider;
            case 'Github':
                return this.githubProvider;
            default:
                throw new Error(`not supported provider: ${providerName}`);
        }
    }
}
    
    export default AuthService;
    