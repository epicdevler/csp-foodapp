'use client'
import { AspectRatio, Badge, Box, Button, Center, Container, FormControl, GridItem, Heading, IconButton, Image, Input, Link, MenuIcon, SimpleGrid, Stack, StackDivider, Table, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import OrderDetailTitle from "./_order_detail_title";

export default function Orders() {


  const OrdersTHead = <Tr>
    <Th>ITEMS</Th>
    <Th textAlign={'center'}>QTY</Th>
    <Th>Price</Th>
    <Th>Total Price</Th>
    <Th>Status</Th>
  </Tr>



  return (
    <Box p={5}>
      <OrderDetailTitle />

      <Container maxW={'container.lg'} py={50}>

        <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 3 }} spacing={8} >
          <GridItem >
            <VStack divider={
              <StackDivider
                borderStyle={'dashed'}
                borderColor='gray.200'
              />
            }
              borderRadius={'lg'}
              w={'full'}
              p={5}
              boxShadow={'lg'}
              alignItems={'center'}
              spacing={[5, 5]}
            >

              <Image
                src='/avatar.jpg'
                alt='Person'
                borderRadius={'lg'}
              />


              <Text>Customer Name</Text>
              <Text>Phone Number</Text>
              <Text>Email</Text>
            </VStack>
          </GridItem>

          <GridItem w={{ sm: 'full' }} colSpan={['auto', 2]}>
            {/* <Box h= > */}
              <TableContainer borderRadius={'lg'} w={'full'} h={'full'} pb={5} boxShadow={'lg'} >
                <Table  variant={'unstyled'} size="md">
                  <Thead bg='orange.500' textColor='white'>
                    {
                      OrdersTHead
                    }
                  </Thead>
                  <Tbody >
                    <Tr>
                      <Td>
                        <Stack direction={'row'} spacing={3}>
                          <Image src='' alt='' bg='gray.100' borderRadius={'lg'} w={'50px'} aspectRatio={1} />
                          <Stack direction={'column'} spacing={1}>
                            <Text fontWeight={'normal'} fontSize={'12px'}>Category</Text>
                            <Text fontWeight={'normal'}>Item</Text>
                          </Stack>
                        </Stack>
                      </Td>
                      <Td textAlign={'center'}>3x</Td>
                      <Td textAlign={'center'}>100</Td>
                      <Td textAlign={'center'}>300</Td>
                      <Td textAlign={'center'}><Badge colorScheme='green' borderRadius={'lg'} p={2}>Status</Badge></Td>
                      <Td hidden textAlign={'center'}>
                        <IconButton
                          aria-label="Action"
                          bg="transparent"
                        >
                          {/* <Image src={MenuIcon} alt={''} /> */}
                        </IconButton>
                      </Td>
                    </Tr>
                  </Tbody>  
                </Table>
              </TableContainer>
            {/* </Box>  */}
          </GridItem>
        </SimpleGrid>

      </Container>


    </Box>
  )
}
