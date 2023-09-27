import {
    Box, Text, Heading, Button,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    GridItem, SimpleGrid, VStack,
    Input, FormControl, FormLabel, Container, InputGroup, InputLeftAddon,
    NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
} from "@chakra-ui/react"


const BookTableModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return <Modal scrollBehavior={'inside'} onClose={onClose} size={'full'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent h={'full'} >
            <ModalCloseButton me={2} zIndex={99} textColor={['white', 'white', 'black']} />
            <ModalBody p={0}>
                <SimpleGrid columns={{ base: 1, md: 2 }} h={'full'} spacing={3}>
                    <GridItem h={'full'} w={'full'} bg={'url(/food_1.jpg)'} bgPos={'center'} bgSize={'cover'}>
                        <Box py={[100, 100, 0]} px={5} backdropFilter={"blur(1px)"} textColor={'white'} bg={'rgba(35, 35, 35, 0.40)'} w={'full'} h={'full'} display={'grid'} placeContent={'center'} textAlign={'center'}>
                            <Heading>Book a Table</Heading>

                            <Text mt={4}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius culpa neque facilis, officia praesentium eligendi. Porro iste voluptates iusto recusandae iure quos eveniet odit nostrum! Eaque rem expedita quo repudiandae.</Text>
                        </Box>
                    </GridItem>
                    <GridItem h={'full'} w={'full'}>
                        <Box w={'full'} h={'full'} display={'grid'} placeContent={'center'}>
                            <Container maxW={'container.lg'} py={[50, 50, 16]}>
                                <Heading mb={10} size={'md'}>Fill in your details below</Heading>

                                <form>
                                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                                        <GridItem w={'full'}>
                                            <FormControl w={'full'}>
                                                <FormLabel htmlFor={'fullname'}>Full Name</FormLabel>
                                                <Input
                                                    placeholder="Name"
                                                    type='text'
                                                    id="fullname"
                                                    w={'full'}
                                                />
                                            </FormControl>
                                        </GridItem>
                                        <GridItem w={'full'}>
                                            <FormControl w={'full'}>
                                                <FormLabel htmlFor={'email'}>Email</FormLabel>
                                                <Input
                                                    placeholder="Email"
                                                    type='email'
                                                    id="email"
                                                    w={'full'}
                                                />
                                            </FormControl>
                                        </GridItem>

                                        <GridItem w={'full'}>
                                            <FormControl w={'full'}>
                                                <FormLabel htmlFor={'phonenumber'}>Phone    Number</FormLabel>
                                                <InputGroup mt={1}>
                                                    <InputLeftAddon>+234</InputLeftAddon>
                                                    <Input
                                                        placeholder="Phone  Number"
                                                        type='tel'
                                                        id="phonenumber"
                                                        w={'full'}
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                        </GridItem>
                                        <GridItem w={'full'}>
                                            <FormControl w={'full'}>
                                                <FormLabel htmlFor={'email'}>Email</FormLabel>
                                                <Input
                                                    placeholder="Email"
                                                    type='email'
                                                    id="email"
                                                    w={'full'}
                                                />
                                            </FormControl>
                                        </GridItem>


                                        <GridItem w={'full'}>
                                            <FormControl w={'full'}>
                                                <FormLabel htmlFor={'datetime'}>Select Date & Time</FormLabel>
                                                <Input
                                                    placeholder="Date & Time"
                                                    type='datetime-local'
                                                    id="datetime"
                                                    w={'full'}
                                                />
                                            </FormControl>
                                        </GridItem>
                                        <GridItem w={'full'}>
                                            <FormControl w={'full'}>
                                                <FormLabel htmlFor={'numOfPersons'}>Number of Persons</FormLabel>
                                                <NumberInput id="numOfPersons" defaultValue={2} min={2} max={20}>
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </FormControl>
                                        </GridItem>
                                    </SimpleGrid>
                                </form>
                            </Container>
                        </Box>
                    </GridItem>
                </SimpleGrid>
            </ModalBody>
        </ModalContent>
    </Modal>
}

export default BookTableModal