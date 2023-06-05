import { Roboto, Vidaloka } from 'next/font/google';

export const roboto = Roboto({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '700'],
});

export const vidaloka = Vidaloka({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400'],
})