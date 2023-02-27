import { useState, useEffect } from 'react'

import clsx from '#utils/clsx'

import { GOV, MOS } from '#component/logo'
import RequestLoader from '#component/request-loader'
import Button from '#component/button'
import OT from '#component/opacity-transition'
import Icon from '#component/icon'
import FillAbs from '#component/fill-abs'

import PageVoting from '#pages/voting'
import PageDelegate from '#pages/delegate'
import PageProfile from '#pages/profile'

import BlockchainList, { ImgById } from './blockchains/index.js'
import s from './layout.module.css'

const PAGES = {
  '#vote': PageVoting,
  '#delegate': PageDelegate,
  '#profile': PageProfile,
}

export default function Layout() {
  const [ Page, setPage ] = useState()
  const [ walletInfos, setWalletInfos ] = useState()
  
  useEffect(() => {
    const pageChange =  () => {
      const page = window.location.hash
      if (!PAGES[page]) window.location.replace('#vote')
      else setPage(() => PAGES[page])
    }
    
    window.addEventListener('hashchange', pageChange)
    pageChange()
        
    return () => {
      window.removeEventListener('hashchange', pageChange)
    }
  }, [ setPage ])
  
  
  return <FillAbs className={clsx(s['container'])}>
    <nav className={s['nav']}>
      <div className={s['logo']}>
        <GOV className={s['gov']} />
        <hr />
        <MOS className={s['mos']} />
      </div>
      <div className={s['right']}>
        <NavLink to="#delegate">Delegate</NavLink>
        <NavLink to="#vote">Vote</NavLink>
        <NavLink to="#profile">Profile</NavLink>
        <div className={s['wallet']}>
          {walletInfos ? (
            <>
              <div className={s['dropdown-wrapper']}>
                <Button className={s['dd-btn']}>
                  <img src={ImgById[walletInfos.network]} style={{ width: '1.5em', height: '1.5em' }} />
                  <span>{walletInfos.walletId.slice(0,8)+'...'+walletInfos.walletId.slice(-3)}</span>
                  <Icon name="arrow_drop_down" />
                </Button>
                <BlockchainList active={walletInfos.walletId} onChange={v => setWalletInfos(old => ({...old, network: v }))}/>
              </div>
              <Button icon="power_settings_new" onClick={() => setWalletInfos(null)} />
            </>
          ) : (
            <Button icon="login" onClick={() => setWalletInfos({ walletId: 'osmo:sdfdsfzdrf56s4f65s4f56s1', network: 'osmosis' })}>Connect</Button>
          )}
        </div>
      </div>
    </nav>
    <div className={s['page']}>
      {Page && (
        <OT>
          <RequestLoader key={Page.url} url={Page.url} params={ walletInfos }>
            { (data, refresh) => <Page data={data} refresh={refresh} />}
          </RequestLoader>
        </OT>
      )}
    </div>
    
    <div className={s['slot']} />
    <div className={s['slot-shadow']} />
    <div className={s['footer']}>
      <div className={s['credits']}>Nuxian Labs Vote Delegator</div>
      <div className={s['mobile-nav']}>
        <NavLink to="#delegate"><Icon name="language" /></NavLink>
        <NavLink to="#vote"><Icon name="mail_outline" /></NavLink>
        <NavLink to="#profile"><Icon name="person" /></NavLink>
      </div>
    </div> 
  </FillAbs>
}


function NavLink({ to, children }) {
  const active = window.location.hash
  
  return <a href={to} className={clsx(s['nav-link'], active === to && 'active')}>{children}</a>
}
