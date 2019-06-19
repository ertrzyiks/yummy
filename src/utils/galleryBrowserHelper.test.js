import { getNextPhotoIndex, getPrevPhotoIndex, getNextImgUrl, getPrevImgUrl } from './galleryBrowserHelper'

describe('Gallery browser helper', () => {

  const multiPhotoGallery = [
    '/first/image/path.jpg',
    '/second/image/path.jpg',
    '/third/image/path.jpg'
  ]

  const singlePhotoGallery = [
    '/single/image/path.jpg'
  ]

  describe('getPrevPhotoIndex', () => {
    it('returns last image index if the current photo index is 0', () => {
      const result = getPrevPhotoIndex(0, 3)
      expect(result).toBe(2)
    })

    it('returns previous image index if the current photo index is other than 0', () => {
      const result = getPrevPhotoIndex(2, 3)
      expect(result).toBe(1)
    })
  })

  describe('getNextPhotoIndex', () => {
    it('returns first image index if the current photo is the last one', () => {
      const result = getNextPhotoIndex(2, 3)
      expect(result).toBe(0)
    })

    it('returns next image index if the current photo index is other than the last one', () => {
      const result = getNextPhotoIndex(1, 3)
      expect(result).toBe(2)
    })
  })

  describe('getPrevImgUrl', () => {
    it('returns undefined if there is only 1 photo in the gallery', () => {
      const result = getPrevImgUrl(0, singlePhotoGallery)
      expect(result).toBeUndefined()
    })

    it('returns the correct url of the previous image for multi-photo galleries', () => {
      const result = getPrevImgUrl(2, multiPhotoGallery)
      expect(result).toBe(multiPhotoGallery[1])
    })
  })

  describe('getNextImgUrl', () => {
    it('returns undefined if there is only 1 photo in the gallery', () => {
      const result = getNextImgUrl(0, singlePhotoGallery)
      expect(result).toBeUndefined()
    })

    it('returns the correct url of the next image for multi-photo galleries', () => {
      const result = getNextImgUrl(1, multiPhotoGallery)
      expect(result).toBe(multiPhotoGallery[2])
    })
  })
})