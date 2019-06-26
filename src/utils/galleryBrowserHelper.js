export function getPrevPhotoIndex(currentPhotoIndex, allImagesCount) {
  return currentPhotoIndex === 0 ? allImagesCount - 1 : currentPhotoIndex - 1
}

export function getNextPhotoIndex(currentPhotoIndex, allImagesCount) {
  return currentPhotoIndex === allImagesCount - 1 ? 0 : currentPhotoIndex + 1
}

export function getPrevImgUrl(currentPhotoIndex, imgSources) {
  if (imgSources.length < 2) {
    return undefined
  }

  return imgSources[getPrevPhotoIndex(currentPhotoIndex, imgSources.length)]
}

export function getNextImgUrl(currentPhotoIndex, imgSources) {
  if (imgSources.length < 2) {
    return undefined
  }

  return imgSources[getNextPhotoIndex(currentPhotoIndex, imgSources.length)]
}
