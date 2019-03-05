import React from 'react'
import Timer from '../timer'
import styles from './time_to_prepare.module.sass'

export default function TimeToPrepare({children}) {
  return <span className={styles.time_box}><Timer className={styles.icon}/>{children}</span>
}
