import { URL_API_REGISTER } from "@/app/constant/backendPath"

interface IResRegisterUser {
  data?: {
    user_id: number
  }
  error?: string
}

interface IResponseRegisterUser extends Response {
  json(): Promise<IResRegisterUser>
}

export async function registerUser(username: string, password: string) {
  const res: IResponseRegisterUser = await fetch(URL_API_REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  })
  return res
}
