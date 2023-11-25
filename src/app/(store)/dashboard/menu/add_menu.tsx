'use client'
import { auth, firestore_db, storage_db } from '@/db_init'
import { DB_COLLECTIONS } from '@/libs/firestore_utils'
import { STORAGE_PATHS } from '@/libs/storage_utils'
import { Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Button, FormControl, FormLabel, GridItem, Input, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, SimpleGrid, Heading, Divider, VStack, HStack, Alert, AlertIcon, useToast, ToastId } from '@chakra-ui/react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { deleteObject, ref, uploadBytes, uploadString } from 'firebase/storage'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import ReactCrop, { type Crop } from 'react-image-crop'

export default function AddMenuItem(
    {
        categoryValue, onCategoryValueChange, addItem, toggleAddItem, openCategories
    }: {
        addItem: boolean, categoryValue: string, onCategoryValueChange: (e: ChangeEvent<HTMLInputElement>) => void, openCategories: () => void, toggleAddItem: () => void
    }
) {


    const [menuItemTitleValue, setMenuItemTitleValue] = useState<string>("")
    const [menuItemDescrValue, setMenuItemDescrValue] = useState<string>("")
    const [menuItemPriceValue, setMenuItemPriceValue] = useState<string>("")
    const [menuItemInStockValue, setMenuItemInStockValue] = useState<string>("1")
    const [isError, setIsError] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const [file, setFile] = useState<File>();
    const [menuImageUrl, setMenuImgUrl] = useState<string>("");

    useEffect(() => {
        setIsError(error !== null && error !== "")

        return () => {
            setIsError(false)
        }
    }, [error])

    useEffect(() => {

        return () => {
            console.log("Clearing out.")
            setError("")
            setLoading(false)
            setMenuItemInStockValue("1")
            setMenuItemPriceValue("")
            setMenuItemDescrValue("")
            setMenuItemTitleValue("")
            setFile(undefined)
        }
    }, [])

    const closeModal = () => {
        toggleAddItem()
    }



    const handleMenuItemTitleValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setMenuItemTitleValue(e.target.value)
    }

    const handleMenuItemDescrValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setMenuItemDescrValue(e.target.value)
    }
    const handleMenuItemPriceValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setMenuItemPriceValue(e.target.value)
    }
    const handleMenuItemItemsInStockValueChange = (e : string): void => {
        console.log(e)
        setMenuItemInStockValue(e)
    }

    const toast = useToast()
    const toastIdRef = useRef<ToastId>()

    const handleFormSubmit = (e: any) => {

        setLoading(true)
        const _menuItemTitleValue = menuItemTitleValue
        const _menuItemPriceValue = menuItemPriceValue
        const _categoryValue = categoryValue
        const _menuItemDescrValue = menuItemDescrValue
        const _menuItemInStockValue = menuItemInStockValue
        const _file = file
        const fileRef = ref(storage_db, `${STORAGE_PATHS.MENU}/${_menuItemTitleValue}`)
        if (_file !== undefined) {

            const metadata = {
                contentType: _file.type,
            };

            uploadBytes(fileRef, _file, metadata)
                .then((snapshot) => {
                    const menuData = {
                        title: _menuItemTitleValue,
                        description: _menuItemDescrValue,
                        price: _menuItemPriceValue,
                        categoryId: _categoryValue,
                        availableItemsInStock: _menuItemInStockValue,
                        imgName: snapshot.ref.fullPath
                    }

                    addDoc(
                        collection(firestore_db, DB_COLLECTIONS.MENU),
                        menuData
                    ).then(
                        (data) => {
                            toggleAddItem()
                            toastIdRef.current = toast(
                                {
                                    description: `${_menuItemTitleValue} successfully added.`,
                                    status: 'success',
                                    duration: 1500,
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            setLoading(false)
                            setError(error)
                            console.log(error)
                            deleteObject(fileRef)
                        }
                    )

                })
                .catch((error) => {
                    console.error(error.code)
                    setError(error.message)

                })
        }
        e.preventDefault()
    }

    function handleImageSelect(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (files != null) {
            const _file = files[0]
            setMenuImgUrl(URL.createObjectURL(_file));
            setFile(_file)
        }
    }

    const [crop, setCrop] = useState<Crop>({
        unit: '%', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50
    })


    return (
        <>
            <Modal closeOnOverlayClick={false} scrollBehavior='inside' onClose={toggleAddItem} size={'lg'} isOpen={addItem}>
                <ModalOverlay />
                <ModalContent h={'full'} >
                    <ModalCloseButton textColor={['white', 'white', 'black']} />
                    <ModalBody p={5}>
                        <Heading size='lg'>Add Item</Heading>
                        <Divider my={5} />

                        {
                            isError ?
                                <Alert status="error"><AlertIcon /> {error}</Alert>
                                :
                                <></>
                        }


                        <form onSubmit={handleFormSubmit} className=''>
                            <VStack spacing={4} alignItems={'end'} >

                                <FormControl w={'full'}>
                                    <FormLabel htmlFor={'menuItemTitle'}>Item Title</FormLabel>
                                    <Input
                                        isRequired={true}
                                        placeholder="Menu Title"
                                        type='text'
                                        id="menuItemTitle"
                                        w={'full'}
                                        value={menuItemTitleValue}
                                        onChange={handleMenuItemTitleValueChange}
                                    />
                                </FormControl>
                                <FormControl w={'full'}>
                                    <FormLabel htmlFor={'menuItemCategory'}>Item Category</FormLabel>
                                    <Input
                                        isRequired={true}
                                        placeholder="Menu Category"
                                        type='text'
                                        id="menuItemCategory"
                                        w={'full'}
                                        value={categoryValue}
                                        onClick={openCategories}
                                        onChange={onCategoryValueChange}
                                    />
                                </FormControl>
                                <FormControl w={'full'}>
                                    <FormLabel htmlFor={'menuItemDescription'}>Item Description</FormLabel>
                                    <Input
                                        isRequired={true}
                                        placeholder="Menu Description"
                                        type='text'
                                        id="menuItemDescription"
                                        w={'full'}
                                        value={menuItemDescrValue}
                                        onChange={handleMenuItemDescrValueChange}
                                    />
                                </FormControl>
                                <FormControl w={'full'}>
                                    <FormLabel htmlFor={'menuItemPrice'}>Item Price</FormLabel>
                                    <Input
                                        isRequired={true}
                                        placeholder="Menu Price"
                                        type='text'
                                        id="menuItemPrice"
                                        w={'full'}
                                        value={menuItemPriceValue}
                                        onChange={handleMenuItemPriceValueChange}
                                    />
                                </FormControl>
                                <FormControl w={'full'}>
                                    <FormLabel htmlFor={'mneuItemStock'}>Available Items in Stock</FormLabel>
                                    <NumberInput isRequired={true} onChange={handleMenuItemItemsInStockValueChange} id="mneuItemStock" defaultValue={1} min={1} max={50}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>




                                <div className="w-full">

                                    <FormControl w={'full'}>
                                        <FormLabel htmlFor={'menuImagePrev'}>Select Image Preview</FormLabel>
                                        <Input
                                            mb={5}
                                            w={'full'}
                                            id='menuImagePrev'
                                            h={'full'}
                                            isRequired={true}
                                            accept='image/*' placeholder='Select Menu Image Sample' type="file" onChange={handleImageSelect} />
                                    </FormControl>
                                    {
                                        file === undefined ?
                                            <></> :
                                            <ReactCrop locked={true} circularCrop={true} crop={crop} onChange={c => setCrop(c)}>
                                                <Image
                                                    w='full'
                                                    objectPosition={'center'}
                                                    objectFit={'contain'}
                                                    alt={`Image of ${menuItemTitleValue}`} src={menuImageUrl} aspectRatio={1} />
                                            </ReactCrop>
                                    }


                                </div>


                                <HStack spacing={5}>
                                    <Button onClick={
                                        closeModal
                                    } variant='outline'>
                                        Close
                                    </Button>
                                    <Button
                                        isLoading={isLoading}
                                        type='submit' colorScheme='green'>
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
