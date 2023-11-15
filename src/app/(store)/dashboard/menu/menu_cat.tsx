'use client'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Button, Input, Heading, Divider, VStack, HStack, Box, Flex, Text, RadioGroup, Radio, FormLabel } from '@chakra-ui/react'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'

export default function MenuCategories(
    {
        openCat, toggleCloseCat
    }: {
        openCat: boolean, toggleCloseCat: () => void
    }
) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [newCategoryValue, setNewCategoryValue] = useState<string>('')

    const handleNewCategoryValueChange = (e: ChangeEventHandler<HTMLInputElement>) => {
        // console.log(e.target.value)
        const value = e.target.value
        setNewCategoryValue(value)
    }

    const handleAddNewMenuCategory = (e: FormEventHandler<HTMLFormElement>) => {

        const value = newCategoryValue

        if (value === "") {
            alert("Empty Data")
        } else {
            alert(`Adding ${value}`)
        }


        e.preventDefault()
    }

    return (
        <>
            <Modal onClose={toggleCloseCat} size={'md'} isOpen={openCat}>
                <ModalOverlay />
                <ModalContent h={'full'} >
                    <ModalCloseButton textColor={['white', 'white', 'black']} />
                    <ModalBody p={5}>
                        <Heading size='lg'>Menu Categories</Heading>
                        <Divider my={5} />
                        <form className='' onSubmit={handleAddNewMenuCategory}>
                            <VStack spacing={4}>
                                <HStack>
                                    <Input
                                        value={newCategoryValue}
                                        onChange={
                                            handleNewCategoryValueChange
                                        }
                                        placeholder="Add new category"
                                        type='text'
                                        w={'full'}
                                    />
                                    <Button type='submit' disabled={false} colorScheme='green'>
                                        Add
                                    </Button>
                                </HStack>

                                {
                                    isLoading ?
                                        <p>Loading</p>
                                        : <></>
                                }

                                {
                                    isError ?
                                        <p>Error</p>
                                        : <></>
                                }


                                {
                                    !isError && !isLoading ?
                                        <VStack alignItems={'end'} spacing={5} w={'full'}>
                                            <RadioGroup w={'full'}>
                                                <VStack spacing={2} w={'full'} divider={<Divider />} >

                                                    <HStack w='full' spacing={3} alignItems={'center'}>
                                                        <Radio value='one' id='one' />
                                                        <FormLabel htmlFor='one' w={'full'}>One</FormLabel>
                                                    </HStack>
                                                    <HStack w='full' spacing={3} alignItems={'center'}>
                                                        <Radio value='two' id='two' />
                                                        <FormLabel htmlFor='two' w={'full'}>Two</FormLabel>
                                                    </HStack>
                                                </VStack>
                                            </RadioGroup>
                                            <Button mt={4} colorScheme='green'>Done</Button>
                                        </VStack>
                                        : <></>
                                }

                            </VStack>
                        </form>
                    </ModalBody>
                </ModalContent >
            </Modal >
        </>
    )
}
