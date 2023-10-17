import { IQuestionHighlight } from "../api/question/getQuestionList"
import { capitalizeFirstLetter } from "../util/util"

interface IPropQuestionHighlight {
  question: IQuestionHighlight
}

export default function QuestionHighlight({
  question,
}: IPropQuestionHighlight) {
  const createdAt = new Date(question.created_at)
  return (
    <div className="my-2 p-2 rounded" style={{ backgroundColor: "#d8dae3" }}>
      <div className="fw-bold fs-5 me-auto mb-2">
        {capitalizeFirstLetter(question.title)}
      </div>
      <div>{capitalizeFirstLetter(question.question)}</div>
      <div className="d-flex align-items-center">
        <div className="d-flex gap-3 me-auto">
          <div className="d-flex gap-1" role="button">
            <i className="bi bi-hand-thumbs-up" />
            {question.thumbs_up}
          </div>
          <div className="d-flex gap-1" role="button">
            <i className="bi bi-hand-thumbs-down" />
            {question.thumbs_down}
          </div>
          <div className="d-flex gap-1" role="button">
            <i className="bi bi-chat-dots" />
            {question.answer_count}
          </div>
        </div>
        <div style={{ fontSize: 12 }}>
          {question.author}
          <div>{`${createdAt.getDate()}-${createdAt.getMonth()}-${createdAt.getFullYear()}`}</div>
        </div>
      </div>
    </div>
  )
}
