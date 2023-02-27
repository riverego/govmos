import { useState } from 'react'

import clsx from '#utils/clsx'

import Searchable from "#component/searchable"
import Button from '#component/button'

import s from './voting.module.css'

export default function Delegate({ data }) {
  return <Searchable data={data}>
    { filtered => (
      <div className={s['container']}>
        {data.length === 0 ? (
          <div className={s['no-result']}>Nothing to vote for yet</div>
        ) : filtered.length === 0 ? (
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

Delegate.url = '/mocks/voting.json'

const VOTES = [
  {
    val: 'yes',
    label: 'Yes',
    icon: 'check',
    color: 'var(--green)',
  },{
    val: 'abstain',
    label: 'Abstain',
    icon: 'more_horiz',
    color: '#aaa',
  },{
    val: 'no',
    label: 'No',
    icon: 'close',
    color: 'var(--red)',
  },{
    val: 'veto',
    label: 'Veto',
    icon: 'block',
    color: 'var(--red)',
    style: { marginLeft: '2em' },
  }
]

const STATUS = {
  voting: <div className={s['badge']} style={{ '--color': 'var(--green)'}}>Voting</div>,
  deposit: <div className={s['badge']} style={{ '--color': '#aaa'}}>Deposit</div>,
}

function Element({ element: el }) {
  const [ vote, setVote ] = useState(false)
  const voteInfos = vote && VOTES.find(({ val }) => val === vote)
  
  return <div className={clsx(s['entry'], vote && s['has-voted'])}>
    {vote && (
      <Button
        className={s['voted']}
        icon={voteInfos.icon}
        style={{ '--color': voteInfos.color }}
      />
    )}
    <div className={s['line']}>
      <a className={s['proposal']} href="https://hub.mintscan.io/chains/overview" target="_blank" rel="noopener noreferrer">#{el.id}</a>
      <div className={s['status']}>{STATUS[el.status]}</div>
    </div>
    <div className={s['line']}>
      <div className={s['title']}>{el.title}</div>
      <div className={s['deposit']}>Deposit {el.deposit}</div>
    </div>
    {el.status === 'voting' && !vote && (
      <div className={s['buttons']}>
        {VOTES.map(v => (
          <Button
            key={v.val}
            className={s['vote']}
            icon={v.icon}
            onClick={() => setVote(v.val)}
            style={{ '--color': v.color, ...v.style }}
            tooltip={v.label}
          />
        ))}
      </div>
    )}
  </div>
}