"use client"

import BootstrapClient from "@/component/BootstrapClient"
import ModalConfirmation from "@/component/ModalConfirmation"
import NavigationBar from "@/component/NavigationBar"
import ToastNotification from "@/component/ToastNotification"
import { BG_DARK_1, BG_DARK_2 } from "@/constant/color"
import { useModalStore } from "@/state/modal"
import { useToastStore } from "@/state/toast"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { toastBody, isToastShow, setIsToastShow, toastType } = useToastStore()

  const { modalBody, isModalShow, setIsModalShow, onModalConfirm } =
    useModalStore()

  return (
    <html lang="en">
      <body style={{ backgroundColor: BG_DARK_2 }}>
        <ToastNotification
          body={toastBody}
          onClose={() => {
            setIsToastShow(false)
          }}
          show={isToastShow}
          toastType={toastType}
        />
        <ModalConfirmation
          show={isModalShow}
          handleClose={() => {
            setIsModalShow(false)
          }}
          body={modalBody}
          onConfirm={onModalConfirm}
        />
        <div
          className="container p-0 min-vh-100"
          style={{
            maxWidth: 800,
            backgroundColor: BG_DARK_1,
          }}
        >
          <NavigationBar />
          <div className="py-2 px-3">{children}</div>
        </div>
        <BootstrapClient />
      </body>
    </html>
  )
}
