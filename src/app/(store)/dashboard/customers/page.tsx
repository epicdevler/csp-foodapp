'use client'
import { Badge, Box, Flex, Heading, IconButton, MenuItem, Table, TableContainer, Text, Tbody, Td, Tfoot, Th, Thead, ToastId, Tr, useToast } from "@chakra-ui/react";
import MenuIcon from '../../../../../public/icons/menu_icon.svg'
import Image from "next/image";
import Link from "next/link";
import { firestore_db } from "@/db_init"
import { BaseMenuItem, BasicUserData } from "@/libs/models";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { DB_COLLECTIONS, USERS_ROLE } from "@/libs/auth/utils";
import Head from "next/head";
import { isEmpty } from "@/libs/utils";

export default function Customers() {

  const [isLoading, setLoading] = useState<boolean>(false)
  const [isLoadingUsers, setLoadingUsers] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [customers, setCustomers] = useState<BasicUserData[]>([])



  const toast = useToast()
  const toastIdRef = useRef<ToastId>()

  useEffect(
    () => {
      if (!isEmpty(error)) {
        toastIdRef.current = toast(
          {
            description: `${error}`,
            status: 'error',
            duration: 1500,
          }
        )
      }
    }, [error]
  )




  useEffect(() => {
    const q = query(collection(firestore_db, DB_COLLECTIONS.USERS), where("role", "==", USERS_ROLE.CLIENT))

    const unsub = onSnapshot(
      q, (snap) => {

        const items: BasicUserData[] = []

        snap.docs.forEach(
          doc => {
            const data = (doc.data() as BasicUserData)
            items.push(data)
            setLoadingUsers(false)
          }
        )

        setCustomers(items)



      }
    )

    return () => {
      unsub()
    }
  }, [])


  return (
    <Box p={5}>
      <Head>
        <title>Customers | Dashboard</title>
      </Head>
      <Heading size={'lg'}>Customers</Heading>

      <TableContainer mt={10}>
        <Table variant={'simple'} size="md">
          <Thead>
            <Tr>
              <Th textAlign={'center'}>S/N</Th>
              <Th textAlign={'center'}>Date Joined</Th>
              <Th>Customer</Th>
              <Th>Address</Th>
              <Th textAlign={'center'}>Number</Th>
              <Th textAlign={'center'}>Email</Th>
              <Th textAlign={'center'}>Verified</Th>
              <Th textAlign={'center'}>Action</Th>
            </Tr>
          </Thead>
          {
            customers.map(
              (customer, index) => {
                return (
                  <Tbody key={index}>
                    <Tr>
                      <Td textAlign={'center'}>
                        {++index}
                      </Td>
                      <Td textAlign={'center'}>
                        {
                          customer.dateJoined ? customer.dateJoined.toDate().toDateString() : ""
                        }
                      </Td>
                      <Td><Box as={Link} href={`"/dashboard/customers/detail/${customer.uid}"`} textColor="blue.500" >{customer.fullName}</Box></Td>
                      <Td>None</Td>
                      <Td textAlign={'center'}>None</Td>
                      <Td textAlign={'center'}>{customer.email}</Td>
                      <Td textAlign={'center'}><Badge colorScheme='green' borderRadius={'lg'} p={2}>Active</Badge></Td>
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
                )
              }
            )
          }
        </Table>
      </TableContainer>




      {
        isEmpty(customers) && !isLoadingUsers
          ?
          <Flex p={5} justifyContent={'center'}>
            <Text w={'full'} textAlign={'center'}>No Data</Text>
          </Flex>
          : undefined
      }

    </Box>
  )
}
