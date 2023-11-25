
const LoadingPageLayout = ({ isLoading, children }: { isLoading: boolean, children: React.ReactNode }) => {
    return (<>

        {
            isLoading
                ? <h2>Loading</h2>
                : { children }
        }
    </>
    )
}

export default LoadingPageLayout
