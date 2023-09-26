import { Box, Button, Image, VStack, Container, GridItem, Heading, SimpleGrid, Text, Flex, Input, Textarea } from '@chakra-ui/react'
import React from 'react'
import '@smastrom/react-rating/style.css'
// import { Rating } from 'material-ui-rating'
// import Image from 'next/image'

export default function ContactSection() {

    return (
        <section id='contact'>
            <Container maxW={'container.lg'} py={150}>

                <SimpleGrid columns={{ sm: 1, md: 3, lg: 3 }} spacing={8} >
                    <GridItem>
                        <Box borderRadius={'md'} w={'full'} h={'full'} p={5} boxShadow={'lg'}>

                        </Box>
                    </GridItem>

                    <GridItem colSpan={['auto', 2]}>
                        <Box borderRadius={'md'} w={'full'} h={'full'} p={5} boxShadow={'lg'}>
                            <Heading mb={5}>Get In Touch</Heading>
                            <form>
                                <SimpleGrid gap={8} columns={{ sm: 1, md: 2 }}>
                                    <GridItem>
                                        <Input w={'full'} placeholder={'First Name'} type={'text'} />
                                    </GridItem>
                                    <GridItem>
                                        <Input w={'full'} placeholder={'Last Name'} type={'text'} />
                                    </GridItem>
                                    <GridItem>
                                        <Input w={'full'} placeholder={'Phone Number'} type={'text'} />
                                    </GridItem>
                                    <GridItem>  
                                        <Input w={'full'} placeholder={'Email'} type={'email'} />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Textarea placeholder={'Your  Message'} cols={10} rows={10} resize={'none'} ></Textarea>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Button>Send Message</Button>
                                    </GridItem>
                                </SimpleGrid>
                            </form>
                        </Box>
                    </GridItem>
                </SimpleGrid>

            </Container>
        </section>
    )
}
