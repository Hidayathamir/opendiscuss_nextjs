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

  const { setBody, setIsShow, setType } = useToastStore()

  const _getQuestionList = async () => {
    const res = await getQuestionList()
    const content = await res.json()

    if (!(res.status >= 200 && res.status < 300)) {
      setBody(content.error!)
      setType(ToastType.Error)
      setIsShow(true)
      return
    }

    setQuestions(content.data!.questions)
  }

  useEffect(() => {
    _getQuestionList()
  }, [])

  return (
    <main>
      {questions.map((questionHighlight, index) => (
        <div key={questionHighlight.author + index}>
          <QuestionHighlight question={questionHighlight} />
        </div>
      ))}
    </main>
  )
}
