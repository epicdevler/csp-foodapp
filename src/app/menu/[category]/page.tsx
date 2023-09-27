'use client'
import { Container, GridItem, VStack, SimpleGrid, Image, Text, Heading, LinkOverlay, LinkBox } from "@chakra-ui/react"
import Link from "next/link"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const MenuCategoriesItemPage = () => {

    const params = useParams()

    const category = params.category

    return <>
        <section>
            <Container p={5} py={150} maxW={'container.lg'}>
                <Heading textAlign={'center'} size={'md'} mb={10} p={5}>{category}</Heading>

            </Container>
        </section>
    </>
}

export default MenuCategoriesItemPage