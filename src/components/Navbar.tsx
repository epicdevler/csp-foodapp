import { Box, Container, Text, Flex, HStack, IconButton, VStack } from "@chakra-ui/react"
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

                <div>
                    <IconButton aria-label="search" borderRadius='full' bg={'transparent'}>
                        <MagnifyingGlassIcon className="h-4 w-4 text-white" />
                    </IconButton>
                    <IconButton aria-label="shopping cart" borderRadius='full' bg={'transparent'}>
                        <ShoppingCartIcon className="h-4 w-4 text-white" />
                    </IconButton>

                    <IconButton aria-label="open navigation menu" hideFrom={'md'} borderRadius='full' bg={'transparent'}>
                        <Bars3Icon className="h-4 w-4 text-white" />
                    </IconButton>
                </div>
            </Flex>
        </Container>
    </nav>
}

export default Navbar
