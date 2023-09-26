import { Box, Button, Image, VStack, Container, GridItem, Heading, SimpleGrid, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import '@smastrom/react-rating/style.css'
// import { Rating } from 'material-ui-rating'
// import Image from 'next/image'

export default function AboutSection() {

    return (
        <section id='about'>
            <Container maxW={'container.lg'} py={100}>

                <SimpleGrid alignItems={'center'} gap={[10, 20]} columns={{ sm: 1, md: 2 }}>

                    <GridItem>
                        <VStack alignItems={'flex-start'} spacing={5}>
                            <Heading
                                variant={''}
                                textDecoration={'underline'}
                                textDecorationColor={'grey'}
                                textUnderlineOffset={10}
                                mb={9}
                            >
                                Who we are
                            </Heading>
                            <Text lineHeight={8} fontSize={'14px'}>
                                A long established fact that a reader will be distracted by the
                                readable content of on the Internet tend to repeat predefined chunks
                                as necessary, making this the first true generator on the Internet.
                                Established fact that a reader will be distracted by the readable
                                content of on the Internet tend to repeat predefined chunks as
                                necessary the Internet tend to repeat
                            </Text>

                            <Button>Read More</Button>
                        </VStack>
                    </GridItem>

                    <GridItem>
                        <Flex maxW={'full'} flexFlow={'auto'}>
                            <Image borderRadius={'md'} src={'/food_2.jpg'} alt={'Food'} />
                        </Flex>
                    </GridItem>
                </SimpleGrid>

            </Container>
        </section>
    )
}
