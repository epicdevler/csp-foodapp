import { Box, Button, Image, ButtonGroup, Card, CardBody, CardFooter, Container, Divider, GridItem, Heading, SimpleGrid, Stack, Text, CardHeader, HStack, Flex, IconButton } from '@chakra-ui/react'
import React from 'react'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"

import '@smastrom/react-rating/style.css'
// import { Rating } from 'material-ui-rating'
// import Image from 'next/image'

export default function AboutSection() {

    return (
        <section id='about'>
            <Container maxW={'container.lg'} py={100}>

                <SimpleGrid alignItems={'center'} gap={[10,20]} columns={{ sm: 1, md: 2 }}>
                    <GridItem>
                        <Flex maxW={'full'} flexFlow={'auto'}>
                            <Image borderRadius={'md'}  src={'/images/outside_view1.jpg'} alt={'Food'} />
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Heading
                                variant={''}
                                textDecoration={'underline'}
                                textDecorationColor={'grey'}
                                textUnderlineOffset={10}
                                mb={9}
                            >
                                About
                            </Heading>
                            <Text lineHeight={8} fontSize={'14px'}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur sapiente ea ratione amet? Dolores est commodi veritatis repudiandae ut non similique quo blanditiis molestias pariatur iste, quia numquam veniam enim.
                            </Text>
                        </Box>
                    </GridItem>
                </SimpleGrid>

            </Container>
        </section>
    )
}
