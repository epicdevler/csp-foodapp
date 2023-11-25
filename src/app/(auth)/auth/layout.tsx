'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ChakraProvider, Text } from "@chakra-ui/react";
import NextTopLoader from 'nextjs-toploader';
import { auth } from '@/db_init';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { loadUser, logOut } from '@/libs/auth';
import { USERS_ROLE } from '@/libs/auth/utils';
import { BasicUserData } from '@/libs/models'
import { onAuthStateChanged } from 'firebase/auth';
import LoadingPageLayout from '@/components/LoadingPage';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user == null) {
                setIsLoading(false)
            } else {
                manageUser(user.uid)
            }
        })

    }, [])

    const manageUser = (userId: string) => {
        loadUser(userId)
            .then((_userData) => {
                _userData.exists()
                if (_userData.exists()) {
                    const userData: BasicUserData = (_userData.data() as BasicUserData)
                    if (userData.role === USERS_ROLE.ADMIN) {
                        router.replace("/dashboard")
                    } else {
                        router.replace("/")
                    }
                }
            })
            .catch((error) => {
                console.error("Firestore: " + error)
                logOut()
                setIsLoading(false)
            })
    }


    return (
        <html lang="en">

            <ChakraProvider>
                <body className={`${inter.className}`}>
                    <LoadingPageLayout isLoading={isLoading}>
                        {
                            children
                        }
                    </LoadingPageLayout>
                </body>
            </ChakraProvider>
        </html>
    )
}
