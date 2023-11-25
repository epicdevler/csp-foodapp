
const LoadingPageLayout = ({ isLoading, children }: { isLoading: boolean, children: React.ReactNode }) => {

    if (isLoading) {
        return <h2>Loading</h2>
    } else {
        return (
            <>{children}</>
        )
    }

}

export default LoadingPageLayout
