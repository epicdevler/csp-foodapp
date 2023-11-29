import { DocumentReference, FieldValue, Timestamp } from "firebase/firestore"

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
  price: number,
  categoryId: string,
  availableItemsInStock: string,
  imgName: string
}
export type MenuItem = {
  docId: string,
  title: string,
  description: string,
  price: number,
  categoryId: string,
  availableItemsInStock: string,
  imgName: string
}
export type Order = {
  items: DocumentReference[],
  status: "Delivered" | "Declined" | "Terminated" | "Failed" | "Processing",
  dateCreated: Timestamp,
  cost: string,
  userId: string,
  deliveryAddress: string | "Self Pick Up",
}
export type Cart = {
  cost?: string,
  count: number,
  dateAdded: Timestamp,
  menuRef: DocumentReference,
}
export type FECart = {
  count: number,
  menuItem: CartMenuItem,
  docId: DocumentReference,
}
export type CartMenuItem = {
  title: string,  
  price: number
}