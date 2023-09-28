'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookTableModal from '@/app/book/modal';
import CartDrawer from '@/app/cart/drawer';


export default function DialogNavigation() {


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
        []
    )
    const handleCloseModal = () => {
        router.back()
    }

    return (
        <>
            <BookTableModal isOpen={view === "bookTable"} onClose={handleCloseModal} />
            <CartDrawer isOpen={view === "cart"} onClose={handleCloseModal} />
        </>
    )
}
