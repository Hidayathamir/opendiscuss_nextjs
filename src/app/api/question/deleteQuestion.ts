import { URL_API_DELETE_QUESTION } from "@/app/constant/backendPath"

interface IResDeleteQuestion {
  data?: {
    question_id: number
  }
  error?: string
}

interface IResponseDeleteQuestion extends Response {
  json(): Promise<IResDeleteQuestion>
}

export async function deleteQuestion(jwtToken: string, questionId: number) {
  const res: IResponseDeleteQuestion = await fetch(
    URL_API_DELETE_QUESTION(questionId),
    {
      method: "DELETE",
      headers: { Authorization: jwtToken, "Content-Type": "application/json" },
    },
  )
  return res
}
