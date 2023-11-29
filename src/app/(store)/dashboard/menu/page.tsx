'use client'
import { Heading, Box, TableContainer, Table, Thead, Tbody, Th, Tr, Td, Badge, IconButton, Tfoot, Flex, Text, Button, Modal, ModalOverlay, ModalContent, Container, GridItem, ModalBody, ModalCloseButton, SimpleGrid, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from '../../../../../public/icons/menu_icon.svg'
import { ChangeEvent, use, useEffect, useState } from "react";
import AddMenuItem from "./add_menu";
import MenuCategories from "./menu_cat";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { firestore_db, storage_db } from "@/db_init";
import { DB_COLLECTIONS } from "@/libs/firestore_utils";
import { MenuItem, BaseMenuItem } from "@/libs/models";
import { getBlob, ref } from "firebase/storage";
import Head from "next/head";
import { isEmpty } from "@/libs/utils";
import { getImageResult } from "@/libs/storage_utils";




export default function Menu() {

  const [isLoading, setLoading] = useState<boolean>(false)
  const [isLoadingMenu, setLoadingMenu] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])


  const [addItem, setAddItem] = useState<boolean>(false)
  const [menuCategoryOpen, setMenuCategoryOpen] = useState<boolean>(false)
  const [menuCategoryValue, setMenuCategoryValue] = useState<string>('')



  const toggleAddItem = () => {
    setAddItem(!addItem)
  }
  const toggleOpenCategories = () => {
    setMenuCategoryOpen(!menuCategoryOpen)
  }

  const setSelectCategory = (value: string) => {
    setMenuCategoryValue(value)
    toggleOpenCategories()
  }


  useEffect(() => {
    const q = query(collection(firestore_db, DB_COLLECTIONS.Menu))

    const unsub = onSnapshot(
      q, (snap) => {

        const items: MenuItem[] = []

        snap.docs.forEach(
          doc => {
            const data = doc.data()
            const baseMenu = (data as BaseMenuItem)
            items.push(
              {
                docId: doc.id,
                title: baseMenu.title,
                description: baseMenu.description,
                price: baseMenu.price,
                categoryId: data.categoryId,
                availableItemsInStock: baseMenu.availableItemsInStock,
                imgName: baseMenu.imgName
              }
            )
            setLoadingMenu(false)
          }
        )

        setMenuItems(items)



      }
    )

    return () => {
      unsub()
    }
  }, [])

  return (
    <>
    <Head>
      <title>Menu | Dashboard</title>
    </Head>
      <Box p={5}>
        <Heading size={'lg'}>Menu Items</Heading>

        <Button
          colorScheme="green"
          mt={5}
          onClick={toggleAddItem}
        >
          Add Item
        </Button>



        <TableContainer mt={10}>


          <Table variant={'simple'} size="md">
            <Thead>
              <Tr>
                <Th textAlign={'center'}>#</Th>
                <Th textAlign={'center'}>Item Image</Th>
                <Th>Item Name</Th>
                <Th>Category Name</Th>
                <Th textAlign={'center'}>Action</Th>
              </Tr>
            </Thead>


            <Tbody>

              {
                menuItems.map(
                  (item, index) => {
                    return <MenuItemRow isLoaded={!isLoadingMenu} key={index} sn={++index} item={item} />
                  }
                )
              }

            </Tbody>

          </Table>
        </TableContainer>



        {
          isEmpty(menuItems) && !isLoadingMenu
            ?
            <Flex p={5} justifyContent={'center'}>
              <Text w={'full'} textAlign={'center'}>No Data</Text>
            </Flex>
            : undefined
        }


      </Box>



      {
        addItem ?
          <AddMenuItem addItem={addItem} openCategories={toggleOpenCategories} toggleAddItem={toggleAddItem} categoryValue={menuCategoryValue} onCategoryValueChange={() => { }} />
          :
          undefined
      }


      {
        menuCategoryOpen ?
          <MenuCategories openCat={menuCategoryOpen} toggleCloseCat={toggleOpenCategories} onCategoryValueChange={setSelectCategory} />
          :
          undefined
      }



    </>
  )
}


const MenuItemRow = ({ sn, item, isLoaded }: { isLoaded: boolean, sn: number, item: MenuItem }) => {

  const [imgUrl, setImgUrl] = useState<string>("")
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {

    getImageResult(item.imgName)
      .then(url => {
        setImgUrl(url)
        setLoading(false)
      })

  }, [item])



  {
    return (
      <Tr>
        <Td textAlign={'center'}>
          <Skeleton isLoaded={isLoaded}>{sn}</Skeleton>
        </Td>
        <Td textAlign={'center'}>
          <Flex justifyContent={'center'} >
            <SkeletonCircle size='80px' isLoaded={!isLoading && isLoaded} >
              <Image
                src={imgUrl}
                alt={`Image of ${item.title}`}
                width={80}
                height={80}
                style={{
                  width: '80px',
                  aspectRatio: 1,
                  borderRadius: '100px'
                }}

              />
            </SkeletonCircle>
          </Flex>
        </Td>
        <Td>
          <Skeleton isLoaded={isLoaded}>

            <Text>
              {item.title}
            </Text>
          </Skeleton>
        </Td>
        <Td>
          <Skeleton isLoaded={isLoaded}>
            {item.categoryId}
          </Skeleton>
        </Td>
        <Td textAlign={'center'}>
          <Skeleton isLoaded={isLoaded}>
            <IconButton
              aria-label="Action"
              bg="transparent"
            >
              <Image src={MenuIcon} alt={''} />
            </IconButton>
          </Skeleton>
        </Td>
      </Tr>
    )
  }
}