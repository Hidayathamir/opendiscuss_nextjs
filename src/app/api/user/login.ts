import { URL_API_LOGIN } from "@/app/constant/backendPath"

interface ResLoginUser {
  data?: {
    token: string
  }
  error?: string
}

interface ResponseLoginUser extends Response {
  json(): Promise<ResLoginUser>
}

export async function loginUser(username: string, password: string) {
  const res: ResponseLoginUser = await fetch(URL_API_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  })
  return res
}
