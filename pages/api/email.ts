import { IEndpoint, IResponseData } from '../../typescript/interface'

import validator from 'validator'

const handler: IEndpoint<IResponseData> = async (req, res) => {
  try {
    const { firstName, lastName, middleName, telephone, select, email } =
      JSON.parse(req.body)

    const isFields =
      firstName && lastName && middleName && telephone && select && email

    if (!isFields)
      throw new Error('Форма заполнена не корректно. Попробуйте снова!')

    if (!validator.isEmail(email))
      throw new Error(
        'Указанный email-адрес не прошел валидацию. Попробуй снова!'
      )

    setTimeout(() => {
      return res.status(200).json({
        success: true,
        data: null,
        message: 'Ваше сообщение будет рассмотрено в скором времени',
      })
    }, 2500)
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      data: null,
      message: err.message || 'Что-то пошло не так',
    })
  }
}

export default handler
