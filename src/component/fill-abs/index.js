import clsx from '#utils/clsx'

import s from './fill-abs.module.css'

export default function FillAbs({ children, className, style }) {
  return <div className={clsx(className, s['fill-abs'])} style={style}>
    {children}
  </div>
}