import "bootstrap/dist/css/bootstrap.min.css"
import BootstrapClient from "./component/BootstrapClient"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
        <BootstrapClient />
      </body>
    </html>
  )
}
