import { Container, GridItem, VStack, SimpleGrid, Image, Text, Heading, LinkOverlay, LinkBox } from "@chakra-ui/react"
import Link from "next/link"

const MenuCategoriesPage = () => {
    return <>
        <section>
            <Container p={5} py={150} maxW={'container.lg'}>
                <Heading textAlign={'center'} size={'md'} mb={10} p={5}>Menu Categories</Heading>
                <SimpleGrid spacing={10} columns={{ base: 2, sm: 3, md: 4, lg: 4 }}>
                    {
                        [...Array(10)].map(
                            (item, index) => {
                                return (
                                    <GridItem key={index}>
                                        <LinkBox>
                                            <VStack spacing={4} w={'full'} h={'full'} alignItems={'center'} justifyContent={'center'}>
                                                <LinkOverlay as={Link} href={`/menu/${index}`}>
                                                    <Image src='/food_1.jpg' alt="" borderRadius={'full'} width={100} height={100} />
                                                    <Text textAlign={'center'} mt={5} >Name</Text>
                                                </LinkOverlay>
                                            </VStack>
                                        </LinkBox>

                                    </GridItem>
                                )
                            }
                        )
                    }
                </SimpleGrid>
            </Container>
        </section>
    </>
}

export default MenuCategoriesPage