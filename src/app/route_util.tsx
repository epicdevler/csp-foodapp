interface StaticRoute {
    route: string
}
const _view: StaticRoute = {
    route: "?view="
}

export const StaticRoutes = {
    viewCart: {
        route: `${_view.route}cart`
    },
    viewBookTable: {
        route: `${_view.route}bookTable`
    },
    home: {
        route: "/"
    },
    about: {
        route: "/about"
    },
    aboutContact: {
        route: `/about#contact`
    },
    menu: {
        route: `/menu`
    },
    Login: '/auth/login'
}