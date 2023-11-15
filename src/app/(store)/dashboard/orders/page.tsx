import { Badge, Box, Heading, IconButton, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import MenuIcon from '../../../../../public/icons/menu_icon.svg'
import Image from "next/image";
import Link from "next/link";

export default function Orders() {

  const OrdersTHead = <Tr>
    <Th textAlign={'center'}>ID</Th>
    <Th textAlign={'center'}>Date</Th>
    <Th>Customer</Th>
    <Th>Delivery Location</Th>
    <Th textAlign={'center'}>Amount</Th>
    <Th textAlign={'center'}>Status</Th>
    <Th textAlign={'center'}>Action</Th>
  </Tr>

  return (
    <Box p={5}>
      <Heading size={'lg'}>Orders</Heading>

      <TableContainer mt={10}>
        <Table variant={'simple'} size="md">
          <Thead>
            {
              OrdersTHead
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
              <Td textAlign={'center'}><Badge colorScheme='green' borderRadius={'lg'} p={2}>Status</Badge></Td>
              <Td textAlign={'center'}>
                <IconButton
                  aria-label="Action"
                  bg="transparent"
                >
                  <Image src={MenuIcon} alt={''} />
                </IconButton>
              </Td>
            </Tr>
            <Tr>
              <Td textAlign={'center'}>
                <Box as={Link} href="/dashboard/orders/details/123" textColor="blue.500" >#123</Box>
              </Td>
              <Td textAlign={'center'}>Date</Td>
              <Td>Philip Nwadike</Td>
              <Td>Willbros Junction</Td>
              <Td textAlign={'center'}>450.00</Td>
              <Td textAlign={'center'}><Badge colorScheme='green' borderRadius={'lg'} p={2}>Status</Badge></Td>
              <Td textAlign={'center'}>
                <IconButton
                  aria-label="Action"
                  bg="transparent"
                >
                  <Image src={MenuIcon} alt={''} />
                </IconButton>
              </Td>
            </Tr>
            <Tr>
              <Td textAlign={'center'}>
                <Box as={Link} href="/dashboard/orders/details/123" textColor="blue.500" >#123</Box>
              </Td>
              <Td textAlign={'center'}>Date</Td>
              <Td>Philip Nwadike</Td>
              <Td>Willbros Junction</Td>
              <Td textAlign={'center'}>450.00</Td>
              <Td textAlign={'center'}><Badge colorScheme='green' borderRadius={'lg'} p={2}>Status</Badge></Td>
            
              <Td textAlign={'center'}>
                <IconButton
                  aria-label="Action"
                  bg="transparent"
                >
                  <Image src={MenuIcon} alt={''} />
                </IconButton>
              </Td>
            </Tr>
            <Tr>
              <Td textAlign={'center'}>
                <Box as={Link} href="/dashboard/orders/details/123" textColor="blue.500" >#123</Box>
              </Td>
              <Td textAlign={'center'}>Date</Td>
              <Td>Philip Nwadike</Td>
              <Td>Willbros Junction</Td>
              <Td textAlign={'center'}>450.00</Td>
              <Td textAlign={'center'}><Badge colorScheme='green' borderRadius={'lg'} p={2}>Status</Badge></Td>

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
          <Tfoot>
            {
              OrdersTHead
            }
          </Tfoot>
        </Table>
      </TableContainer>

    </Box>
  )
}
