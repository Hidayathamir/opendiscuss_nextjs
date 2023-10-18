"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { registerUser } from "../api/user/register"
import { ToastType } from "../component/ToastNotification"
import { URL_LOGIN_PAGE } from "../constant/frontendPath"
import { useToastStore } from "../state/toast"

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { setBody, setIsShow, setType } = useToastStore()

  const { push } = useRouter()

  const _register = async (username: string, password: string) => {
    const res = await registerUser(username, password)
    const content = await res.json()

    if (!(res.status >= 200 && res.status < 300)) {
      setBody(content.error!)
      setType(ToastType.Error)
      setIsShow(true)
      return
    }

    setBody("register success")
    setType(ToastType.Success)
    setIsShow(true)
    push(URL_LOGIN_PAGE)
  }

  return (
    <div className="container-sm">
      <h1 className="text-center my-4">Register</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          _register(username, password)
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
            Register
          </button>
        </div>

        <p className="text-center">
          Already have account? <Link href={URL_LOGIN_PAGE}>Login</Link>
        </p>
      </form>
    </div>
  )
}
