'use client'
import { FoodCategories } from '@/libs/menu_constants'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Alert, AlertIcon, Button, Input, Heading, Divider, VStack, HStack, Box, Flex, Text, RadioGroup, Radio, FormLabel, useRadioGroup } from '@chakra-ui/react'
import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from 'react'


export default function MenuCategories(
    {
        openCat, toggleCloseCat,
        onCategoryValueChange,
    }: {
        openCat: boolean,
        toggleCloseCat: () => void,
        onCategoryValueChange: (value: string) => void,
    }
) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [newCategoryValue, setNewCategoryValue] = useState<string>('')
    const [selectedCategory, setSelectedCategoryValue] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [errorFor, setErrorFor] = useState<string>('')

    useEffect(() => {
        setIsError(error !== null && error !== "")

        return () => {
            setIsError(false)
        }
    }, [error])

    useEffect(() => {
        if (isError && selectedCategory !== "") {
            setError("")
        }
    }, [selectedCategory])

    const handleNewCategoryValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)
        const value = e.target.value
        setNewCategoryValue(value)
    }

    const handleAddNewMenuCategory = (e: FormEvent<HTMLFormElement>) => {

        const value = newCategoryValue

        if (value === "") {
            alert("Empty Data")
        } else {
            alert(`Adding ${value}`)
        }


        e.preventDefault()
    }


    const selectCategory = () => {

        if (selectedCategory === "") {
            setErrorFor("selectRadioOption")
            setError("Select a category")
        } else {
            onCategoryValueChange(selectedCategory)
        }
    }


    return (
        <>
            <Modal scrollBehavior='inside' onClose={toggleCloseCat} size={'md'} isOpen={openCat}>
                <ModalOverlay />
                <ModalContent h={'full'} >
                    <ModalCloseButton textColor={['white', 'white', 'black']} />
                    <ModalBody p={5}>
                        <Heading size='lg'>Menu Categories</Heading>
                        <Divider my={5} />


                        <form className='' onSubmit={handleAddNewMenuCategory}>
                            <VStack spacing={4}>
                                <HStack hidden={true}>
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
                                    isError ?
                                        <Alert my={5} status="error"><AlertIcon /> {error}</Alert>
                                        :
                                        <></>
                                }

                                {
                                    isLoading ?
                                        <p>Loading</p>
                                        : <></>
                                }

                                {
                                    !isError && !isLoading || isError && errorFor === "selectRadioOption" ?
                                        <VStack alignItems={'end'} spacing={5} w={'full'}>
                                            <RadioGroup onChange={setSelectedCategoryValue} value={selectedCategory} w={'full'}>
                                                <VStack spacing={2} w={'full'} divider={<Divider />} >
                                                    {
                                                        FoodCategories.map(
                                                            category => {
                                                                return <HStack key={category.id} w='full' spacing={3} alignItems={'center'}>
                                                                    <Radio value={category.name} id={category.name} />
                                                                    <FormLabel htmlFor={category.name} w={'full'}>{category.name}</FormLabel>
                                                                </HStack>
                                                            }
                                                        )
                                                    }
                                                </VStack>
                                            </RadioGroup>
                                            <Button onClick={selectCategory} mt={4} colorScheme='green'>Done</Button>
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

