import { auth } from "@/db_init"
import { User } from "firebase/auth"

export const DB_COLLECTIONS = {
    Menu: 'Menu',
    MenuCategories: 'MenuCategories',
    Orders: 'Orders',
    MyCart: (user?: User | null) => {
        const _user = user ? user : auth.currentUser
        const userId = _user?.uid
        return `Carts/${userId}/myCart/`
    },
}