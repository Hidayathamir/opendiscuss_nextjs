import {
  default as Body,
  default as Header,
  default as Toast,
} from "react-bootstrap/Toast"
import ToastContainer from "react-bootstrap/ToastContainer"
import { BG_DARK_3, TXT_WHITE_1 } from "../constant/color"

export enum ToastType {
  Info,
  Success,
  Error,
}

interface IPropToastNotification {
  body: string
  show: boolean
  onClose: () => void
  toastType: ToastType
}

export default function ToastNotification(prop: IPropToastNotification) {
  const getBorderColorClass = () => {
    if (prop.toastType == ToastType.Info) {
      return "border-primary"
    }
    if (prop.toastType == ToastType.Success) {
      return "border-success"
    }
    if (prop.toastType == ToastType.Error) {
      return "border-danger"
    }
    return ""
  }

  const getTextColorClass = () => {
    if (prop.toastType == ToastType.Info) {
      return "text-primary"
    }
    if (prop.toastType == ToastType.Success) {
      return "text-success"
    }
    if (prop.toastType == ToastType.Error) {
      return "text-danger"
    }
    return ""
  }

  return (
    <ToastContainer
      position="top-center"
      className={"my-5 border rounded " + getBorderColorClass()}
      style={{ backgroundColor: BG_DARK_3, color: TXT_WHITE_1 }}
    >
      <Toast
        show={prop.show}
        onClose={prop.onClose}
        style={
          {
            "--bs-body-bg-rgb": "none",
          } as React.CSSProperties
        }
        autohide
      >
        <Header
          className={
            "d-flex p-2 rounded-0 border-top-0 border-start-0 border-end-0 " +
            getBorderColorClass()
          }
        >
          <i className={"bi bi-square-fill px-1 " + getTextColorClass()} />
          <strong className="me-auto">Opendiscuss</strong>
          <i role="button" className="bi bi-x" onClick={prop.onClose} />
        </Header>
        <Body className="p-3 rounded-0">{prop.body}</Body>
      </Toast>
    </ToastContainer>
  )
}
