'use client'
import { ChakraProvider } from "@chakra-ui/react";
import { Footer } from '@/components/Footer';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookTableModal from './book/modal';
import Head from 'next/head';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const router = useRouter()
    const searchParams = useSearchParams()
    const [view, setView] = useState<string | undefined | null>(null)

    useEffect(
        () => {
            const toView = searchParams.get("view")?.trim()

            if (toView === "" || toView === null || toView == undefined) {
                setView(null)
            } else {
                setView(toView)
            }
        },
        [searchParams]
    )
    const handleCloseModal = () => {
        router.back()
    }

    return (
        <>
            <ChakraProvider>
                <BookTableModal isOpen={view === "bookTable"} onClose={handleCloseModal} />
                {children}
                <Footer />
            </ChakraProvider>
        </>
    )
}
