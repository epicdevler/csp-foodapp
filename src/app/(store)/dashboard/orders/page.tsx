'use client'
import { Badge, Box, Flex, Heading, IconButton, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Text } from "@chakra-ui/react";
import MenuIcon from '../../../../../public/icons/menu_icon.svg'
import Image from "next/image";
import Link from "next/link";
import { collection, doc, onSnapshot, query, runTransaction } from "firebase/firestore";
import { firestore_db } from "@/db_init";
import { DB_COLLECTIONS } from "@/libs/firestore_utils";
import { useEffect, useState } from "react";
import { BasicUserData, Order } from "@/libs/models";
import { isEmpty } from "@/libs/utils";
import { Loader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';



type FEOrder = {
  status: "Delivered" | "Declined" | "Terminated" | "Failed" | "Processing",
  dateCreated: string,
  customerName: string,
  cost: string,
  orderId: string,
  deliveryAddress: string | "Self Pick Up",
}

export default function Orders() {


  const [isLoading, setLoading] = useState<boolean>(false)
  const [isLoadingOrders, setLoadingOrders] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [orders, setOrders] = useState<FEOrder[]>([])

  useEffect(() => {
    const unsub = onSnapshot(query(collection(firestore_db, DB_COLLECTIONS.Orders)), async (snap) => {
      try {
        runTransaction(firestore_db, async (transaction) => {
          const _orders: FEOrder[] = []
          for (let index = 0; index < snap.docs.length; index++) {
            const _doc = snap.docs[index];
            const order = (_doc.data() as Order)
            const ref = doc(firestore_db, "Users", order.userId)
            const userData = await transaction.get(ref)

            const user = (userData.data() as BasicUserData)

            const _order: FEOrder = {
              status: order.status,
              dateCreated: order.dateCreated.toDate().toDateString(),
              customerName: user.fullName,
              cost: order.cost,
              orderId: _doc.id,
              deliveryAddress: order.deliveryAddress,
            }
            _orders.push(_order)
          }
        
          setOrders(_orders)
          setLoadingOrders(false)
        })
      } catch (e) {
        setError(`${e}`)
      }
    })

    return () => {
      unsub()
    }
  }, [])




  return (
    <Box p={5}>
      <Heading size={'lg'}>Orders</Heading>

      <TableContainer mt={10}>
        <Table variant={'simple'} size="md">
          <Thead>
            <Tr>
              <Th textAlign={'center'}>ID</Th>
              <Th textAlign={'center'}>Date</Th>
              <Th>Customer</Th>
              <Th>Delivery Location</Th>
              <Th textAlign={'center'}>Amount</Th>
              <Th textAlign={'center'}>Status</Th>
              <Th textAlign={'center'}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>

            {
              orders.map(
                (item, index) => {
                  return (
                    <OrderRow key={index} item={item} sn={++index} />
                  )
                }
              )
            }

          </Tbody>
        </Table>
      </TableContainer>

      {
        isEmpty(orders) && !isLoadingOrders
          ?
          <Flex p={5} justifyContent={'center'}>
            <Text w={'full'} textAlign={'center'}>No Data</Text>
          </Flex>
          : undefined
      }




      {
        isLoadingOrders
          ? <div className="flex items-center justify-center w-full py-10">
            <Loader content="Loading..." vertical />
          </div>
          :
          undefined
      }

    </Box >
  )
}


const OrderRow = ({ item, sn }: { item: FEOrder, sn: number }) => {

  // "Delivered" | "Declined" | "Terminated" | "Failed" | "Processing",
  var color: string;

  switch (item.status) {
    case "Delivered":
      color = "green"
      break;
    case "Terminated":
      color = "red"
      break;
    case "Failed":
      color = "red"
      break;
    case "Processing":
      color = "orange"
      break;
    default:
      color = "#F2886D"
      break;
  }


  return (
    <Tr>
      <Td textAlign={'center'}>
        <Box as={Link} href={`/dashboard/orders/details/${item.orderId}`} textColor="blue.500" >{sn}</Box>
      </Td>
      <Td textAlign={'center'}>{item.dateCreated}</Td>
      <Td>{item.customerName}</Td>
      <Td>{item.deliveryAddress}</Td>
      <Td textAlign={'center'}>N{item.cost}</Td>
      <Td textAlign={'center'}>
        <Badge
          colorScheme={color}
          borderRadius={'lg'}
          p={2}
        >
          {item.status}
        </Badge>
      </Td>
      <Td textAlign={'center'}>
        <IconButton
          aria-label="Action"
          bg="transparent"
        >
          <Image src={MenuIcon} alt={''} />
        </IconButton>
      </Td>
    </Tr>
  )
}