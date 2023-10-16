import { URL_API_LOGIN } from "@/app/constant/backendPath"

interface IResLoginUser {
  data?: {
    token: string
  }
  error?: string
}

interface IResponseLoginUser extends Response {
  json(): Promise<IResLoginUser>
}

export async function loginUser(username: string, password: string) {
  const res: IResponseLoginUser = await fetch(URL_API_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  })
  return res
}
