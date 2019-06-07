import React from 'react'
import Img from 'gatsby-image'
import styles from './gallery.module.sass'

export default function Gallery({ images }) {
  if (!images || images.length === 0) {
    return null
  }

  const GalleryImages = images.map((img, ndx) => {
    return <Img
      fluid={img.childImageSharp.fluid}
      alt={'Picture of the dish'}
      className={styles.gallery_image}
      key={ndx}
    />
  })

  return (
    <div className={styles.gallery_container}>
      <h2 className={styles.gallery_header}>Galeria</h2>
      <div className={styles.gallery}>
        {GalleryImages}
      </div>
    </div>
  )
}