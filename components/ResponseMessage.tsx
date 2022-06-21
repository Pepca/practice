import { usePopupContext } from '../context/popup.context'

import { setDynamicClasses } from '../lib/classes.lib'

import styles from '../styles/modules/ResponseMessage.module.scss'

interface IResponseMessageProps {
  message: string
  type: undefined | boolean
  isOpenState: boolean
  handler: () => any
}

const {
  responseMessage,
  responseMessage__inner,
  _openMessage,
  _error,
  _success,
} = styles

export const ResponseMessage = ({
  message,
  type,
  isOpenState,
  handler,
}: IResponseMessageProps) => {
  return (
    <div
      className={setDynamicClasses({
        staticClasses: [responseMessage],
        dynamicClasses: [[_openMessage], [_success], [_error]],
        conditions: [isOpenState, type === true, type === false],
      })}
      onClick={handler}
    >
      <div className={responseMessage__inner}>{message}</div>
    </div>
  )
}
