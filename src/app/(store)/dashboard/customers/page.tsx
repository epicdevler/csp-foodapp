import { Badge, Box, Heading, IconButton, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import MenuIcon from '../../../../../public/icons/menu_icon.svg'
import Image from "next/image";
import Link from "next/link";

export default function Customers() {

  const THead = <Tr>
    <Th textAlign={'center'}>S/N</Th>
    <Th textAlign={'center'}>Date Joined</Th>
    <Th>Customer</Th>
    <Th>Address</Th>
    <Th textAlign={'center'}>Number</Th>
    <Th textAlign={'center'}>Email</Th>
    <Th textAlign={'center'}>Verified</Th>
    <Th textAlign={'center'}>Action</Th>
  </Tr>

  return (
    <Box p={5}>
      <Heading size={'lg'}>Customers</Heading>

      <TableContainer mt={10}>
        <Table variant={'simple'} size="md">
          <Thead>
            {
              THead
            }
          </Thead>
          <Tbody>
            <Tr>
              <Td textAlign={'center'}>
                1
              </Td>
              <Td textAlign={'center'}>Date</Td>
              <Td><Box as={Link} href="/dashboard/customers/detail/90" textColor="blue.500" >Philip Nwadike</Box></Td>
              <Td>Willbros Junction</Td>
              <Td textAlign={'center'}>+23480000000</Td>
              <Td textAlign={'center'}>emailId@domain.com</Td>
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
              THead
            }
          </Tfoot>
        </Table>
      </TableContainer>

    </Box>
  )
}
