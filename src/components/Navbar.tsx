import { Box, Container, Text, Flex, HStack, IconButton, VStack, SystemStyleObject, Button } from "@chakra-ui/react"
import { MagnifyingGlassIcon, Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
// import {} from '@heroicons/react/2'


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


export function NavbarFull() {
    return <nav className={'absolute top-0 right-0 bg-[rgba(0, 0, 0, 85)] h-screen w-full md:hidden z-40'}>

        <VStack textColor='white' spacing={5} as={'ul'} hideBelow={'md'} fontSize={14}>
            {
                siteMap.map(
                    (item, index) => {
                        return <Text key={index} as={'li'} py={1}><Link href={item.href}>{item.label}</Link></Text>
                    }
                )
            }
        </VStack>

    </nav>
}


const Navbar = () => {
    return <nav>
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

                <HStack spacing={5}>
                    <IconButton
                        _active={_iconBtnActiveEff}
                        transition={"border .2s ease-in-out"}
                        _hover={_iconBtnHoverEff}
                        aria-label="search"
                        borderRadius='full'
                        bg={'transparent'}>
                        <MagnifyingGlassIcon
                            className="h-4 w-4 text-white" />
                    </IconButton>
                    <IconButton
                        _active={_iconBtnActiveEff}
                        transition={"border .2s ease-in-out"}
                        _hover={_iconBtnHoverEff}
                        aria-label="My Cart"
                        borderRadius='full'
                        bg={'transparent'}>
                        <ShoppingCartIcon
                            className="h-4 w-4 text-white" />
                    </IconButton>

                    <IconButton
                        _active={_iconBtnActiveEff}
                        transition={"border .2s ease-in-out"}
                        _hover={_iconBtnHoverEff}
                        aria-label="Open Navigation Menu"
                        hideFrom={'md'}
                        borderRadius='full'
                        bg={'transparent'}>
                        <Bars3Icon
                            className="h-4 w-4 text-white" />
                    </IconButton>

                    <Button hideBelow={'md'}>
                        Book a Table
                    </Button>
                </HStack>
            </Flex>
        </Container>
    </nav>
}

export default Navbar
