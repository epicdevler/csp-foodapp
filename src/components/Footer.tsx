import { Box, Container, GridItem, SimpleGrid, Text, HStack, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { StaticRoutes } from "@/libs/route_util";

export const Footer = () => {
    const siteMap = [
        {
            label: 'Home',
            href: StaticRoutes.home
        },
        {
            label: 'Menu',
            href: StaticRoutes.menu
        },
        {
            label: 'My Cart',
            href: StaticRoutes.viewCart
        },
        {
            label: 'About',
            href: StaticRoutes.about
        },
        {
            label: 'Contact',
            href: StaticRoutes.aboutContact
        },
    ]
    return (
        <Box as={'footer'} bg={'gray.100'} px={{base: 3, lg: 16}} pt={16}>
            <Container maxW={'container.lg'}>
                <SimpleGrid columns={[1, 2, 3]} gap={[20,10,20]}>
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
                                            return <Text key={index} as={'li'} py={1}><Link href={item.href.route}>{item.label}</Link></Text>
                                        }
                                    )
                                }
                            </Box>
                        </div>
                    </GridItem>
                </SimpleGrid>

                <Box mt={10} py={9}>
                    <Text w={'full'} textAlign={'center'} fontSize={14}>
                        Copyright 2023 epicdevler | All rights reserved
                    </Text>
                </Box>
            </Container>
        </Box>
    );
};