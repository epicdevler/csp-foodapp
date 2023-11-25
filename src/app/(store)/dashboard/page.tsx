'use client'
import { Box, SimpleGrid, GridItem, Heading, Text, Flex, Badge, Th, IconButton, MenuIcon, Table, TableContainer, Tbody, Td, Tfoot, Thead, Tr } from "@chakra-ui/react";
import OrdersSVG from '../../../../public/icons/dashboard_icon_orders.svg'
import CancelledSVG from '../../../../public/icons/dashboard_icon_cancelled.svg'
import DeliveredSVG from '../../../../public/icons/dashboard_icon_delivered.svg'
import RevenuesSVG from '../../../../public/icons/dashboard_icon_revenue.svg'
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { auth } from "@/db_init";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const DashboardReviewItem = (
  { count, label, imgUrl }: { count: number, label: string, imgUrl: StaticImport }
) => {

  return <Flex alignItems='center' p={3} boxShadow={'md'} borderRadius={'lg'}>
    <Box w={'full'} ms={3}>
      <Heading size='md'>{count}</Heading>
      <Text fontSize="14px" fontWeight='normal'>{label}</Text>
    </Box>
    <Image src={imgUrl} alt={""} />
  </Flex>
}

export default function Dashboard() {

  const NewOrdersTHead = <Tr>
    <Th textAlign={'center'}>ID</Th>
    <Th textAlign={'center'}>Date</Th>
    <Th>Customer</Th>
    <Th>Delivery Location</Th>
    <Th textAlign={'center'}>Amount</Th>
  </Tr>




  return (
    <Box p={5}>
      <Heading>Dashboard</Heading>
      <SimpleGrid mt={10} spacing={5} columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        <GridItem>
          <DashboardReviewItem count={100} label="Total Orders" imgUrl={OrdersSVG} />
        </GridItem>
        <GridItem>
          <DashboardReviewItem count={100} label="Total Delivered" imgUrl={DeliveredSVG} />
        </GridItem>
        <GridItem>
          <DashboardReviewItem count={100} label="Total Cancelled" imgUrl={CancelledSVG} />
        </GridItem>
        <GridItem>
          <DashboardReviewItem count={100} label="Total Revenue" imgUrl={RevenuesSVG} />
        </GridItem>
      </SimpleGrid>

      <SimpleGrid spacing={5} columns={1}>
        <GridItem>

          <Box mt={10}>
            <Flex justifyContent={'space-between'}>
              <Heading me={3} size={'md'}>New Orders</Heading>
              <Text as={Link} href="/dashboard/orders?sort=new" textColor={"blue.100"}>View All</Text>
            </Flex>

            <TableContainer mt={10}>
              <Table variant={'simple'} size="md">
                <Thead>
                  {
                    NewOrdersTHead
                  }
                </Thead>
                <Tbody>
                  <Tr>
                    <Td textAlign={'center'}>
                      <Box as={Link} href="/dashboard/orders/details/123" textColor="blue.500" >#123</Box>
                    </Td>
                    <Td textAlign={'center'}>Date</Td>
                    <Td>Philip Nwadike</Td>
                    <Td>Willbros Junction</Td>
                    <Td textAlign={'center'}>450.00</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  {
                    NewOrdersTHead
                  }
                </Tfoot>
              </Table>
            </TableContainer>

          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}
