import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ChakraProvider } from "@chakra-ui/react";
import { Footer } from '@/components/Footer';
import DialogNavigation from '@/components/DialogNavigation';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Food',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {


    return (
        <html lang="en">
            <body className={`${inter.className} relative`}>


                <ChakraProvider>

                    <DialogNavigation />
                    {children}
                    <Footer />
                </ChakraProvider>

            </body>
        </html>
    )
}
