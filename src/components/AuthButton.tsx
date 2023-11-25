import { StaticRoutes } from "@/app/route_util";
import { auth } from "@/db_init";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function AuthButton({ onClick, shouldHide }: { shouldHide: boolean, onClick: () => void }) {

    const isSignedIn = auth.currentUser != null


    if (isSignedIn) {

        <Button
            onClick={onClick}
            hideBelow={shouldHide ? 'md' : ''}
        >
            Log Out
        </Button>
    }
    return (

        <Button
            as={Link}
            href={StaticRoutes.Login}
            hideBelow={shouldHide ? 'md' : ''}
        >
            Log In
        </Button>
    )
}