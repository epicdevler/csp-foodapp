import { FieldValue, Timestamp } from "firebase/firestore"

export type BasicUserData = {
  fullName: string,
  email: string,
  uid: string,
  role: string,
  dateJoined?: Timestamp
}


export type BaseMenuItem = {
  title: string,
  description: string,
  price: string,
  categoryId: string,
  availableItemsInStock: string,
  imgName: string
}

export type MenuItem = {
  docId: string,
  title: string,
  description: string,
  price: string,
  categoryId: string,
  availableItemsInStock: string,
  imgName: string
}