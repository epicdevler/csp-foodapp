import React from 'react'
// import HeroImg from '../../../../public/food_2.jpg'
import { Box, Heading } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'

export default function AboutHeroSection() {
    return (
        <Box bgPos={'bottom'} bgAttachment={'fixed'} bgSize={'cover'} bgRepeat={'none'} bgImg={`/food_1.jpg`} >
            <Box  bgColor={'rgba(0, 0, 0, 0.50)'} >

                <Navbar />


                <Box px={150} py={5} textColor={'white'} textAlign={'center'}>
                    <Heading >About Us</Heading>
                </Box>

            </Box>
        </Box>
    )
}
