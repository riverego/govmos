import FillAbs from '#component/fill-abs'

import { GOV, MOS } from '#component/logo'

import s from './splash.module.css'

export default function Splash() {
  return <FillAbs className={s['container']}>
    <div className={s['card-container']}>
      <div className={s['card']}>
        <GOV className={s['gov']} />
        <MOS className={s['mos']} />
      </div>
      <div className={s['slot']} />
      <div className={s['slot-shadow']} />
    </div>
    <div className={s['boxes']}>
      <div className={s['check']}>✔</div>
    </div>
    <div className={s['punchline']}>Blockchain voting made right</div>
  </FillAbs>
}