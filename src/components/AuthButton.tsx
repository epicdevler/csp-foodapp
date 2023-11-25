import { StaticRoutes } from "@/app/route_util";
import { auth } from "@/db_init";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function AuthButton({ isSignedIn, onClick, shouldHide }: { isSignedIn: boolean, shouldHide: boolean, onClick: () => void }) {

    console.log(isSignedIn)
    const hiddenBelow = shouldHide ? 'md' : ''
    return (
        <>
            {
                isSignedIn ?
                    <Button
                        onClick={onClick}
                        hideBelow={hiddenBelow}
                    >
                        Log Out
                    </Button>
                    :

                    <Button
                        as={Link}
                        href={StaticRoutes.Login}
                        hideBelow={hiddenBelow}
                    >
                        Log In
                    </Button>
            }
        </>
    )
}