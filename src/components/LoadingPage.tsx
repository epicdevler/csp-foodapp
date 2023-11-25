import { Modal, ModalOverlay, ModalContent, ModalBody, Flex } from "@chakra-ui/react"

const LoadingPageLayout = ({ isLoading, children }: { isLoading: boolean, children: React.ReactNode }) => {
    if (isLoading) {
        return <h1>Loading</h1>
    } else {
        return (<>{ children }</>)
    }
}

export default LoadingPageLayout




export function Loading({ isOpen, onClose, message }: { isOpen: boolean, onClose: () => void, message: string }) {
    return (
        <Modal  closeOnOverlayClick={false} blockScrollOnMount={true} isCentered={true} scrollBehavior='inside' onClose={onClose} isOpen={isOpen}>
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