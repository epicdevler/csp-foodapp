'use client'
import { Box, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react'

interface DashboardItem {
    label: string;
    href: string;
    active: boolean
}

export default function Sidebar() {
    const [activePath, setActivePath] = useState('')

    const path = usePathname()

    
    useEffect(
        () => {
            const items = path.split("/")

            const isInDashboard = items[1] === "dashboard"

            if (isInDashboard) {
                if (items.length < 3 && items.length > 1) {
                    setActivePath(items[1])
                } else {
                    setActivePath(items[2])
                }
            }
        },
        [path]
    )

    const sideBarItems: DashboardItem[] = [
        {
            label: "Dashboard",
            href: "/dashboard",
            active: "dashboard" === activePath,
        },
        {
            label: "Order List",
            href: "/dashboard/orders",
            active: "orders" === activePath,
        },
        {
            label: "Customer",
            href: "/dashboard/customers",
            active: "customers" === activePath,
        },
        // {
        //     label: "Analytics",
        //     href: "/dashboard/analytics",
        //     active: "analytics" === activePath,
        // },
        // {
        //     label: "Foods",
        //     href: "/dashboard/foods",
        //     active: "foods" === activePath,
        // },
        {
            label: "Menu",
            href: "/dashboard/menu",
            active: "menu" === activePath,
        }
    ]

    return (
        <VStack>
            {
                sideBarItems.map(
                    (item, index) => {
                        //<div className={` rounded-lg`} key={index}>
                        return <Box
                            key={index}
                            as={Link}
                            href={item.href}
                            bg={`${item.active ? "var(--transparency-success, rgba(0, 176, 116, 0.15))" : ""}`}
                            textColor={`${item.active ? "#00B074" : "#464255"}`}
                            _hover={{
                                textColor: "#00B074"
                            }}
                            borderRadius={'lg'} p={4} w={'full'}
                        >
                            {item.label}
                        </Box>
                        //</div>
                    }
                )
            }
        </VStack>
    )
}
