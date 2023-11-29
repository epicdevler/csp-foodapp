'use client'
import Navbar from "@/components/Navbar"
import { Container, Box, Heading, Text, Select, FormControl, FormLabel, GridItem, Input, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, SimpleGrid, Divider, Button, VStack, ToastId, useToast, } from "@chakra-ui/react"
import { Formik, ErrorMessage } from 'formik';
import { useContext, useEffect, useRef, useState } from "react";
import {
    isValidPhoneNumber
} from 'libphonenumber-js'
import * as EmailValidator from 'email-validator';


import { PaystackButton, usePaystackPayment } from "react-paystack"
import { PaystackProps } from "react-paystack/dist/types";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, firestore_db } from "@/db_init";
import { DB_COLLECTIONS } from "@/libs/firestore_utils";
import { FECart, Cart, MenuItem } from "@/libs/models";
import { query, collection, runTransaction, Transaction, getDocs, addDoc, serverTimestamp, doc, deleteDoc } from "firebase/firestore";
import { Loader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { isEmpty } from "@/libs/utils";
import { onAuthStateChanged } from "firebase/auth";
import UserContext from "@/context/userContext";


interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    country?: string;
    state?: string;
    address?: string;
    deliveryOption?: string;
    deliveryAddress?: string;

}


const CheckOutPage = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const [paymentMethod, setPaymentMethod] = useState<string | undefined | null>(null)


    const [cartItems, setCartItems] = useState<FECart[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [showContent, setShowContent] = useState<boolean>(false)


    useEffect(
        () => {
            const method = searchParams.get("method")?.trim()
            if (method === "" || method === null || method == undefined) {
                setPaymentMethod(null)
            } else {
                setPaymentMethod(method)
            }
        }, []
    )

    useEffect(
        () => {
            console.log(paymentMethod)
        }, [paymentMethod]
    )





    type FormType = {
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        country: string,
        state: string,
        address: string,
        deliveryOption: string,
        deliveryAddress: string,
    }

    const initialValues: FormType = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: 'Nigeria',
        state: 'Rivers',
        address: '',
        deliveryOption: '',
        deliveryAddress: '',
    }

    const [deliveryOption, setDeliveryOption] = useState<string>("")

    const handleDeliveryOptionChange = (e: any) => {
        const selectedValue = e.target.value
        updateDeliveryOptionValue(selectedValue)
    }

    const updateDeliveryOptionValue = (value: string) => {
        setDeliveryOption(value)
    }


    const publicKey = "pk_test_f70cda03aeaeea533281dd86ce0563c51af16ea4"
    const [amount, setAmount] = useState(0) // Remember, set in kobo!
    const [email, setEmail] = useState("")
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [dAddress, setDAddress] = useState("")

    const user = useContext(UserContext)


    const componentProps: PaystackProps = {
        email: email,
        amount: amount,
        firstname: fName,
        lastname: lName,
        currency: "NGN",
        channels: ['bank', 'ussd', 'card'],
        phone: phone,
        label: "Order Cost:",
        publicKey: publicKey,
    }

    const a = usePaystackPayment(componentProps)


    const toast = useToast()
    const toastIdRef = useRef<ToastId>()

    const updateToast = (status: "error" | "success", description: string) => {
        toastIdRef.current = toast(
            {
                description: description,
                status: status,
                duration: 1500,
            }
        )
    }

    const onSuccess = async (values: FormType, action: () => void) => {

        try {


            runTransaction(firestore_db, async (transaction) => {

                const d = {
                    items: cartItems.map((item) => {
                        return item.docId
                    }),
                    status: "Processing",
                    dateCreated: serverTimestamp(),
                    cost: amount,
                    userId: user!!.uid,
                    deliveryAddress: deliveryOption == "Home Delivery" ? values.deliveryAddress : "Self Pick Up",
                }
                await addDoc(collection(firestore_db, DB_COLLECTIONS.Orders), d)
                const a = await getDocs(query(collection(firestore_db, DB_COLLECTIONS.MyCart())))
                a.forEach(element => {
                    transaction.delete(element.ref)
                });

            })

            updateToast(
                "success",
                `Order placesed succesfully`
            )
            router.push('/menu')
            action()
        } catch (e) {
            console.log(e)
            updateToast(
                "error",
                `${e}`
            )
        }
    }
    const onClose = (action: () => void) => {
        alert("Payment process terminated")
        action()
    }

    const handlePayment = (values: FormType, action: () => void) => {

        a(
            () => { onSuccess(values, action) },
            () => { onClose(action) }
        )

    }


    useEffect(() => {
        var _total = 0
        cartItems.forEach(item => {
            _total += item.menuItem.price
        })
        setAmount(_total)
    }, [cartItems])


    useEffect(() => {
        const unsub = () => {
            onAuthStateChanged(
                auth,
                (user) => {

                    const get = async () => {

                        const q = query(collection(firestore_db, DB_COLLECTIONS.MyCart(user)))

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
                                console.log(list)
                                setCartItems(list)
                                setLoading(false)


                            })
                        }

                        catch (error) {
                            setLoading(false)
                            console.log(error)

                        }

                    }

                    if (user != null) {
                        get()
                    }


                }
            )
        }
        return unsub

    }, [])



    return <>
        <Box bg={'blackAlpha.700'}>

            <Navbar />

            <Box py={100} px={10} textColor={'white'} textAlign={'center'}>
                <Heading >Check Out</Heading>
            </Box>

        </Box>

        <Box py={100}>
            <Container maxW="container.lg">
                {
                    isLoading
                        ? <div className="flex items-center justify-center w-full py-10">
                            <Loader content="Loading..." vertical />
                        </div>
                        :
                        undefined
                }
                {
                    !isLoading
                        ? (
                            <>
                                {
                                    paymentMethod != "Cash" && paymentMethod != "Debit" && (!isLoading && !isEmpty(error)) ?
                                        <div className="flex items-center justify-center w-full py-10">
                                            <Text textAlign={'center'}>
                                                Invalid method provided, avoid manually changing this value
                                            </Text>
                                        </div>

                                        :
                                        <></>
                                }
                                {
                                    !isEmpty(cartItems) ?
                                        <Formik
                                            initialValues={initialValues}
                                            validate={values => {
                                                const errors: Errors = {};
                                                if (!isEmpty(values.firstName)) {
                                                    setFName(values.firstName)
                                                } else {
                                                    errors.firstName = "Enter your your first name"
                                                }
                                                if (!isEmpty(values.lastName)) {
                                                    setLName(values.lastName)
                                                } else {
                                                    errors.lastName = "Enter your your last name"
                                                }
                                                if (!isValidPhoneNumber(values.phoneNumber, "NG")) {
                                                    errors.phoneNumber = "Invalid Phone Number Provided"
                                                } else {
                                                    setPhone(values.phoneNumber)
                                                }
                                                if (!EmailValidator.validate(values.email)) {
                                                    errors.email = "Invalid email address"
                                                } else {
                                                    setEmail(values.email)
                                                }

                                                if (!isEmpty(values.address)) {
                                                    setAddress(values.address)
                                                } else {
                                                    errors.address = "Provide your address"
                                                }
                                                if (deliveryOption === "Home Delivery") {
                                                    if (!isEmpty(values.deliveryAddress)) {
                                                        setAddress(values.deliveryAddress)
                                                    } else {
                                                        errors.deliveryAddress = "Provide your home address"
                                                    }
                                                }

                                                return errors;
                                            }
                                            }
                                            onSubmit={
                                                (values, { setSubmitting }) => {
                                                    handlePayment(
                                                        values,
                                                        () => {
                                                            setSubmitting(false)
                                                        }
                                                    )
                                                }
                                            }
                                        >
                                            {
                                                (
                                                    {
                                                        values,
                                                        errors,
                                                        handleSubmit,
                                                        handleChange,
                                                        isSubmitting,
                                                    }
                                                ) => (
                                                    <form onSubmit={handleSubmit}>
                                                        <SimpleGrid spacing={8} columns={{ base: 1, md: 3 }}>
                                                            {
                                                                paymentMethod == "Debit" && !(isLoading && isEmpty(error)) ?
                                                                    <GridItem colSpan={2} p={5}>

                                                                        <Heading size='md' mb={10}>Billing Details</Heading>
                                                                        <Box>
                                                                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                                                                                <GridItem w={'full'}>
                                                                                    <FormControl w={'full'}>
                                                                                        <FormLabel>First Name</FormLabel>
                                                                                        <Input
                                                                                            placeholder="First Name"
                                                                                            type='text'
                                                                                            onChange={handleChange}
                                                                                            value={values.firstName}
                                                                                            name="firstName"
                                                                                            w={'full'}
                                                                                        />

                                                                                        <ErrorMessage name="firstName">
                                                                                            {
                                                                                                msg => <Text textColor={'red'} fontSize={"14px"}>{msg}</Text>
                                                                                            }
                                                                                        </ErrorMessage>
                                                                                    </FormControl>
                                                                                </GridItem>
                                                                                <GridItem w={'full'}>
                                                                                    <FormControl w={'full'}>
                                                                                        <FormLabel>Last Name</FormLabel>
                                                                                        <Input
                                                                                            placeholder="Last Name"
                                                                                            type='text'
                                                                                            onChange={handleChange}
                                                                                            value={values.lastName}
                                                                                            name="lastName"
                                                                                            w={'full'}
                                                                                        />

                                                                                        <ErrorMessage name="lastName">
                                                                                            {
                                                                                                msg => <Text textColor={'red'} fontSize={"14px"}>{msg}</Text>
                                                                                            }
                                                                                        </ErrorMessage>
                                                                                    </FormControl>
                                                                                </GridItem>
                                                                                <GridItem w={'full'}>
                                                                                    <FormControl w={'full'}>
                                                                                        <FormLabel>Email</FormLabel>
                                                                                        <Input
                                                                                            placeholder="Email"
                                                                                            type='email'
                                                                                            onChange={handleChange}
                                                                                            value={values.email}
                                                                                            name="email"
                                                                                            w={'full'}
                                                                                        />

                                                                                        <ErrorMessage name="email">
                                                                                            {
                                                                                                msg => <Text textColor={'red'} fontSize={"14px"}>{msg}</Text>
                                                                                            }
                                                                                        </ErrorMessage>
                                                                                    </FormControl>
                                                                                </GridItem>

                                                                                <GridItem w={'full'}>
                                                                                    <FormControl w={'full'}>
                                                                                        <FormLabel>Phone Number</FormLabel>
                                                                                        <InputGroup mt={1}>
                                                                                            <InputLeftAddon>+234</InputLeftAddon>
                                                                                            <Input
                                                                                                placeholder="Phone  Number"
                                                                                                type='tel'
                                                                                                onChange={handleChange}
                                                                                                value={values.phoneNumber}
                                                                                                name="phoneNumber"
                                                                                                w={'full'}
                                                                                            />
                                                                                        </InputGroup>
                                                                                        <ErrorMessage name="phoneNumber">
                                                                                            {
                                                                                                msg => <Text textColor={'red'} fontSize={"14px"}>{msg}</Text>
                                                                                            }
                                                                                        </ErrorMessage>
                                                                                    </FormControl>
                                                                                </GridItem>
                                                                                <GridItem w='full'>
                                                                                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                                                                                        <GridItem w={'full'}>
                                                                                            <FormControl w={'full'}>
                                                                                                <FormLabel>Country</FormLabel>
                                                                                                <Input
                                                                                                    placeholder="Country"
                                                                                                    type='text'
                                                                                                    onChange={handleChange}
                                                                                                    value={values.country}
                                                                                                    name="country"
                                                                                                    readOnly={true}
                                                                                                    w={'full'}
                                                                                                />

                                                                                                <ErrorMessage name="country">
                                                                                                    {
                                                                                                        msg => <Text textColor={'red'} fontSize={"14px"}>{msg}</Text>
                                                                                                    }
                                                                                                </ErrorMessage>
                                                                                            </FormControl>
                                                                                        </GridItem>
                                                                                        <GridItem w={'full'}>
                                                                                            <FormControl w={'full'}>
                                                                                                <FormLabel>State</FormLabel>
                                                                                                <Input
                                                                                                    placeholder="State"
                                                                                                    type='text'
                                                                                                    onChange={handleChange}
                                                                                                    value={values.state}
                                                                                                    name="state"
                                                                                                    readOnly={true}
                                                                                                    w={'full'}
                                                                                                />

                                                                                                <ErrorMessage name="state">
                                                                                                    {
                                                                                                        msg => <Text textColor={'red'} fontSize={"14px"}>{msg}</Text>
                                                                                                    }
                                                                                                </ErrorMessage>
                                                                                            </FormControl>
                                                                                        </GridItem>
                                                                                    </SimpleGrid>
                                                                                </GridItem>
                                                                                <GridItem w={'full'}>
                                                                                    <FormControl w={'full'}>
                                                                                        <FormLabel>Address</FormLabel>
                                                                                        <Input
                                                                                            placeholder="Address"
                                                                                            type='text'
                                                                                            onChange={handleChange}
                                                                                            value={values.address}
                                                                                            name="address"
                                                                                            w={'full'}
                                                                                        />

                                                                                        <ErrorMessage name="address">
                                                                                            {
                                                                                                msg => <Text textColor={'red'} fontSize={"14px"}>{msg}</Text>
                                                                                            }
                                                                                        </ErrorMessage>
                                                                                    </FormControl>
                                                                                </GridItem>
                                                                            </SimpleGrid>
                                                                        </Box>
                                                                    </GridItem>
                                                                    : undefined
                                                            }
                                                            <GridItem bg={'gray.50'} borderRadius={'md'} p={5}>
                                                                <Box>
                                                                    <Heading size='md' mb={10}>Order Details</Heading>
                                                                    <Heading size='sm' mb={5}>Items</Heading>
                                                                    <Divider borderColor={'gray.400'} />
                                                                    {
                                                                        cartItems.map((item, index) => {
                                                                            return (
                                                                                <Box key={index}>

                                                                                    <Box py={4} px={2}>
                                                                                        <Text fontSize="14px">{item.menuItem.title}</Text>
                                                                                        <Text fontSize="12px">{item.menuItem.price}</Text>
                                                                                    </Box>
                                                                                    <Divider borderColor={'gray.400'} />

                                                                                </Box>

                                                                            )
                                                                        })
                                                                    }
                                                                    <Heading size='sm' mt={4}>Delivery Option</Heading>
                                                                    <Select
                                                                        mt={2}
                                                                        w={'full'}
                                                                        placeholder='Select option'
                                                                        onChange={handleDeliveryOptionChange}
                                                                    >
                                                                        <option value='Pick Up'>Pick Up (from our store)</option>
                                                                        <option value='Home Delivery'>Home Delivery</option>
                                                                    </Select>

                                                                    <FormControl
                                                                        hidden={deliveryOption !== "Home Delivery"}
                                                                        mt={4}
                                                                        w={'full'}
                                                                    >
                                                                        <FormLabel htmlFor={'deliveryAddress'}>Delivery Address</FormLabel>
                                                                        <Input
                                                                            placeholder="Your street address (landmark if any)"
                                                                            type='text'
                                                                            id="deliveryAddress"
                                                                            name="deliveryAddress"
                                                                            w={'full'}
                                                                            onChange={handleChange}
                                                                            value={values.deliveryAddress}
                                                                        />
                                                                        <ErrorMessage name="deliveryAddress">
                                                                            {
                                                                                msg => <Text textColor={'red'} fontSize={"14px"}>{msg}</Text>
                                                                            }
                                                                        </ErrorMessage>
                                                                    </FormControl>

                                                                    <Button isLoading={isSubmitting} type="submit" disabled={isSubmitting} w={'full'} mt={4} colorScheme='green'>Proceed to Payment</Button>

                                                                </Box>
                                                            </GridItem>
                                                        </SimpleGrid>
                                                    </form>
                                                )
                                            }
                                        </Formik>
                                        : <div className="flex items-center justify-center w-full py-10">
                                            <Text textAlign={'center'}>
                                                No items to checkout, add items to cart and return to continue
                                            </Text>
                                        </div>
                                }
                            </>
                        )
                        :
                        undefined
                }

            </Container>
        </Box>
    </>
}

export default CheckOutPage
