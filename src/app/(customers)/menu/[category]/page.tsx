'use client'
import { firestore_db } from "@/db_init"
import { DB_COLLECTIONS } from "@/libs/firestore_utils"
import { BaseMenuItem, MenuItem } from "@/libs/models"
import { getImageResult } from "@/libs/storage_utils"
import { isEmpty } from "@/libs/utils"
import { Container, GridItem, VStack, SimpleGrid, Image, Text, Heading, LinkOverlay, LinkBox, Card, CardBody, CardHeader, Flex, HStack, IconButton, Stack, Skeleton, CardFooter, ToastId, useToast } from "@chakra-ui/react"
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import { query, collection, where, getDocs } from "firebase/firestore"
import Head from "next/head"
import Link from "next/link"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Loader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';


const MenuCategoriesItemPage = () => {

    const [isLoading, setLoading] = useState<boolean>(true)
    const [isDataLoaded, setDataLoaded] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [data, setData] = useState<MenuItem[]>([])

    const params = useParams()

    const category = (params.category as string).replace("%20", " ")

    useEffect(() => {
        const q = query(collection(firestore_db, DB_COLLECTIONS.MENU), where("categoryId", "==", category))

        getDocs(q)
            .then(_data => {
                const items: MenuItem[] = []
                _data.forEach(
                    doc => {
                        const data = doc.data()
                        const baseMenu = (data as BaseMenuItem)
                        items.push(
                            {
                                docId: doc.id,
                                title: baseMenu.title,
                                description: baseMenu.description,
                                price: baseMenu.price,
                                categoryId: data.categoryId,
                                availableItemsInStock: baseMenu.availableItemsInStock,
                                imgName: baseMenu.imgName
                            }
                        )
                    }
                )
                setData(items)
                setDataLoaded(true)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [])


    const toast = useToast()
    const toastIdRef = useRef<ToastId>()


    useEffect(
        () => {
            if (!isEmpty(error)) {
                toastIdRef.current = toast(
                    {
                        description: `${error}`,
                        status: 'error',
                        duration: 1500,
                    }
                )
            }
        }, [error]
    )






    return <>
        <Head>
            <title>{category} | Menu</title>
        </Head>
        <section>
            <Container p={5} py={10} maxW={'container.lg'}>
                <Heading hidden textAlign={'center'} size={'md'} mb={10} p={5}>{category}</Heading>

                {
                    isLoading
                        ? <div className="flex items-center justify-center w-full py-10">
                            <Loader content="Loading..." vertical />
                        </div>
                        :
                        undefined
                }


                {
                    !isLoading && isDataLoaded
                        ?
                        isEmpty(data) ?
                            <Text w={'full'} textAlign={'center'}>No items yet.</Text>
                            :
                            <SimpleGrid templateColumns='repeat(auto-fill, minmax(200px, 1fr))' column={4} gap={5} my={100}>
                                {
                                    data.map(
                                        (item, index) => {
                                            return (
                                                <MenuGridItemComponent key={index} item={item} />
                                            )
                                        }
                                    )
                                }
                            </SimpleGrid>
                        :
                        undefined
                }



            </Container>
        </section>
    </>
}

export default MenuCategoriesItemPage





const MenuGridItemComponent = ({ item }: { item: MenuItem }) => {

    const [imgUrl, setImgUrl] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        getImageResult(item.imgName)
            .then(url => {
                setImgUrl(url)
                setLoading(false)
            })

    }, [item])



    {
        return (
            <GridItem>
                <Card maxW={'full'} h={'full'}>
                    <CardHeader p={0}>

                        <Skeleton isLoaded={!isLoading}>
                            <Image
                                bgColor={"#F5F5F5"}
                                height={'160px'}
                                width={'full'}
                                src={imgUrl}
                                alt={item.title}
                                objectFit={'cover'}
                                objectPosition='center'
                                borderTopRadius='lg'
                            />
                        </Skeleton>
                    </CardHeader>
                    <CardBody>
                        <Stack spacing='5'>
                            <VStack>
                                <Flex w='full' alignItems={'flex-start'}>
                                    <Text bg={'#F5F5F5'} borderRadius={'md'} p={1} fontSize={"12px"}>#{item.price}</Text>

                                    <HStack spacing={1} w={'full'} justifyContent={'end'}>
                                        <IconButton
                                            colorScheme='black'
                                            variant={'unstyled'}
                                            size={'sm'}
                                            hidden
                                            aria-label='Add to Cart'
                                            icon={
                                                <HeartIcon className="h-5 w-5" />
                                            }
                                        />

                                        <IconButton
                                            colorScheme='black'
                                            variant={'unstyled'}
                                            size={'sm'}
                                            aria-label='Add to Cart'
                                            icon={<ShoppingCartIcon className="h-5 w-5" />} />
                                    </HStack>
                                </Flex>
                                <Heading w={'full'} size='sm'>{item.title}</Heading>
                            </VStack>
                            <Text fontSize={"14px"}>
                                {item.description}
                            </Text>
                        </Stack>
                    </CardBody>
                </Card>
            </GridItem>
        )
    }
}