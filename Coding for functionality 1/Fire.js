import firebase from 'firebase';

class Fire {
    constructor(){
        this.init();
        this.checkAuth();
    }
    init = () =>{
        if(firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyDVHEglqNy6uVIsy5plRZswboytbds5BEw",
    authDomain: "chat-app-87cd4.firebaseapp.com",
    databaseURL: "https://chat-app-87cd4.firebaseio.com",
    projectId: "chat-app-87cd4",
    storageBucket: "chat-app-87cd4.appspot.com",
    messagingSenderId: "398051596121",
    appId: "1:398051596121:web:e9ee4666a3a3196fa69e48"

            })
        }
    }
    checkAuth = () =>{
        firebase.auth().onAuthStateChanged(user => {
            if(!user){
                firebase.auth().signInAnonymously();
            }
        })

    }
    send = messages =>{
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp : firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }
            this.db.push(message)
        })

    }
    parse = message => {
        const {user, text, timestamp} = message.val()
        const {key: _id} = message
        const createdAt = new Date(timestamp)

        return{
            _id,
            createdAt,
            text,
            user
        }
    }

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)))
    }

    off(){
        this.db.off()
    }


    get db(){
        return firebase.database().ref("messages")
    }

    get uid(){
        return(firebase.auth().currentUser || {}).uid
    }
}

export default new Fire();
