"use client"

import { useEffect, useState } from "react"
import {
  IQuestionHighlight,
  getQuestionList,
} from "./api/question/getQuestionList"
import QuestionHighlight from "./component/QuestionHighlight"
import { ToastType } from "./component/ToastNotification"
import { useToastStore } from "./state/toast"

export default function Home() {
  const [questions, setQuestions] = useState<IQuestionHighlight[]>([])
  const [x, setX] = useState(0.1)

  const { setToastBody, setIsToastShow, setToastType } = useToastStore()

  const _getQuestionList = async () => {
    const res = await getQuestionList()
    const content = await res.json()

    if (!(res.status >= 200 && res.status < 300)) {
      setToastBody(content.error!)
      setToastType(ToastType.Error)
      setIsToastShow(true)
      return
    }

    setQuestions(content.data!.questions)
  }

  const refetchQuestion = () => {
    setX(Math.random())
  }

  useEffect(() => {
    _getQuestionList()
  }, [x])

  return (
    <main>
      {questions.map((questionHighlight, index) => (
        <div key={questionHighlight.author + index}>
          <QuestionHighlight
            question={questionHighlight}
            refetchQuestion={refetchQuestion}
          />
        </div>
      ))}
    </main>
  )
}
