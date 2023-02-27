import { useEffect, useState } from 'react'

import OT from '#component/opacity-transition'

import Splash from '#component/splash'


export default function App() {
  const [ Layout, setLayout ] = useState(null)
  
  useEffect(() => {
    Promise.all([
      import('#component/layout').then(r => r.default),
      new Promise(r => setTimeout(r,5500))
    ]).then(([ L ]) => setLayout(() => L))
  }, [])
  
  return <div>
    <OT duration="2s" initial={false}>
      {Layout ? <Layout key="layout" /> : <Splash key="splash" />}
    </OT>
  </div>
}