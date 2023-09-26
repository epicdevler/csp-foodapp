'use client'
import { useRouter } from 'next/router';
import MenuHeroSection from './_sections/_hero';
import { useEffect } from 'react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    

    return (
        <>
            <MenuHeroSection />
            {
                children
            }
        </>
    )
}
