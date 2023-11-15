'use client'
import { Heading, Box, TableContainer, Table, Thead, Tbody, Th, Tr, Td, Badge, IconButton, Tfoot, Flex, Text, Button, Modal, ModalOverlay, ModalContent, Container, GridItem, ModalBody, ModalCloseButton, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from '../../../../../public/icons/menu_icon.svg'
import { useState } from "react";
import AddMenuItem from "./add_menu";
import MenuCategories from "./menu_cat";

export default function Menu() {

  const [addItem, setAddItem] = useState<boolean>(false)
  const [menuCategoryOpen, setMenuCategoryOpen] = useState<boolean>(false)
  

  const toggleAddItem = () => {
    setAddItem(!addItem)
  }
  const toggleOpenCategories = () => {
    setMenuCategoryOpen(!menuCategoryOpen)
  }

  return (
    <>
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
              <Tr>
                <Td textAlign={'center'}>
                  1
                </Td>
                <Td textAlign={'center'}>
                  <Flex justifyContent={'center'} >
                    <Image
                      src={''}
                      alt={''}
                      style={{
                        width: '80px',
                        aspectRatio: 1,
                        borderRadius: '100px',
                        background: 'grey'
                      }}
                    />
                  </Flex>
                </Td>
                <Td>
                  <Text>
                    Item
                  </Text>
                </Td>
                <Td>Category Name</Td>
                <Td textAlign={'center'}>
                  <IconButton
                    aria-label="Action"
                    bg="transparent"
                  >
                    <Image src={MenuIcon} alt={''} />
                  </IconButton>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

      </Box>



      <AddMenuItem addItem={addItem} openCategories={toggleOpenCategories} toggleAddItem={toggleAddItem} />

      <MenuCategories openCat={menuCategoryOpen} toggleCloseCat={toggleOpenCategories} />
    </>
  )
}
