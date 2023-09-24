'use client'
import { Box, Container, Text, Flex, HStack, IconButton, VStack, SystemStyleObject, Button } from "@chakra-ui/react"
import { MagnifyingGlassIcon, Bars3Icon, XCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState } from "react"


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
        label: 'About',
        href: '/about'
    },
    {
        label: 'Contact',
        href: '/about/#contact'
    },
]


const _iconBtnHoverEff: SystemStyleObject = {
    border: "1px solid white",
    color: "white"
}

const _iconBtnActiveEff: SystemStyleObject = {
    backgroundColor: "rgba(255, 255, 255, 0.10)"
}


function BookTaleBtn({ hideBelow }: { hideBelow?: "md" }) {
    return <Button hideBelow={hideBelow}>
        Book a Table
    </Button>
}

export function NavbarFull(
    { show = false, onClose }: { show: boolean, onClose: () => void }
) {

    

    return <nav className={`fixed transition-all duration-150 w-full ${show ? "-" : ""}translate-x-full bg-white top-0 right-0 bg-[rgba(0, 0, 0, 85)] h-screen md:hidden p-5 z-50`}>
        <VStack spacing={10} >
            <Box w={'full'} textAlign={'end'}>
                <IconButton
                    onClick={onClose}
                    colorScheme='black'
                    variant={'outlined'}
                    isRound={true}
                    size={'sm'}
                    aria-label='Close Navigation Menu'
                    icon={
                        <XCircleIcon className="h-5 w-5" />
                    }
                />
            </Box>

            <VStack spacing={5} as={'ul'} fontSize={14}>

                {
                    siteMap.map(
                        (item, index) => {
                            return <Text key={index} as={'li'} py={1}><Link href={item.href}>{item.label}</Link></Text>
                        }
                    )
                }

            </VStack>

            <BookTaleBtn />
        </VStack>

    </nav>
}


const Navbar = () => {
    const [isNavbarShown, setIsNavbarShown] = useState(false)

    const handleNavbarToggle = () => {
        setIsNavbarShown(!isNavbarShown)
    }

    return <>
        <nav>
            <Container maxW={'container.lg'} py={4} textColor='white'>
                <Flex alignItems={'center'} justifyContent='space-between'>
                    <Text>
                        Logo
                    </Text>

                    <HStack spacing={5} as={'ul'} hideBelow={'md'} fontSize={14}>
                        {
                            siteMap.map(
                                (item, index) => {
                                    return <Text key={index} as={'li'} py={1}><Link href={item.href}>{item.label}</Link></Text>
                                }
                            )
                        }
                    </HStack>

                    <HStack spacing={3}>
                        <IconButton
                            _active={_iconBtnActiveEff}
                            transition={"border .2s ease-in-out"}
                            _hover={_iconBtnHoverEff}
                            aria-label="search"
                            borderRadius='full'
                            bg={'transparent'}
                            icon={
                                <MagnifyingGlassIcon
                                    className="h-4 w-4 text-white" />
                            }
                        />
                        <IconButton
                            _active={_iconBtnActiveEff}
                            transition={"border .2s ease-in-out"}
                            _hover={_iconBtnHoverEff}
                            aria-label="My Cart"
                            borderRadius='full'
                            bg={'transparent'}
                            icon={

                                <ShoppingCartIcon
                                    className="h-4 w-4 text-white" />
                            }
                        />

                        <IconButton
                            onClick={handleNavbarToggle}
                            _active={_iconBtnActiveEff}
                            transition={"border .2s ease-in-out"}
                            _hover={_iconBtnHoverEff}
                            aria-label="Open Navigation Menu"
                            hideFrom={'md'}
                            borderRadius='full'
                            bg={'transparent'}
                            icon={
                                <Bars3Icon
                                    className="h-4 w-4 text-white" />
                            }
                        />
                        <BookTaleBtn hideBelow="md" />
                    </HStack>
                </Flex>
            </Container>
        </nav>

        <NavbarFull show={isNavbarShown} onClose={handleNavbarToggle} />
    </>
}

export default Navbar
