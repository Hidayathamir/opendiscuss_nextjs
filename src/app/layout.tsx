"use client"

import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"
import BootstrapClient from "../component/BootstrapClient"
import NavigationBar from "../component/NavigationBar"
import ToastNotification from "../component/ToastNotification"
import { BG_DARK_1, BG_DARK_2 } from "../constant/color"
import { useToastStore } from "../state/toast"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { body, isShow, setIsShow, type } = useToastStore()

  return (
    <html lang="en">
      <body style={{ backgroundColor: BG_DARK_2 }}>
        <ToastNotification
          body={body}
          onClose={() => {
            setIsShow(false)
          }}
          show={isShow}
          toastType={type}
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
