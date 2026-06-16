import localFont from "next/font/local";

export const gilroy = localFont({
    src: [
        {
            path: "./Gilroy-Regular.woff2",
            weight: '400',
            style: 'normal',
        },
        {
            path: "./Gilroy-Medium.woff2",
            weight: '500',
            style: 'normal',
        },
        {
            path: "./Gilroy-Light.woff2",
            weight: '300',
            style: 'normal',
        },
        {
            path: "./Gilroy-Bold.woff2",
            weight: '700',
            style: 'normal',
        },
        {
            path: "./Gilroy-Heavy.woff2",
            weight: '800',
            style: 'normal',
        },
    ],
    variable: "--font-gilroy",
    display: "swap",
    preload: false,
})