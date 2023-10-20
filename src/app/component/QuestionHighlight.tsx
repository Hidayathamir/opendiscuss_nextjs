"use client"

import { deleteQuestion } from "../api/question/deleteQuestion"
import { IQuestionHighlight } from "../api/question/getQuestionList"
import { voteQuestion } from "../api/question/voteQuestion"
import { VoteOption } from "../constant/backendPath"
import { BG_DARK_1, BG_DARK_3, TXT_WHITE_1 } from "../constant/color"
import { KEY_LOCAL_STORAGE_JWT_TOKEN } from "../constant/constant"
import { useModalStore } from "../state/modal"
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
  const { setToastBody, setIsToastShow, setToastType } = useToastStore()
  const { setModalBody, setIsModalShow, setOnModalConfirm } = useModalStore()

  const _voteQuestion = async (questionId: number, voteOption: VoteOption) => {
    let jwtToken = localStorage.getItem(KEY_LOCAL_STORAGE_JWT_TOKEN)
    if (jwtToken == null) {
      setToastBody("you are not logged in")
      setToastType(ToastType.Error)
      setIsToastShow(true)
      return
    }

    const res = await voteQuestion(jwtToken, questionId, voteOption)
    const content = await res.json()

    if (!(res.status >= 200 && res.status < 300)) {
      setToastBody(content.error!)
      setToastType(ToastType.Error)
      setIsToastShow(true)
      return
    }

    refetchQuestion()
  }

  const _deleteQuestion = async (questionId: number) => {
    let jwtToken = localStorage.getItem(KEY_LOCAL_STORAGE_JWT_TOKEN)
    if (jwtToken == null) {
      setToastBody("you are not logged in")
      setToastType(ToastType.Error)
      setIsToastShow(true)
      return
    }

    const res = await deleteQuestion(jwtToken, questionId)
    const content = await res.json()

    if (!(res.status >= 200 && res.status < 300)) {
      if (content.error!.includes("unauthorized")) {
        content.error = "Unauthorized"
      }
      setToastBody(content.error!)
      setToastType(ToastType.Error)
      setIsToastShow(true)
      return
    }

    setToastBody("success delete question")
    setToastType(ToastType.Success)
    setIsToastShow(true)

    refetchQuestion()
  }

  const _handleDeleteQuestion = (questionId: number) => {
    setModalBody("Are you sure want to delete this question?")
    setOnModalConfirm(() => {
      _deleteQuestion(questionId)
      setIsModalShow(false)
      return
    })
    setIsModalShow(true)
  }

  const createdAt = new Date(question.created_at)
  return (
    <>
      <div
        className="my-2 p-4 rounded"
        style={{ backgroundColor: BG_DARK_3, color: TXT_WHITE_1 }}
      >
        <div className="fw-bold fs-5 me-auto">
          {capitalizeFirstLetter(question.title)}
        </div>
        <div className="my-3">{capitalizeFirstLetter(question.question)}</div>
        <div className="d-flex align-items-center">
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
          <div className="d-flex align-items-center gap-2">
            <div style={{ fontSize: 12 }}>
              <div className="d-flex justify-content-end">
                {question.author}
              </div>

              <div>{`${createdAt.getDate()}-${createdAt.getMonth()}-${createdAt.getFullYear()}`}</div>
            </div>
            <div className="fs-4">
              <i
                className="bi bi-three-dots-vertical"
                role="button"
                data-bs-toggle="dropdown"
              >
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: BG_DARK_1 }}
                >
                  <li>
                    <div
                      className="dropdown-item"
                      style={{ color: TXT_WHITE_1, fontStyle: "normal" }}
                    >
                      <div
                        className="d-flex gap-1"
                        onClick={() => {
                          _handleDeleteQuestion(question.id)
                        }}
                      >
                        <i className="bi bi-trash" />
                        <div>Delete</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
