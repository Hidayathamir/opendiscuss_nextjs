import { URL_API_VOTE_QUESTIONS, VoteOption } from "@/constant/backendPath"

interface IResVoteQuestion {
  data?: {
    question_id: number
  }
  error?: string
}

interface IResponseVoteQuestion extends Response {
  json(): Promise<IResVoteQuestion>
}

export async function voteQuestion(
  jwtToken: string,
  questionId: number,
  voteOption: VoteOption,
) {
  const res: IResponseVoteQuestion = await fetch(
    URL_API_VOTE_QUESTIONS(questionId, voteOption),
    { method: "POST", headers: { Authorization: jwtToken } },
  )
  return res
}
