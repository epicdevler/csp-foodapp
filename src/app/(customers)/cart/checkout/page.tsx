'use client'
import Navbar from "@/components/Navbar"
import { Container, Box, Heading, Text, Select, FormControl, FormLabel, GridItem, Input, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, SimpleGrid, Divider, Button, VStack } from "@chakra-ui/react"
import { Formik, ErrorMessage } from 'formik';
import { useState } from "react";
import {
    isValidPhoneNumber
} from 'libphonenumber-js'
import * as EmailValidator from 'email-validator';

import { PaystackButton, usePaystackPayment } from "react-paystack"
import { PaystackProps } from "react-paystack/dist/types";

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


    const initialValues = {
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
    const amount = 1000000 // Remember, set in kobo!
    const [email, setEmail] = useState("")
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [dAddress, setDAddress] = useState("")



    const componentProps: PaystackProps = {
        email: email,
        amount: amount,
        firstname: fName,
        lastname: lName,
        currency: "NGN",
        channels: ['bank', 'ussd', 'card'],
        phone: phone,
        label: "Label",
        publicKey: publicKey,
    }

    const a = usePaystackPayment(componentProps)

    const onSuccess = (action: () => void) => {
        alert("Thanks for doing business with us! Come back soon!!")
        action()
    }
    const onClose = (action: () => void) => {
        alert("Payment process terminated")
        action()
    }

    const handlePayment = (action: () => void) => {
        a(
            () => { onSuccess(action) },
            () => { onClose(action) }
        )
    }

    return <>
        <Box bg={'blackAlpha.700'}>

            <Navbar />

            <Box py={100} px={10} textColor={'white'} textAlign={'center'}>
                <Heading >Check Out</Heading>
            </Box>

        </Box>

        <Box py={100}>
            <Container maxW="container.lg">
                <Formik
                    initialValues={initialValues}
                    validate={values => {
                        const errors: Errors = {};
                        if (values.firstName !== "") {
                            setFName(values.firstName)
                        }else{
                            errors.firstName = "Enter your your first name"
                        }
                        if (values.lastName !== "") {
                            setLName(values.lastName)
                        }else{
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
                        
                        if (values.address !== "") {
                            setAddress(values.address)
                        }else{
                            errors.address = "Provide your address"
                        }
                        
                        if (values.deliveryAddress !== "" && deliveryOption === "Home Delivery") {
                            setAddress(values.deliveryAddress)
                        }else{
                            errors.deliveryAddress = "Provide your home address"
                        }

                        return errors;
                    }
                    }
                    onSubmit={
                        (values, { setSubmitting }) => {
                            handlePayment(
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

                                                        <ErrorMessage  name="firstName">
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

                                                        <ErrorMessage  name="lastName">
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

                                                        <ErrorMessage  name="email">
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
                                                        <ErrorMessage  name="phoneNumber">
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

                                                                <ErrorMessage  name="country">
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

                                                                <ErrorMessage  name="state">
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

                                                        <ErrorMessage  name="address">
                                                    {
                                                        msg => <Text textColor={'red'} fontSize={"14px"}>{msg}</Text>
                                                    }
                                                </ErrorMessage>
                                                    </FormControl>
                                                </GridItem>
                                            </SimpleGrid>
                                        </Box>
                                    </GridItem>

                                    <GridItem bg={'gray.50'} borderRadius={'md'} p={5}>
                                        <Box>
                                            <Heading size='md' mb={10}>Order Details</Heading>
                                            <Heading size='sm' mb={5}>Items</Heading>
                                            <Divider borderColor={'gray.400'} />
                                            <Box>
                                                <>
                                                    <Box py={4} px={2}>
                                                        <Text fontSize="14px">Item</Text>
                                                        <Text fontSize="12px">Cost</Text>
                                                    </Box>
                                                    <Divider borderColor={'gray.400'} />
                                                </>
                                                <>
                                                    <Box py={4} px={2}>
                                                        <Text fontSize="14px">Item</Text>
                                                        <Text fontSize="12px">Cost</Text>
                                                    </Box>
                                                    <Divider borderColor={'gray.400'} />
                                                </>
                                            </Box>

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
                                                <ErrorMessage  name="deliveryAddress">
                                                    {
                                                        msg => <Text textColor={'red'} fontSize={"14px"}>{msg}</Text>
                                                    }
                                                </ErrorMessage>
                                            </FormControl>

                                            <Button type="submit" disabled={isSubmitting} w={'full'} mt={4} colorScheme='green'>Proceed to Payment</Button>

                                        </Box>
                                    </GridItem>
                                </SimpleGrid>
                            </form>
                        )
                    }
                </Formik>
            </Container>
        </Box>
    </>
}

export default CheckOutPage
