import { FoodCategories } from "@/libs/menu_constants"
import { Container, GridItem, VStack, SimpleGrid, Image, Text, Heading, LinkOverlay, LinkBox } from "@chakra-ui/react"

const MenuCategoriesPage = () => {


    
    return <>
        <section>
            <Container p={5} py={150} maxW={'container.lg'}>
                <Heading textAlign={'center'} size={'md'} mb={10} p={5}>Menu Categories</Heading>
                
                <SimpleGrid spacing={10} columns={{ base: 2, sm: 3, md: 4, lg: 4 }}>
                    {
                        FoodCategories.map(
                            (category, index) => {
                                return (
                                    <GridItem key={index}>
                                        <LinkBox>
                                            <LinkOverlay href={`/menu/${category.name}`} textAlign={'center'}>
                                                <VStack spacing={1  } w={'full'} h={'full'} alignItems={'center'} justifyContent={'center'}>
                                                    <Image objectFit={'cover'} objectPosition={'center'} src={category.imgUrl} alt={`Image of ${category.name}`} borderRadius={'full'} width={100} height={100} />
                                                    <Text textAlign={'center'} mt={5} >{category.name}</Text>
                                                </VStack>
                                            </LinkOverlay>
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