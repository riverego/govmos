import { useState } from 'react'

import Button from '#component/button'

import s from './profile.module.css'
import Toggle from './toggle.js'

export default function Profile({ data: initial }) {
  const [ form, _setForm ] = useState(initial)
  const [ saved, setSaved ] = useState(true)
  
  function setForm(h) {
    setSaved(false)
    _setForm(h)
  }
  
  function saveAction(e) {
    e.preventDefault()
    // TODO save action
    setSaved(true)
  }

  return <form className={s['container']} onSubmit={saveAction}>
    {[
      {
        type: 'fixed',
        label: 'Wallet address',
        value: initial.wallet,
      },{
        type: 'fixed',
        label: 'Wallet name',
        value: initial.walletName,
      },{
        field: "displayName",
        label: 'Display Name',
      },{
        field: "discord",
        label: 'Discord',
      },{
        field: "twitter",
        label: 'Twitter',
      },{
        field: "description",
        label: 'Description',
        type: 'textarea'
      },{
        field: "deputyRole",
        label: 'Deputy role',
        type: 'toggle'
      },
      !form.deputyRole && {
        type: 'fixed',
        label: 'Your deputy',
        value: initial.deputy || <span style={{ fontStyle: 'italic', color: '#aaa'}}>No deputy yet</span>,
      }
    ].map((el,i) => {
      if (!el) return null
      
      switch (el.type) {
        case 'fixed':
          return <div key={i} className={s['fixed']}>
            <span>{el.label}</span>
            <span>{el.value}</span>
          </div>
        case 'textarea':
          return <label key={i}>
            <span className={s['label']}>{el.label}</span>
            <textarea
              className={s['input']}
              value={form[el.field] || ''}
              onChange={e => setForm(v => ({ ...v, [el.field]: e.target.value }))}
              rows={(form[el.field]?.split('\n').length+1) || 2}
            />
          </label>
        case 'toggle': 
          return <div key={i} className={s['fixed']}>
          <span>{el.label}</span>
          <span><Toggle value={form[el.field]} onChange={val => setForm(v => ({ ...v, [el.field]: val }))} /></span>
        </div>
        default :
          return <label key={i}>
            <span className={s['label']}>{el.label}</span>
            <input
              className={s['input']}
              value={form[el.field] || ''}
              onChange={e => setForm(v => ({ ...v, [el.field]: e.target.value }))}
            />
          </label>
      }
    })}
    <div className={s['save-container']}>
      <Button
        className={s['save']}
        type="submit"
        icon={ saved ? 'done' : 'save'}
        style={{
          'background': saved ? 'var(--green)' : 'var(--primary)',
        }}
      >
          {saved ? 'Up to date' : 'Save'}
      </Button>
    </div>
  </form>
}

Profile.url = '/mocks/profile.json'
