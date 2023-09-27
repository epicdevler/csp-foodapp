import { Box, Button, Image, ButtonGroup, Card, CardBody, CardFooter, Container, Divider, GridItem, Heading, SimpleGrid, Stack, Text, CardHeader, HStack, Flex, IconButton } from '@chakra-ui/react'
import React from 'react'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"

import '@smastrom/react-rating/style.css'
// import { Rating } from 'material-ui-rating'
// import Image from 'next/image'

export default function MenuSection() {

    const menuItems = [
        {
            "title": "Hot and Sour Soup",
            "detail": "A classic Chinese soup made with mushrooms, tofu, and bamboo shoots in a spicy and tangy broth.",
            "rating": 4.5,
            "cost": 800,
            "imgPrevUrl": "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg"
        },
        {
            "title": "Kung Pao Chicken",
            "detail": "A popular Szechuan dish with diced chicken, peanuts, and vegetables in a spicy sauce.",
            "rating": 4.2,
            "cost": 1200,
            "imgPrevUrl": "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg"
        },
        {
            "title": "Sweet and Sour Pork",
            "detail": "Crispy pork pieces with bell peppers, pineapple, and onions in a tangy sweet and sour sauce.",
            "rating": 4,
            "cost": 1500,
            "imgPrevUrl": "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg"
        },
        {
            "title": "Mapo Tofu",
            "detail": "Soft tofu cubes cooked in a spicy and flavorful sauce with ground pork and Szechuan peppercorns.",
            "rating": 4.3,
            "cost": 1000,
            "imgPrevUrl": "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg"
        },
        {
            "title": "General Tso's Chicken",
            "detail": "Crispy chicken pieces in a sweet and spicy sauce with broccoli and carrots.",
            "rating": 4.4,
            "cost": 1300,
            "imgPrevUrl": "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg"
        },
        {
            "title": "Peking Duck",
            "detail": "Roasted duck served with thin pancakes, scallions, and hoisin sauce.",
            "rating": 4.6,
            "cost": 2500,
            "imgPrevUrl": "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg"
        },
        {
            "title": "Mongolian Beef",
            "detail": "Tender beef slices cooked with scallions and onions in a savory sauce.",
            "rating": 4.1,
            "cost": 1400,
            "imgPrevUrl": "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg"
        },
        {
            "title": "Shrimp Fried Rice",
            "detail": "Fried rice with shrimp, eggs, peas, and carrots.",
            "rating": 4.3,
            "cost": 900,
            "imgPrevUrl": "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg"
        }
    ]


    return (
        <section id='menu'>
            <Container maxW={'container.lg'} py={100}>
                <Box textAlign={'center'}>
                    <Heading
                        variant={''}
                        textDecoration={'underline'}
                        textDecorationColor={'grey'}
                        textUnderlineOffset={10}
                        mb={9}
                    >
                        Menu
                    </Heading>
                    <Text fontSize={'14px'} maxW={'80%'} mx={'auto'}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sapiente ea ratione amet? Dolores est commodi veritatis repudiandae ut non similique quo blanditiis molestias pariatur iste, quia numquam veniam enim.
                    </Text>
                </Box>

                <SimpleGrid templateColumns='repeat(auto-fill, minmax(200px, 1fr))' column={4} gap={5} my={100}>
                    {
                        menuItems.map(
                            (item, index) => {
                                return (
                                    <GridItem key={index}>
                                        <Card maxW={'full'} h={'full'}>
                                            <CardHeader p={0}>
                                                <HStack spacing={1} className='absolute right-0 p-2'>
                                                    <IconButton
                                                        colorScheme='black'
                                                        variant={'unstyled'}
                                                        size={'sm'}
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
                                                <Image
                                                    bgColor={"#F5F5F5"}
                                                    height={'160px'}
                                                    width={'full'}                                                    
                                                    src={item.imgPrevUrl}
                                                    alt={item.title}
                                                    borderTopRadius='lg'
                                                />
                                            </CardHeader>
                                            <CardBody>
                                                <Stack spacing='5'>
                                                    <Flex alignItems={'flex-start'}>
                                                        <Heading w={'full'} me={3} size='sm'>{item.title}</Heading>
                                                        <Text bg={'#F5F5F5'} borderRadius={'md'} p={1}  fontSize={"12px"}>#{item.cost}</Text>
                                                    </Flex>
                                                    <Text fontSize={"14px"}>
                                                        {item.detail}
                                                    </Text>
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                )
                            }
                        )
                    }
                </SimpleGrid>

            </Container>
        </section>
    )
}
