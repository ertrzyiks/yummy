import React, { Component } from 'react'
import Img from 'gatsby-image'
import styles from './gallery.module.sass'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css';
import { getPrevImgUrl, getNextImgUrl, getPrevPhotoIndex, getNextPhotoIndex } from '../../utils/galleryBrowserHelper'

export default class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLightboxOpen: false,
      photoIndex: 0
    }
  }

  render() {
    const { images } = this.props
    const { isLightboxOpen, photoIndex } = this.state

    if (!images || images.length === 0) {
      return null
    }

    const GalleryImages = images.map((img, ndx) => {
      return (
        <button className={styles.image_wrapper} type="button" onClick={() => {
          this.setState({
            isLightboxOpen: true,
            photoIndex: ndx
          })
        }} key={ndx}>
          <Img
            fluid={img.childImageSharp.fluid}
            alt={'Picture of the dish'}
            className={styles.gallery_image}
            key={ndx}
          />
        </button>
      )
    })

    const imgSources = images.map(img => img.childImageSharp.fluid.src)

    return (
      <div className={styles.gallery_container}>
        <h2 className={styles.gallery_header}>Galeria</h2>
        <div className={styles.gallery}>
          {GalleryImages}
        </div>
        {isLightboxOpen &&
          <Lightbox
            mainSrc={imgSources[photoIndex]}
            prevSrc={getPrevImgUrl(photoIndex, imgSources)}
            nextSrc={getNextImgUrl(photoIndex, imgSources)}
            onCloseRequest={() => this.setState({ isLightboxOpen: false })}
            onMovePrevRequest={() => this.setState({
              photoIndex: getPrevPhotoIndex(photoIndex, imgSources.length)
            })}
            onMoveNextRequest={() => this.setState({
              photoIndex: getNextPhotoIndex(photoIndex, imgSources.length)
            })}
          />
        }
      </div>
    )
  }
}
