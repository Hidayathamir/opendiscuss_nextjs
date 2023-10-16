import { URL_API_REGISTER } from "@/app/constant/backendPath"

interface ResRegisterUser {
  data?: {
    user_id: number
  }
  error?: string
}

interface ResponseRegisterUser extends Response {
  json(): Promise<ResRegisterUser>
}

export async function registerUser(username: string, password: string) {
  const res: ResponseRegisterUser = await fetch(URL_API_REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  })
  return res
}
