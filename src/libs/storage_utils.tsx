import { storage_db } from "@/db_init"
import { getBlob, ref } from "firebase/storage"

export const STORAGE_PATHS = {
  MENU_CATEGORYIES: "menu/categories",
  MENU: "menu"
}



export function getImageResult(imgPath: string) {
  return getBlob(ref(storage_db, imgPath))
    .then(data => {
      const _URL = URL.createObjectURL(data)
      return _URL
    })
    .catch(error => {
      console.error("Image Download Error: ", error)
    })
}
