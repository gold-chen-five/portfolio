import { create } from 'zustand'

export const useIntro = create((set) => ({
    intro: false,
    setIntro: (value) => set({intro: value})
}))

export const useCard = create((set) => ({
    cardBackSide: false,
    setCardBackSide: (value) => set({ cardBackSide: value })
}))

export const useHover = create((set) =>({
    hover: false,
    setHover: (value) => set({ hover: value})
}))

export const useMediaQuery = create((set) =>({
    mediaQuery: false,
    setMediaQuery: (value) => set({ mediaQuery: value})
}))