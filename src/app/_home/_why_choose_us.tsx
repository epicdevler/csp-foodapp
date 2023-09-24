import { Box, Button, Image, ButtonGroup, Card, CardBody, CardFooter, Container, Divider, GridItem, Heading, SimpleGrid, Stack, Text, CardHeader, HStack, Flex, IconButton } from '@chakra-ui/react'
import React from 'react'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"

import '@smastrom/react-rating/style.css'
// import { Rating } from 'material-ui-rating'
// import Image from 'next/image'

export default function WhyChooseUsSection() {

    const services = [
        {
            "title": "Delivery Service",
            "detail": "Get your food delivered right to your doorstep",
            "serviceIcon": "/icons/service_delivery.jpg"
        },
        {
            "title": "Online Ordering",
            "detail": "Order your favorite dishes online",
            "serviceIcon": "/icons/service_order.png"
        },
        {
            "title": "Table Reservation",
            "detail": "Reserve a table in advance for a hassle-free dining experience",
            "serviceIcon": "/icons/service_table.png"
        },
        {
            "title": "Catering Service",
            "detail": "Let us cater your special events and celebrations",
            "serviceIcon": "/icons/service_catering.png"
        },
        {
            "title": "Takeaway Service",
            "detail": "Grab your food on the go with our convenient takeaway service",
            "serviceIcon": "/icons/service_takeaway.png"
        },
        {
            "title": "Menu Customization",
            "detail": "Customize your dishes according to your preferences",
            "serviceIcon": "/icons/service_menu.svg"
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
                        Why Choose Us
                    </Heading>
                    <Text fontSize={'14px'} maxW={'80%'} mx={'auto'}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sapiente ea ratione amet? Dolores est commodi veritatis repudiandae ut non similique quo blanditiis molestias pariatur iste, quia numquam veniam enim.
                    </Text>
                </Box>

                <SimpleGrid columns={{ base: 1, sm: 1, md: 3 }} gap={10} my={100}>
                    {
                        services.map(
                            (service, index) => {
                                return (
                                    <GridItem key={index}>
                                        <Box textAlign={'center'} h={'full'} w={'full'}>
                                            <Image w={"50px"} h={"50px"} mx="auto" src={service.serviceIcon} alt={`${service.title} Image`} />
                                            <Text fontSize={"16px"} fontWeight={500} mt={5}>{service.title}</Text>
                                            <Text fontSize={"14px"} >{service.detail}</Text>
                                        </Box>
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
