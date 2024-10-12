import { create } from "zustand";

type CardModalStore = {
    card?: any;
    list?: string;
    isOpen: boolean;
    onOpen: (card: any, list:string) => void;
    onClose: () => void;
}

export const useCardModal = create<CardModalStore>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (card:any, list:string) => set({ isOpen: true, card: card, list: list}),
    onClose: () => set({ isOpen: false, card: undefined})
}))