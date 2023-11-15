import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, Input, VStack, Flex, Text, Divider, HStack, IconButton, Box, useRadio, useRadioGroup } from "@chakra-ui/react"
import Link from "next/link"

function RadioCard({ ...props }) {
    const { getInputProps, getRadioProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getRadioProps()

    return (
        <Box
            w={'full'} as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='lg'
                w={'full'}
                textAlign={'center'}
                _checked={{
                    color: 'teal.700',
                    borderColor: 'teal.700',
                    borderWidth: "2px",
                }}
                _focus={{}}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    )
}

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const options = ['Cash', 'Debit']


    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'payment_option',
        defaultValue: 'Cash',
        onChange: console.log,
    })

    const group = getRootProps()

    return <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={['full', 'sm', 'sm']}
    >
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
                Your Cart
            </DrawerHeader>

            <DrawerBody fontSize={"14px"}>
                <VStack spacing={3}>

                    {/* ITEMS */}
                    <VStack w={'full'} p={4} borderRadius={'lg'} bg={'gray.50'} spacing={5}>
                        {
                            [...Array(3)].map(
                                (_, index) => {
                                    return <HStack key={index} bg={'gray.100'} alignItems={'center'} spacing={2} w={'full'} p={3} borderRadius={'lg'} >

                                        <Box w='full'>
                                            <Text fontSize={"16px"} textColor={'black.500'} fontWeight={500}>Title</Text>
                                            <Text mb={4} mt={2}>Cost</Text>
                                        </Box>
                                        <VStack alignItems={'center'}>
                                            <IconButton
                                                bg={'gray.200'}
                                                size={'sm'}
                                                borderRadius={'lg'}
                                                aria-label={""}
                                                icon={
                                                    <Text>+</Text>
                                                }
                                                _hover={{}} />
                                            <Text>1</Text>
                                            <IconButton
                                                bg={'gray.200'}
                                                size={'sm'}
                                                borderRadius={'lg'}
                                                _hover={{}}
                                                icon={
                                                    <Text>-</Text>
                                                }
                                                aria-label={""} />
                                        </VStack>
                                    </HStack>
                                }
                            )
                        }
                    </VStack>

                    {/* CALCUATION */}
                    <VStack w={'full'} p={4} borderRadius={'lg'} bg={'gray.50'} spacing={5}>
                        <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
                            <Text textColor={'blackAlpha.700'}>Subtotal</Text>
                            <Text>$100.0</Text>
                        </Flex>
                        <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
                            <Text textColor={'blackAlpha.700'}>Tax</Text>
                            <Text>$50.0</Text>
                        </Flex>
                        <Divider />
                        <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
                            <Text textColor={'blackAlpha.700'}>Total</Text>
                            <Text>$150.0</Text>
                        </Flex>
                    </VStack>

                    {/* CART ACTIONS */}
                    <VStack mb={9} w={'full'} p={4} borderRadius={'lg'} bg={'gray.50'} spacing={5}>
                        <HStack w={'full'} {...group}>
                            {options.map((value) => {
                                const radio = getRadioProps({ value })
                                return (
                                    <RadioCard key={value} {...radio}>
                                        {value}
                                    </RadioCard>
                                )
                            })}
                        </HStack>

                        <Button as={Link} href="/cart/checkout" _hover={{ bg: 'teal.600' }} fontWeight={400} p={3} w={'full'} bg='teal.700' textColor="white">Place Order</Button>
                    </VStack>
                </VStack>
            </DrawerBody>
        </DrawerContent>
    </Drawer>
}

export default CartDrawer

