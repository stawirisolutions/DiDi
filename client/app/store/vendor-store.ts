import { STORE } from "@/app/utils/types";
import { create } from "zustand";

interface VENDOR_STORE {
    store: STORE | null,
    setStore: (store: STORE) => void
}

const useVendorStore = create<VENDOR_STORE>((set) => ({
    store: null,
    setStore: (store) => set({ store })
}))

export default useVendorStore;