import { NextApiRequest, NextApiResponse } from 'next'

import type { TChildrenProp } from './type'

export interface IChildrenProps {
  children: TChildrenProp
}

export interface ISetStaticClasses {
  (classes: string[]): string
}

export interface ISetDynamicClasses {
  (args: {
    staticClasses: string[]
    dynamicClasses: string[][]
    conditions: boolean[]
  }): string
}

export interface IEndpoint<ResponseData> {
  (req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void>
}

export interface IGenericRequestFn {
  <ResponseData>(url: string, options?: RequestInit): Promise<ResponseData>
}

export type IResponseData<DataType = null> = {
  success: boolean
  data: DataType
  message: string
}

export interface IResponseMessageState {
  message: string
  type: undefined | boolean
  isOpen: boolean
}