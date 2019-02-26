import React from 'react'
import Timer from '../timer'
import styles from './time_to_prepare.module.sass'

export default function TimeToPrepare({children}) {
  return <span><Timer className={styles.icon}/>{children}</span>
}
