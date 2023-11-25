'use client'
import { StaticRoutes } from "@/app/route_util"
import { logOut } from "@/libs/auth"
import { Box, Container, Text, Flex, HStack, IconButton, VStack, SystemStyleObject, Button, ToastId, useToast, Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react"
import { MagnifyingGlassIcon, Bars3Icon, XCircleIcon, ShoppingCartIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Loading } from "./LoadingPage"
import { auth } from "@/db_init"
import AuthButton from "./AuthButton"
import { onAuthStateChanged } from "firebase/auth"


const siteMap = [
    {
        label: 'Home',
        href: StaticRoutes.home
    },
    {
        label: 'Menu',
        href: StaticRoutes.menu
    },
    {
        label: 'About',
        href: StaticRoutes.about
    },
    {
        label: 'Contact',
        href: StaticRoutes.aboutContact
    },
]


const _iconBtnHoverEff: SystemStyleObject = {
    border: "1px solid white",
    color: "white"
}

const _iconBtnActiveEff: SystemStyleObject = {
    backgroundColor: "rgba(255, 255, 255, 0.10)"
}


function BookTaleBtn({ hideBelow }: { hideBelow?: "md" }) {

    const router = useRouter()

    return <Button
        hidden={true}
        as={Link}
        href={StaticRoutes.viewBookTable.route}
        onClick={
            () => {
                // router.push(StaticRoutes.viewBookTable.route)
            }
        }
        hideBelow={hideBelow}
    >
        Book a Table
    </Button>
}

export function NavbarFull(
    { show = false, onClose, isSigendIn, logOut }: { isSigendIn: boolean, show: boolean, onClose: () => void, logOut: () => void }
) {




    return <Box className={`fixed transition-all duration-150 w-full ${show ? "-" : ""}translate-x-full bg-white top-0 right-0 bg-[rgba(0, 0, 0, 85)] h-screen md:hidden p-5 z-50`}>
        <VStack spacing={10} >
            <Box w={'full'} textAlign={'end'}>
                <IconButton
                    onClick={onClose}
                    colorScheme='black'
                    variant={'outlined'}
                    isRound={true}
                    size={'sm'}
                    aria-label='Close Navigation Menu'
                    icon={
                        <XCircleIcon className="h-5 w-5" />
                    }
                />
            </Box>

            <VStack spacing={5} as={'ul'} fontSize={14}>

                {
                    siteMap.map(
                        (item, index) => {
                            return <Text key={index} as={'li'} py={1}><Link href={item.href.route}>{item.label}</Link></Text>
                        }
                    )
                }

                <AuthButton isSignedIn={isSigendIn} shouldHide={false} onClick={logOut} />

            </VStack>

            <BookTaleBtn />
        </VStack>

    </Box>
}


const Navbar = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(
        () => {
            onAuthStateChanged(auth, (user) => {
                setIsSignedIn(user != null)
            })
        }, []
    )


    const toast = useToast()
    const toastIdRef = useRef<ToastId>()

    const router = useRouter()

    const [isNavbarShown, setIsNavbarShown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState("")

    const handleNavbarToggle = () => {
        setIsNavbarShown(!isNavbarShown)
    }
    const toggleIsLoading = (message?: string | undefined) => {
        if (message != undefined && message !== "") setLoadingMsg(message)
        else setLoadingMsg("")
        setIsLoading(!isLoading)
    }

    const handleLogout = () => {
        toggleIsLoading("Logging you out...")
        logOut()
            .then(() => {
                router.replace('/auth/login')                
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


    return <>
        <nav>
            <Container maxW={'container.lg'} py={4} textColor='white'>
                <Flex alignItems={'center'} justifyContent='space-between'>
                    <Text>
                        Logo
                    </Text>

                    <HStack spacing={5} as={'ul'} hideBelow={'md'} fontSize={14}>
                        {
                            siteMap.map(
                                (item, index) => {
                                    return <Text key={index} as={'li'} py={1}><Link href={item.href.route}>{item.label}</Link></Text>
                                }
                            )
                        }
                    </HStack>

                    <HStack spacing={3}>
                        <IconButton
                            _active={_iconBtnActiveEff}
                            transition={"border .2s ease-in-out"}
                            _hover={_iconBtnHoverEff}
                            aria-label="search"
                            borderRadius='full'
                            bg={'transparent'}
                            icon={
                                <MagnifyingGlassIcon
                                    className="h-4 w-4 text-white" />
                            }
                        />
                        <IconButton
                            _active={_iconBtnActiveEff}
                            transition={"border .2s ease-in-out"}
                            _hover={_iconBtnHoverEff}
                            aria-label="My Cart"
                            borderRadius='full'
                            bg={'transparent'}
                            as={Link}
                            href={StaticRoutes.viewCart.route}
                            icon={

                                <ShoppingCartIcon
                                    className="h-4 w-4 text-white" />
                            }
                        />
                        <IconButton
                            _active={_iconBtnActiveEff}
                            transition={"border .2s ease-in-out"}
                            _hover={_iconBtnHoverEff}
                            aria-label="LogOut"
                            borderRadius='full'
                            // bg={'transparent'}
                            hidden={true}
                            // as={Link}
                            // href={StaticRoutes.viewCart.route}
                            icon={

                                <ArrowLeftOnRectangleIcon
                                    fill={'black'}
                                    title="Logout"
                                    className="h-4 w-4 text-white" />
                            }
                        />
                        <AuthButton isSignedIn={isSignedIn} shouldHide={true} onClick={handleLogout} />

                        <IconButton
                            onClick={handleNavbarToggle}
                            _active={_iconBtnActiveEff}
                            transition={"border .2s ease-in-out"}
                            _hover={_iconBtnHoverEff}
                            aria-label="Open Navigation Menu"
                            hideFrom={'md'}
                            borderRadius='full'
                            bg={'transparent'}
                            icon={
                                <Bars3Icon
                                    className="h-4 w-4 text-white" />
                            }
                        />
                        <BookTaleBtn hideBelow="md" />
                    </HStack>
                </Flex>
            </Container>

            <NavbarFull isSigendIn={isSignedIn} show={isNavbarShown} onClose={handleNavbarToggle} logOut={handleLogout} />
        </nav>


        {
            isLoading ?
                <Loading isOpen={isLoading} onClose={toggleIsLoading} message={loadingMsg} />
                : undefined
        }

    </>
}

export default Navbar
