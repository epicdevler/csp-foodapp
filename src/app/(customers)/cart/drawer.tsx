
'use client'
import { firestore_db } from "@/db_init"
import { DB_COLLECTIONS } from "@/libs/firestore_utils"
import { Cart, FECart, MenuItem } from "@/libs/models"
import { isEmpty } from "@/libs/utils"
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, Input, VStack, Flex, Text, Divider, HStack, IconButton, Box, useRadio, useRadioGroup } from "@chakra-ui/react"
import { query, collection, onSnapshot, getDoc, DocumentReference, getDocs, runTransaction, Transaction } from "firebase/firestore"
import Error from "next/error"
import Link from "next/link"
import { use, useEffect, useState } from "react"
import { Loader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

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
    const options = ['Debit']

    const [paymentMethod, setPaymentMethod] = useState<string>(options[0])

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'payment_option',
        defaultValue: options[0],
        onChange: (newValue) => {
            setPaymentMethod(newValue)
        },
    })

    const group = getRootProps()


    const [cartItems, setCartItems] = useState<FECart[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [showContent, setShowContent] = useState<boolean>(false)





    useEffect(() => {
        console.log(cartItems)
        var _total = 0
        cartItems.forEach(item => {
            _total += item.menuItem.price

        })
        setTotal(_total)
    }, [cartItems])


    useEffect(() => {

        const get = async () => {

            const q = query(collection(firestore_db, DB_COLLECTIONS.MyCart()))

            try {
                await runTransaction(firestore_db, async (transaction: Transaction) => {
                    const snap = await getDocs(q)

                    const list: FECart[] = []

                    for (let index = 0; index < snap.docs.length; index++) {
                        const doc = snap.docs[index];
                        const data = (doc.data() as Cart)

                        const _menu = await transaction.get(data.menuRef)

                        if (_menu.exists()) {

                            const menu = (_menu.data() as MenuItem)
                            const _cost = menu.price * data.count

                            const a: FECart = {
                                count: data.count,
                                docId: _menu.ref,
                                menuItem: {
                                    title: menu.title,
                                    price: _cost
                                }
                            }

                            list.push(
                                a
                            )
                        }

                    }
                    setCartItems(list)

                    setLoading(false)


                })



            }

            catch (error) {
                setLoading(false)
                console.log(error)

            }

        }

        get()
    }, [])



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
                {
                    isLoading
                        ? <div className="flex items-center justify-center w-full py-10">
                            <Loader content="Loading..." vertical />
                        </div>
                        :
                        undefined
                }
                {
                    !isEmpty(cartItems) && !isLoading
                        ? (
                            <VStack spacing={3}>

                                {/* ITEMS */}
                                <VStack w={'full'} p={4} borderRadius={'lg'} bg={'gray.50'} spacing={5}>
                                    {
                                        cartItems.map(
                                            (item, index) => {
                                                return <CartItem item={item} key={index} />
                                            }
                                        )
                                    }
                                </VStack>

                                {/* CALCUATION */}
                                <VStack w={'full'} p={4} borderRadius={'lg'} bg={'gray.50'} spacing={5}>

                                    <Divider />
                                    <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
                                        <Text textColor={'blackAlpha.700'}>Total</Text>
                                        <Text>N{total}</Text>
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

                                    <Button as={Link} href={`/cart/checkout?method=${paymentMethod}`} _hover={{ bg: 'teal.600' }} fontWeight={400} p={3} w={'full'} bg='teal.700' textColor="white">Place Order</Button>
                                </VStack>
                            </VStack>
                        )
                        :
                        undefined
                }
                {
                    isEmpty(cartItems) && !isLoading
                        ? (
                            <Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
                                <Text w='full' textAlign={'center'}>No item(s) here...</Text>
                            </Flex>
                        )
                        :
                        undefined
                }

            </DrawerBody>
        </DrawerContent>
    </Drawer>
}

export default CartDrawer



const CartItem = ({ item }: { item: FECart }) => {
    return <HStack bg={'gray.100'} alignItems={'center'} spacing={2} w={'full'} p={3} borderRadius={'lg'} >

        <Box w='full'>
            <Text fontSize={"16px"} textColor={'black.500'} fontWeight={500}>{item.menuItem.title}</Text>
            <Text mb={4} mt={2}>{item.menuItem.price}</Text>
        </Box>
        <VStack alignItems={'center'}>
            <IconButton
                bg={'gray.200'}
                size={'sm'}
                borderRadius={'lg'}
                aria-label={""}
                hidden
                icon={
                    <Text>+</Text>
                }
                _hover={{}} />
            <Text>{item.count}</Text>
            <IconButton
                bg={'gray.200'}
                size={'sm'}
                borderRadius={'lg'}
                hidden
                _hover={{}}
                icon={
                    <Text>-</Text>
                }
                aria-label={""} />
        </VStack>
    </HStack>
}
