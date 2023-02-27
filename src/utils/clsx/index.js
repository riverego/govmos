import { forwardRef } from 'react'

export default function clsx(...classes) {
  return classes
    .filter(c => !!c)
    .map(c => {
      if (Array.isArray(c)) return clsx(...c)
      else if (typeof c === 'string') return c
      else throw new Error(`Unhandled clsx class type ${typeof c} (${JSON.stringify(c)})`)
    })
    .join(' ')
}

export function classNameExtender(BaseCompnent, baseClassName) {
  return forwardRef(function ExtendedClassName ({ className, ...props }, ref) {
    return <BaseCompnent ref={ref} className={clsx(className, baseClassName)} {...props} />
  })
}