import { useState, useMemo } from 'react'

import clsx from '#utils/clsx'

import Icon from '#component/icon'

import s from './search.module.css'

let mem = ''
export default function Searchable({ data, children }) {
  const [ search, setSearch ] = useState(mem)
  
  const searchable = useMemo(() => {
    return data.map(el => ({
      ...el,
      searchable: ToSearchable(Object.values(el)
        .filter(v => typeof v === 'string')
        .join('_')
      )
    }))
  }, [ data ])
  
  const filtered = useMemo(() => {
    if (!search) return data
    
    const clean = ToSearchable(search)
    return searchable.filter(el => el.searchable.indexOf(clean) > -1)
  }, [ searchable, search ])
  
  const handleChange = e => {
    const v = e.target.value
    setSearch(v)
    mem=v
  }
  
  return <div className={s['container']}>
    <div className={s['search']}>
      <label className={clsx(s['label'], search && s['active'])}>
        <Icon className={s['search-icon']} name="search" />
        <input placeholder="Search" value={search} onChange={handleChange} />
      </label>
    </div>
    
    <div className={s['body']}>
      <div className={s['top-shadow']} />
      <div className={s['shadow-mask']} />
      {children(filtered)}
    </div>
  </div>
}

function ToSearchable(src) {
  return src.normalize("NFD")
    .toLowerCase()
    .replace(/[^\u0021-\u007E]/g, "")
}