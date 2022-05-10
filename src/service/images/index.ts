//相册
import { asyncDeleteImages, asyncGetImagesList, asyncUpdateImages } from './images/images'

export { asyncUpdateImages, asyncGetImagesList, asyncDeleteImages }

//照片
import {
    asyncGetImagesInfo,
    asyncGetImagesPhoto,
    asyncAddPhoto,
    asyncEditPhoto,
    asyncDeletePhoto,
    asyncRemovePhoto,
    asyncDeleteDraftPhoto,
} from './photo/photo'

export {
    asyncGetImagesInfo,
    asyncGetImagesPhoto,
    asyncAddPhoto,
    asyncEditPhoto,
    asyncDeletePhoto,
    asyncRemovePhoto,
    asyncDeleteDraftPhoto,
}
