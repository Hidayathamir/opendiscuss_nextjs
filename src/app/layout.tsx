"use client"

import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"
import BootstrapClient from "./component/BootstrapClient"
import ToastNotification from "./component/ToastNotification"
import { useToastStore } from "./state/toast"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { body, isShow, setIsShow, type } = useToastStore()

  return (
    <html lang="en">
      <body>
        <ToastNotification
          body={body}
          onClose={() => {
            setIsShow(false)
          }}
          show={isShow}
          toastType={type}
        />
        <div className="container" style={{ maxWidth: 600 }}>
          {children}
        </div>
        <BootstrapClient />
      </body>
    </html>
  )
}
