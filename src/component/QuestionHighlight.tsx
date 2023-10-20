"use client"

import { IQuestionHighlight } from "../app/api/question/getQuestionList"
import { voteQuestion } from "../app/api/question/voteQuestion"
import { VoteOption } from "../constant/backendPath"
import { BG_DARK_3, TXT_WHITE_1 } from "../constant/color"
import { KEY_LOCAL_STORAGE_JWT_TOKEN } from "../constant/constant"
import { useToastStore } from "../state/toast"
import { capitalizeFirstLetter } from "../util/util"
import { ToastType } from "./ToastNotification"

interface IPropQuestionHighlight {
  question: IQuestionHighlight
  refetchQuestion: () => void
}

export default function QuestionHighlight({
  question,
  refetchQuestion,
}: IPropQuestionHighlight) {
  const { setBody, setIsShow, setType } = useToastStore()

  const _voteQuestion = async (questionId: number, voteOption: VoteOption) => {
    let jwtToken = localStorage.getItem(KEY_LOCAL_STORAGE_JWT_TOKEN)
    if (jwtToken == null) {
      setBody("you are not logged in")
      setType(ToastType.Error)
      setIsShow(true)
      return
    }

    const res = await voteQuestion(jwtToken, questionId, voteOption)
    const content = await res.json()

    if (!(res.status >= 200 && res.status < 300)) {
      setBody(content.error!)
      setType(ToastType.Error)
      setIsShow(true)
      return
    }

    refetchQuestion()
  }

  const createdAt = new Date(question.created_at)
  return (
    <div
      className="my-2 p-4 rounded"
      style={{ backgroundColor: BG_DARK_3, color: TXT_WHITE_1 }}
    >
      <div className="fw-bold fs-5 me-auto">
        {capitalizeFirstLetter(question.title)}
      </div>
      <div className="my-3">{capitalizeFirstLetter(question.question)}</div>
      <div className="d-flex align-items-end">
        <div className="d-flex gap-3 me-auto">
          <div
            className="d-flex gap-1"
            role="button"
            onClick={() => {
              _voteQuestion(question.id, VoteOption.ThumbsUp)
            }}
          >
            <i className="bi bi-hand-thumbs-up" />
            {question.thumbs_up}
          </div>
          <div
            className="d-flex gap-1"
            role="button"
            onClick={() => {
              _voteQuestion(question.id, VoteOption.ThumbsDown)
            }}
          >
            <i className="bi bi-hand-thumbs-down" />
            {question.thumbs_down}
          </div>
          <div className="d-flex gap-1" role="button">
            <i className="bi bi-chat-dots" />
            {question.answer_count}
          </div>
        </div>
        <div style={{ fontSize: 12 }}>
          <div className="d-flex justify-content-end">{question.author}</div>

          <div>{`${createdAt.getDate()}-${createdAt.getMonth()}-${createdAt.getFullYear()}`}</div>
        </div>
      </div>
    </div>
  )
}
