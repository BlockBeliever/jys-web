import { showImagePreview } from 'vant'
export function imagePreview(images: any, index: number = 0) {
  showImagePreview({
    images: images,
    startPosition: index,
  })
}