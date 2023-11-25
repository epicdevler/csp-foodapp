
const LoadingPageLayout = ({ isLoading, children }: { isLoading: boolean, children: React.ReactNode }) => {

    {
        isLoading
            ? <h2>Loading</h2>
            : <>{children}</>
    }

}

export default LoadingPageLayout
