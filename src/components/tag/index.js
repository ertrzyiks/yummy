import React from 'react'
import { Link } from 'gatsby'
import slugify from 'underscore.string/slugify'
import styles from './tag.module.css'

export default function Tag({name, className}) {
  return <Link to={`/tag/${slugify(name)}/`} className={className || styles.tag}>#{name}</Link>
}
