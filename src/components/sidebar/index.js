import React from 'react'
import { ReactComponent as GreenLogo } from '../icons/logo_green.svg'
import TagCloud from '../tag_cloud'
import styles from './sidebar.module.sass'

export default function Sidebar({className}) {
  return <section className={className}>
    <GreenLogo className={styles.logo}/>
    <TagCloud />
  </section>
}
