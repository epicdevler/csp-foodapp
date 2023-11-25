
import Navbar from '@/components/Navbar';
import AboutSection from './_home/_about_section';
import MenuSection from './_home/_menu_section';
import WhyChooseUsSection from './_home/_why_choose_us';
import { Heading, Text, Container } from '@chakra-ui/react';

export default function Home() {
  return (

    <>
      <header className="h-screen bg-[url('/food_2.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="h-full" style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}>
          <Navbar />

          <Container as={'section'} textAlign={'center'} maxW={'container.lg'} pt={100} textColor='white'>
            <Heading>
              Fast Food Uprising
            </Heading>
            <Text maxW={'xl'} mx={'auto'} mt={5}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ullam amet praesentium. Cumque architecto magnam dolorem nam enim quasi voluptatibus dolorum quae eaque error est repellat placeat voluptatem, sed illo!</Text>
          </Container>

        </div>

      </header>

      <AboutSection />
      <MenuSection />
      <WhyChooseUsSection />

    </>
  )
}
