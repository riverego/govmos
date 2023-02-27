import s from './toggle.module.css'

export default function Toggle({ value, onChange }) {
  return <label className={s['container']}>
    <span className={s['switch']}>
      <input
        type="checkbox"
        value={!!value}
        checked={!!value}
        onChange={() => onChange(!value)}
      />
      <span className={s['slider']}></span>
    </span>
  </label>
}