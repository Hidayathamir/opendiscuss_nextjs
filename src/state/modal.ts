import { create } from "zustand"
import { sleep } from "../util/util"

interface IModalState {
  modalBody: string
  setModalBody: (newModalBody: string) => void

  isModalShow: boolean
  setIsModalShow: (newIsModalShow: boolean) => void

  onModalConfirm: () => void
  setOnModalConfirm: (newOnModalConfirm: () => void) => void
}

export const useModalStore = create<IModalState>((set) => ({
  modalBody: "",
  setModalBody: (newBody: string) => set(() => ({ modalBody: newBody })),

  isModalShow: false,
  setIsModalShow: async (_isShow: boolean) => {
    if (_isShow == true) {
      set(() => ({ isModalShow: false }))
      await sleep(50)
    }
    set(() => ({ isModalShow: _isShow }))
  },

  onModalConfirm: () => {},
  setOnModalConfirm: (newOnModalConfirm: () => void) => {
    set(() => ({ onModalConfirm: newOnModalConfirm }))
  },
}))
