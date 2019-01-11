import React from 'react'
import Tag from '../tag'
import styles from './stackable_tag.module.css'

export default function StackableTag({name}) {
  return <Tag name={name} className={styles.tag} />
}