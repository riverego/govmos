import s from './post-card.module.css'

export default function PostCard({ children }) {
  return <div className={s['card']}>
    {children}
  </div>
}