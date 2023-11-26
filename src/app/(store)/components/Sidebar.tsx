'use client'
import { MiniLoader } from '@/components/LoadingPage';
import { logOut } from '@/libs/auth';
import { Box, Button, Flex, Heading, ToastId, VStack, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react'
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"

interface DashboardItem {
    label: string;
    href: string;
    active: boolean
}

export default function Sidebar() {
    const [activePath, setActivePath] = useState('')

    const path = usePathname()



    const toast = useToast()
    const toastIdRef = useRef<ToastId>()

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState("")


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


    const toggleIsLoading = (message?: string | undefined) => {
        if (message != undefined && message !== "") setLoadingMsg(message)
        else setLoadingMsg("")
        setIsLoading(!isLoading)
    }

    const handleLogout = () => {
        toggleIsLoading("Logging you out...")
        logOut()
            .then(() => {
                router.refresh()
            })
            .catch((e) => {

                toastIdRef.current = toast(
                    {
                        description: `An error occured when loging out.`,
                        status: 'error',
                        duration: 1500,
                    }
                )
                toggleIsLoading()
                console.error("Error: ", e)
            })
    }

    return (
        <>
            <Flex flexDirection={'column'} h={'full'}>
                <VStack h={'full'} overflowY={'auto'}>
                    <Heading size={'sm'} p={4} w={'full'}>Food App</Heading>
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

                <Button
                    w={'full'}
                    leftIcon={

                        <ArrowLeftOnRectangleIcon
                            title="Logout"
                            className="h-4 w-4" />
                    }
                    // hidden={true}
                    // as={Link}
                    // href={StaticRoutes.viewBookTable.route}
                    onClick={
                        handleLogout
                    }
                // hideBelow={hideBelow}
                >

                    Logout
                </Button>
            </Flex>



            {
                isLoading ?
                    <MiniLoader isOpen={isLoading} onClose={toggleIsLoading} message={loadingMsg} />
                    : undefined
            }
        </>
    )
}
