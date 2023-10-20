import { create } from "zustand"
import { ToastType } from "../component/ToastNotification"
import { sleep } from "../util/util"

interface IToastState {
  toastBody: string
  setToastBody: (newToastBody: string) => void

  isToastShow: boolean
  setIsToastShow: (newIsToastShow: boolean) => void

  toastType: ToastType
  setToastType: (newToastType: ToastType) => void
}

export const useToastStore = create<IToastState>((set) => ({
  toastBody: "",
  setToastBody: (newToastBody: string) =>
    set(() => ({ toastBody: newToastBody })),

  isToastShow: false,
  setIsToastShow: async (newIsToastShow: boolean) => {
    if (newIsToastShow == true) {
      set(() => ({ isToastShow: false }))
      await sleep(50)
    }
    set(() => ({ isToastShow: newIsToastShow }))
  },

  toastType: ToastType.Info,
  setToastType: (newToastType: ToastType) =>
    set(() => ({ toastType: newToastType })),
}))
