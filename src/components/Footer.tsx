import { Box, Container, GridItem, SimpleGrid, Text, HStack, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export const Footer = () => {
    const siteMap = [
        {
            label: 'Home',
            href: '/'
        },
        {
            label: 'Menu',
            href: '/menu'
        },
        {
            label: 'My Crt',
            href: '/cart'
        },
        {
            label: 'About',
            href: '/about'
        },
        {
            label: 'Contact',
            href: '/about/#contact'
        },
    ]
    return (
        <Box as={'footer'} py={16}>
            <Container maxW={'container.lg'}>
                <SimpleGrid columns={[1, null, 3]} spacing={20}>
                    <GridItem>
                        <Box>
                            <Text fontSize={14}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam blanditiis
                                consequuntur dolores dolorum ducimus esse eum!</Text>

                            <HStack spacing={4} mt={5}>

                                <IconButton aria-label="" borderRadius={'full'} >
                                    <FontAwesomeIcon icon={faFacebookF} size={'sm'} style={{
                                        width: '14px',
                                        height: '14px',
                                    }} />
                                </IconButton>


                                <IconButton aria-label="" borderRadius={'full'} >
                                    <FontAwesomeIcon icon={faXTwitter} size={'sm'} style={{
                                        width: '14px',
                                        height: '14px',
                                    }} />
                                </IconButton>


                                <IconButton aria-label="" borderRadius={'full'} >
                                    <FontAwesomeIcon icon={faLinkedinIn} size={'sm'} style={{
                                        width: '14px',
                                        height: '14px',
                                    }} />
                                </IconButton>

                            </HStack>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <div>
                            <Text fontWeight={500} mb={2} >Site Map</Text>
                            <Box as={'ul'} fontSize={14}>
                                {
                                    siteMap.map(
                                        (item, index) => {
                                            return <Text as={'li'} py={1}><Link href={item.href}>{item.label}</Link></Text>
                                        }
                                    )
                                }
                            </Box>
                        </div>
                    </GridItem>
                </SimpleGrid>

                <Box mt={10} >

                    <Text w={'full'} textAlign={'center'} fontSize={14}>
                        Copyright 2023 epicdevler | All rights reserved
                    </Text>
                </Box>
            </Container>
        </Box>
    );
};