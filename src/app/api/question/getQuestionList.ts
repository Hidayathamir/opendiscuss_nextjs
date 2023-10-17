import { URL_API_QUESTIONS } from "@/app/constant/backendPath"

export interface IQuestionHighlight {
  id: number
  author: string
  author_id: number
  title: string
  question: string
  thumbs_rate: number
  thumbs_up: number
  thumbs_down: number
  answer_count: number
  created_at: string
  updated_at: string
}

interface IResGetQuestionList {
  data?: {
    questions: IQuestionHighlight[]
  }
  error?: string
}

interface IResponseGetQuestionList extends Response {
  json(): Promise<IResGetQuestionList>
}

export async function getQuestionList() {
  const res: IResponseGetQuestionList = await fetch(URL_API_QUESTIONS)
  return res
}
