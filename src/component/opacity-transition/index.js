import { Children, useRef, useState, useEffect } from 'react'

import FillAbs from '#component/fill-abs'

export default function OpacityTransition({ children, duration='.5s', initial=true }) {
  const prevChildren = useRef({})
  const [ cpt, setKey ] = useState(1)
  
  const currentChildren = {}
  const newChildren = []
  
  if (children.length > 0) console.warn(`[OpacityTransition] Many children may lead to inconsistent fadeout position`)
  
  Children.forEach(children, c => {
    if (!c.key) throw new Error('OpacityTransition children needs a key')
    
    if (prevChildren.current[c.key]) {
      currentChildren[c.key] = {
        ...prevChildren.current[c.key],
        opacity: 1,
        child: c,
      }
    } else if (currentChildren[c.key]) {
      console.warn(`[OpacityTransition] Duplicate child key ${c.key}, children ignored`)
    } else {
      const appear = cpt === 1 && initial || cpt > 1
      currentChildren[c.key] = {
        opacity: appear ? 0 : 1,
        child: c,
      }
      if (appear) newChildren.push(c.key)
    }
  })
  
  const removingChildren = {}
  for (const k of Object.keys(prevChildren.current)) {
    if (!currentChildren[k]) {
      removingChildren[k] = {
        ...prevChildren.current[k],
        opacity: 0,
      }
    }
  }
  
  if (Object.keys(removingChildren).length > 0) { 
    const match = duration.match(/^([0-9]*\.*[0-9])(s|ms)$/)
    if (!match) throw new Error('Duration must be <number>[s|ms]')
    
    const [,d,u] = match
    setTimeout(() => {
      for (const k of Object.keys(removingChildren)) {
        if (prevChildren.current[k]?.opacity === 0) {
          delete prevChildren.current[k]
          setKey(v => v+1)
        }
      }
    }, +d * (u==='s' ? 1000 : 1))
  }
  
  useEffect(() => {
    if (newChildren.length > 0 || cpt === 1) {
      for (const k of newChildren) {
        prevChildren.current[k].opacity = 1
      }
      setKey(v => v+1)
    }
  }, [ newChildren, cpt ])
  
  prevChildren.current = {...currentChildren, ...removingChildren }
  
  return <>
    {[
      ...Object.values(removingChildren).map(({ child }) => (
        <FillAbs
          key={child.key}
          style={{
            transition: 'opacity '+duration,
            overflow: 'hidden',
            opacity: 0,
          }}
        >
          {child}
        </FillAbs>
      )),
      ...Object.values(currentChildren).map(({ child, opacity }) => (
        <FillAbs
          key={child.key}
          style={{
            transition: 'opacity '+duration,
            overflow: 'auto',
            opacity,
          }}
        >
          {child}
        </FillAbs>
      ))
    ]}
  </>
}