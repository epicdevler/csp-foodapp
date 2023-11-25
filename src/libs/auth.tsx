import { auth, firestore_db } from "@/db_init";
import { Auth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { DB_COLLECTIONS } from "./auth/utils";

type SignInData = {
    email: string,
    password: string
}

type ErrorData = {
    message: 'string'
}
type SuccessData = {
}
type AuthResponse = {
    data: ErrorData | SuccessData,
    message: string
}


export async function loadUser(userId: string) {
    console.log(userId)
    return await getDoc(doc(firestore_db, DB_COLLECTIONS.USERS, userId))
  }


export async function logOut() {
    signOut(auth).then(() => {
        console.log("Signed Out")
    }).catch((error) => {
        console.error("SignOut: " + error)
    });
}
