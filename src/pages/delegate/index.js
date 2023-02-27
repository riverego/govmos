import { useState } from 'react'

import Searchable from "#component/searchable"
import Button from '#component/button'
import Icon from '#component/icon'

import s from './delegate.module.css'

export default function Delegate({ data }) {
  return <Searchable data={data}>
    { data => (
      <div className={s['container']}>
        {data.length === 0 ? (
          <div className={s['no-result']}>No matching results</div>
        ) : (
          data.map(el => (
            <Element key={el.id} element={el} />
          ))
        )}
      </div>
    )}
  </Searchable>
}

Delegate.url = '/mocks/deputies.json'


const SPLIT_TRIGGER = 170;

function Element({ element: el }) {
  const [ expanded, setExpand ] = useState(false)
  const [ delegated, setDelegated ] = useState(el.delegated)
  
  return <div className={s['entry']}>
    <header className={s['head']}>
      <div className={s['title']}>
        <div className={s['name']}>{el.name}</div>
        <div className={s['wallet']}>{el.wallet}</div>
        {(el.twitter || el.discord) && <div className={s['socials']}>
          {el.twitter && <Button Component="a" href={`https://www.twitter.com/${el.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className={s['social']} icon="twitter" />}
          {el.discord && <Button Component="a" href={`https://discord.gg/invite/${el.discord}`} target="_blank" rel="noopener noreferrer" className={s['social']} icon="discord" />}
        </div>}
      </div>
      {delegated ? (
        <Button onClick={() => setDelegated(false)} style={{ background: 'var(--red)', color: 'white' }}>UnDelegate</Button>
        ) : (
        <Button onClick={() => setDelegated(true)} style={{ background: 'var(--primary)', color: 'white' }}>Delegate</Button>
      )}
    </header>
    
    {el.description && (
      <div className={s['description']}>
        {expanded || el.description.length < SPLIT_TRIGGER ? (
          <>
            <p>{el.description}</p>
            {expanded && <a className={s['expand']} onClick={() => setExpand(false)}><Icon name="expand_less" /> Hide</a>}
          </>
        ) : (
          <>
            <p>{el.description.slice(0,SPLIT_TRIGGER - 20)}...</p>
            <a className={s['expand']} onClick={() => setExpand(true)}><Icon name="expand_more" /> See more</a>
          </>
        )}
      </div>
    )}
  </div>
}