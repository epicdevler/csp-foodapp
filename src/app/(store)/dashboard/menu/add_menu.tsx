'use client'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Button, FormControl, FormLabel, GridItem, Input, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, SimpleGrid, Heading, Divider, VStack, HStack } from '@chakra-ui/react'
import { useState } from 'react'

export default function AddMenuItem(
    {
        addItem, toggleAddItem, openCategories
    }: {
        addItem: boolean, openCategories: () => void, toggleAddItem: () => void
    }
) {



    return (
        <>
            <Modal onClose={toggleAddItem} size={'lg'} isOpen={addItem}>
                <ModalOverlay />
                <ModalContent h={'full'} >
                    <ModalCloseButton textColor={['white', 'white', 'black']} />
                    <ModalBody p={5}>
                        <Heading size='lg'>Add Item</Heading>
                        <Divider my={5} />
                        <form className=''>
                            <VStack spacing={4} alignItems={'end'} >
                                <FormControl w={'full'}>
                                    <FormLabel htmlFor={'menuItemTitle'}>Item Title</FormLabel>
                                    <Input
                                        placeholder="Menu Title"
                                        type='text'
                                        id="menuItemTitle"
                                        w={'full'}
                                    />
                                </FormControl>
                                <FormControl w={'full'}>
                                    <FormLabel htmlFor={'menuItemCategory'}>Item Category</FormLabel>
                                    <Input
                                        placeholder="Menu Category"
                                        type='text'
                                        id="menuItemCategory"
                                        w={'full'}
                                        onClick={openCategories}
                                    />
                                </FormControl>
                                <FormControl w={'full'}>
                                    <FormLabel htmlFor={'menuItemDescription'}>Item Description</FormLabel>
                                    <Input
                                        placeholder="Menu Description"
                                        type='text'
                                        id="menuItemDescription"
                                        w={'full'}
                                    />
                                </FormControl>
                                <FormControl w={'full'}>
                                    <FormLabel htmlFor={'menuItemPrice'}>Item Price</FormLabel>
                                    <Input
                                        placeholder="Menu Price"
                                        type='text'
                                        id="menuItemPrice"
                                        w={'full'}
                                    />
                                </FormControl>
                                <FormControl w={'full'}>
                                    <FormLabel htmlFor={'mneuItemStock'}>Available Items in Stock</FormLabel>
                                    <NumberInput id="mneuItemStock" defaultValue={1} min={1} max={50}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>



                                <HStack spacing={5}>
                                    <Button variant='outline'>
                                        Close
                                    </Button>
                                    <Button colorScheme='green'>
                                        Add
                                    </Button>
                                </HStack>
                            </VStack>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
