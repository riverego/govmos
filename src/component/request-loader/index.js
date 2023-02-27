import { Fragment } from 'react'
import useSWR from 'swr'

import OT from '#component/opacity-transition'
import clsx from '#utils/clsx'
import Button from '#component/button'

import s from './request.module.css'


export default function RequestLoader({ url, params, options, children }) {
  const { data, error, isLoading, mutate } = useSWR([url, params], fetcher, { refreshInterval: 30000, ...options })
  
  let child
  
  if (isLoading && !data && !error) child = <Spinner key="spinner" />
  else if (error) child = <Retry key="retry" error={error} retry={mutate} />
  else child = <Fragment key="child">{children(data)}</Fragment>
  
  return <OT>{child}</OT>
}

function Retry({ error, retry }) {
  return <div className={s['error']}>
    <div>Error on request</div>
    <div>{error.message}</div>
    <Button className={s['retry']} icon="restart_alt" onClick={() => retry()}>Retry</Button>
  </div>
}

function Spinner() {
  return <span className={clsx(s['spinner'], 'spinner')}>
    <span /><span /><span />
  </span>
}


function fetcher([_url, params]) {
  const options = {
    method: 'GET',
    cache: 'no-store',
  }
  let url = _url
  if (params) {
    try {
      const search = new URLSearchParams(Object.keys(params).map(k => {
        const v = params[k]
        if (typeof v === 'string') return [k,v]
        throw new Error(`[RequestLoader.fetcher] Unhandled param type (${typeof v}) for key ${k}`)
      }))
      url += '?' + search.toString()
    } catch (e) {console.log(e); throw e}
  }
  
  return fetch(url, options).then((res) => res.json())
}