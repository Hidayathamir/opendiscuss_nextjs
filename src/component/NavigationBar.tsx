import Link from "next/link"
import { BG_DARK_3 } from "../constant/color"
import { URL_HOME_PAGE } from "../constant/frontendPath"

export default function NavigationBar() {
  return (
    <div className=" sticky-top">
      <nav
        className="navbar navbar-expand-lg py-2 rounded-bottom shadow-lg"
        data-bs-theme="dark"
        style={{ backgroundColor: BG_DARK_3 }}
      >
        <div className="container position-relative">
          <ul className="navbar-nav fs-3 d-flex justify-content-center w-100">
            <li className="nav-item mx-3 text-center">
              <Link className="navbar-brand fs-2" href={URL_HOME_PAGE}>
                Opendiscuss
              </Link>
            </li>
            <li className="nav-item mx-3 position-absolute end-0 me-4">
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
