import { AspectRatio, Box, Button, Stack, StackDivider, VStack, Container, GridItem, Heading, SimpleGrid, Text, Flex, Input, Textarea, FormControl, Center } from '@chakra-ui/react'
import React from 'react'
import '@smastrom/react-rating/style.css'
// import { Rating } from 'material-ui-rating'
import Image from 'next/image'
import Link from 'next/link'

export default function ContactSection() {

    const contactInfo = [
        {
            imgUrl: "/icons/contact_address.png",
            imgAlt: "Address",
            href: "#map",
            label: "Akiama Rd, 503101, Bonny, Rivers",
        },
        {
            imgUrl: "/icons/contact_phone_2.png",
            imgAlt: "Phone",
            href: "tel:+2348088888890",
            label: "+234 808 8888 890",
        },
        {
            imgUrl: "/icons/contact_email.png",
            imgAlt: "Email",
            href: "mailto:order@decutleries.com",
            label: "order@decutleries.com",
        },
    ]

    return (
        <section id='contact'>
            <Container maxW={'container.lg'} py={150}>

                <SimpleGrid columns={{ base: 1, sm: 3, md: 3, lg: 3 }} spacing={8} >
                    <GridItem>
                        <Stack divider={
                            <StackDivider
                                borderStyle={'dashed'}
                                borderColor='gray.200'
                            />
                        }
                            borderRadius={'lg'}
                            w={'full'}
                            h={'full'}
                            p={5}
                            boxShadow={'lg'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            spacing={[5, 20]}
                        >
                            {
                                contactInfo.map(
                                    (info, index) => {
                                        return <Center key={index} w={'full'} h={'full'}>
                                            <VStack justifyContent={'center'} alignItems={'center'} spacing={2} >
                                                <Image src={`${info.imgUrl}`} alt={info.imgAlt} width={40} height={40} />
                                                <Link href={info.href}>{info.label}</Link>
                                            </VStack>
                                        </Center>
                                    }
                                )
                            }
                        </Stack>
                    </GridItem>

                    <GridItem colSpan={['auto', 2]}>
                        <Box borderRadius={'lg'} w={'full'} h={'full'} p={5} boxShadow={'lg'}>
                            <Heading mb={5}>Get In Touch</Heading>
                            <form>
                                <SimpleGrid w={'full'} spacingX={5} spacingY={8} >
                                    <GridItem>
                                        <Box>
                                            <FormControl w={'full'}>
                                                <Input placeholder={'First Name'} type={'text'} />
                                            </FormControl>
                                        </Box>
                                    </GridItem>
                                    <GridItem>
                                        <FormControl>
                                            <Input w={'full'} placeholder={'Last Name'} type={'text'} />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>
                                        <FormControl>
                                            <Input w={'full'} placeholder={'Phone Number'} type={'tel'} />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>

                                        <FormControl>
                                            <Input w={'full'} placeholder={'Email'} type={'email'} />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>

                                        <FormControl>
                                            <Textarea placeholder={'Your  Message'} cols={10} rows={10} resize={'none'} ></Textarea>
                                        </FormControl>
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
            <Box id='map'>
                <AspectRatio ratio={16 / 9}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.9031991803454!2d7.182082974139727!3d4.429130143953698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1068572c7b0bf373%3A0xfab1cc89f92e4d11!2sDe%20Cutlery%20Fast%20Food%20%26%20Chinese%20Restaurant!5e0!3m2!1sen!2sng!4v1695818755805!5m2!1sen!2sng" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </AspectRatio>
            </Box>
        </section>
    )
}
