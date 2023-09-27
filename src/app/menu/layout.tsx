import MenuHeroSection from '@/app/menu/_sections/_hero'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <MenuHeroSection />
            {
                children
            }
        </>
    )
}
