import React from 'react'
import { Link } from 'gatsby'
import slugify from 'underscore.string/slugify'
import titleize from 'underscore.string/titleize'
import {button as buttonClass} from '../../components/button/button.transparent.module.sass'

export default function Tag({name, className}) {
  const slug = slugify(name)
  const label = titleize(name)

  return <Link to={'/tag/' + slug} className={[buttonClass, className].join(' ')}>
    {label}
  </Link>
}
