import clsx from '#utils/clsx'

import { ReactComponent as Twitter } from './twitter.svg'
import s from './icons.module.css'

export default function Icon({ name, className, color, children, style, ...p }) {
  let value = name || children
  
  const computedStyle = color ? { color, ...style } : style
  
  if (value === 'twitter') {
    value = <Twitter width="1em" />
  }
  return <i
    className={clsx(
      s['material-icons'],
      'icon',
      className
    )}
    style={computedStyle}
    {...p}
  >
    {value}
  </i>
}
