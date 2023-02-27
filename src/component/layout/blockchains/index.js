import clsx from '#utils/clsx'

import s from '../layout.module.css'

import CosmosImg from './cosmos.webp'
import AkashImg from './akash.webp'
import JunoImg from './juno.webp'
import OsmosisImg from './osmosis.webp'
import SecretImg from './secret.webp'

const LIST = [
  { id: 'cosmos', name: 'Cosmos Hub', icon: CosmosImg},
  { id: 'akash', name: 'Akash', icon: AkashImg},
  { id: 'juno', name: 'Juno', icon: JunoImg },
  { id: 'osmosis', name: 'Osmosis', icon: OsmosisImg},
  { id: 'secret', name: 'Secret', icon: SecretImg}
]

export const ImgById = LIST.reduce((o,el) => (o[el.id]=el.icon,o), {})

export default function BlockchainList({ active, onChange }) {
  return <div className={s['dropdown']}>
    {LIST.map(el => (
      <div
        key={el.id}
        className={clsx(s['bc-el'], active===el.id && 'active')}
        onMouseDown={() => onChange(el.id)}
      >
        <img src={el.icon} style={{ width: '1.5em', height: '1.5em' }} />
        <span>{el.name}</span>
      </div>
    ))}
  </div>
}