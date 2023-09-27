import { Box, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Text } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import { usePathname } from 'next/navigation'

export default function MenuHeroSection() {

    const pathname = usePathname()

    const pathItems = pathname.substring(1).split("/")
    const isLastChild = pathItems.length <= 1

    return (
        <Box bgPos={'bottom'} bgAttachment={'fixed'} bgSize={'cover'} bgRepeat={'none'} bgImg={`/food_1.jpg`} >
            <Box bgColor={'rgba(0, 0, 0, 0.50)'} >

                <Navbar />

                <Box py={100} px={10} textColor={'white'} textAlign={'center'}>
                    <Heading >Our Menu</Heading>
                    <Flex justifyContent={'center'} p={5}>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/menu'>Menu</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem isLastChild={isLastChild} isCurrentPage={isLastChild}>
                                <BreadcrumbLink href='/menu'>Categories</BreadcrumbLink>
                            </BreadcrumbItem>
                            {
                                pathItems.length > 1 ?
                                    (
                                        <BreadcrumbItem isLastChild={true} isCurrentPage={true}>
                                            <BreadcrumbLink>{pathItems[1]}</BreadcrumbLink>
                                        </BreadcrumbItem>
                                    )
                                    :
                                    <></>
                            }
                        </Breadcrumb>
                    </Flex>
                </Box>

            </Box>
        </Box>
    )
}
