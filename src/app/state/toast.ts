import { create } from "zustand"
import { ToastType } from "../component/ToastNotification"
import { sleep } from "../util/sleep"

interface IToastState {
  body: string
  setBody: (newBody: string) => void

  isShow: boolean
  setIsShow: (_isShow: boolean) => void

  type: ToastType
  setType: (_type: ToastType) => void
}

export const useToastStore = create<IToastState>((set) => ({
  body: "",
  setBody: (newBody: string) => set(() => ({ body: newBody })),

  isShow: false,
  setIsShow: async (_isShow: boolean) => {
    if (_isShow == true) {
      set(() => ({ isShow: false }))
      await sleep(50)
    }
    set(() => ({ isShow: _isShow }))
  },

  type: ToastType.Info,
  setType: (_type: ToastType) => set(() => ({ type: _type })),
}))
