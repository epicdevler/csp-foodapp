import { AspectRatio, Box, Button, Image, VStack, Container, GridItem, Heading, SimpleGrid, Text, Flex, Input, Textarea } from '@chakra-ui/react'
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
            <Box>
                <AspectRatio ratio={16 / 9}>
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng'
                    />
                </AspectRatio>
            </Box>
        </section>
    )
}
