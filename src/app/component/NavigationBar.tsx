import Link from "next/link"
import { URL_HOME_PAGE } from "../constant/frontendPath"

export default function NavigationBar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-primary shadow"
        data-bs-theme="dark"
      >
        <div className="container">
          <Link className="navbar-brand fs-2" href={URL_HOME_PAGE}>
            Opendiscuss
          </Link>
          <ul className="navbar-nav fs-3">
            <li className="nav-item mx-3">
              <Link className="nav-link active" href="#">
                <i className="bi bi-pencil" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
