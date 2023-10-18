"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { loginUser } from "../api/user/login"
import { ToastType } from "../component/ToastNotification"
import { KEY_LOCAL_STORAGE_JWT_TOKEN } from "../constant/constant"
import { URL_HOME_PAGE, URL_REGISTER_PAGE } from "../constant/frontendPath"
import { useToastStore } from "../state/toast"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { setBody, setIsShow, setType } = useToastStore()

  const { push } = useRouter()

  const _login = async (username: string, password: string) => {
    const res = await loginUser(username, password)
    const content = await res.json()

    if (!(res.status >= 200 && res.status < 300)) {
      setBody(content.error!)
      setType(ToastType.Error)
      setIsShow(true)
      return
    }

    localStorage.setItem(KEY_LOCAL_STORAGE_JWT_TOKEN, content.data!.token)

    setBody("login success")
    setType(ToastType.Success)
    setIsShow(true)
    push(URL_HOME_PAGE)
  }

  return (
    <div className="container-sm">
      <h1 className="text-center my-4">Login</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          _login(username, password)
        }}
      >
        <div className="form-outline my-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-person" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          </div>
        </div>

        <div className="form-outline my-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock" />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
        </div>

        <div className="d-grid my-4">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>

        <p className="text-center">
          Not a member? <Link href={URL_REGISTER_PAGE}>Register</Link>
        </p>
      </form>
    </div>
  )
}
