import {db} from '../firebase-config'
import { collection,getDocs,getDoc,addDoc,updateDoc,deleteDoc,doc,serverTimestamp } from 'firebase/firestore'


const usersCollectionRef=collection(db,"user");


class users{
    addUsers=(newUser)=>{
        return addDoc(usersCollectionRef,newUser);
    };


    updateUsers=(id,updatedUsers)=>{
        const usersDoc=doc(db,"user",id);
        return updateDoc(usersDoc,updatedUsers);
    };


    deleteUsers=(id)=>{
        const usersDoc=doc(db,"user",id);
        return deleteDoc(usersDoc);
    };
    getAllUsers=()=>{
        return getDocs(usersCollectionRef);
    }
    getUsers=(id)=>{
        const usersDoc=doc(db,"user",id);
        return getDoc(usersDoc);
    }
}

export default new users();