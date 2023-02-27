import clsx from '#utils/clsx'

import Icon from '#component/icon'

import s from './button.module.css'

export default function Button({ Component='button', icon, tooltip, className, children, label, ...p }) {
  const iconOnly = icon && !label && !children
  
  const content = label || children
  return <Component
    className={clsx(
      s['button'],
      'btn',
      className,
      iconOnly && s['btn-icon'],
      icon && !iconOnly && s['btn-with-icon'],
    )}
    {...p}
  >
    {icon && <Icon name={icon} />}
    {content && (
      typeof content === 'string' ? (
        <span>{content}</span>
      ) : (
        content
      )
    )}
    {tooltip && <span className={s['tooltip']}>{tooltip}</span>}
  </Component>
}