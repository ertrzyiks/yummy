import React from 'react'
import { ReactComponent as Timer } from '../icons/timer.svg'
import styles from './time_to_prepare.module.sass'

export default function TimeToPrepare({children}) {
  return <span className={styles.time_box}><Timer className={styles.icon}/>{children}</span>
}
