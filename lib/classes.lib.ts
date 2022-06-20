import { ISetDynamicClasses, ISetStaticClasses } from '../typescript/interface'

export const setStaticClasses: ISetStaticClasses = (classes) =>
  classes.join(' ')

export const setDynamicClasses: ISetDynamicClasses = (args) => {
  const { staticClasses, dynamicClasses, conditions } = args

  let dynamic = ''

  if (dynamicClasses.length < 1) {
    if (conditions[0])
      return staticClasses.join(' ') + ' ' + dynamicClasses[0].join(' ')
  }

  for (let i = 0; i < dynamicClasses.length; i++) {
    if (conditions[i]) dynamic += ' ' + dynamicClasses[i].join(' ')
  }

  return staticClasses.join(' ') + dynamic
}
