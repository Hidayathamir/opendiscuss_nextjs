export const URL_API_REGISTER = "http://localhost:9080/api/v1/register"
export const URL_API_LOGIN = "http://localhost:9080/api/v1/login"
export const URL_API_QUESTIONS = "http://localhost:9080/api/v1/questions"
export enum VoteOption {
  ThumbsUp = "thumbsup",
  ThumbsDown = "thumbsdown",
}
export const URL_API_VOTE_QUESTION = (
  questionId: number,
  voteOption: VoteOption,
) => {
  return `http://localhost:9080/api/v1/questions/${questionId}/${voteOption}`
}
export const URL_API_DELETE_QUESTION = (questionId: number) => {
  return `http://localhost:9080/api/v1/questions/${questionId}`
}
