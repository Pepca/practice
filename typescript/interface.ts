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
