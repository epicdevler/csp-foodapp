import { Modal, ModalOverlay, ModalContent, ModalBody, Flex } from "@chakra-ui/react"
import { BallTriangle } from 'react-loader-spinner'

const LoadingPageLayout = ({ isLoading, children }: { isLoading: boolean, children: React.ReactNode }) => {
    if (isLoading) {
        return <Loading />
    } else {
        return <>{children}</>
    }
}

export default LoadingPageLayout


export function MiniLoader({ isOpen, onClose, message }: { isOpen: boolean, onClose: () => void, message: string }) {
    return (
        <Modal closeOnOverlayClick={false} blockScrollOnMount={true} isCentered={true} scrollBehavior='inside' onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent w={'fit-content'} >
                <ModalBody p={5}>
                    <Flex justifyContent={'center'} alignItems={'center'}>
                        <h1>{message}</h1>
                    </Flex>
                </ModalBody>
            </ModalContent >
        </Modal >
    )
}


export function Loading() {
    return (
        <div className="h-screen w-screen flex justify-center items-center overflow-hidden">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"

                visible={true}
            />
        </div>
    )
}