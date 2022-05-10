//相册
import {
    IImagesState,
    IImagesRecordList,
    IQueryImagesParams,
    IUpdateImagesParams,
} from './images/types'
import { imagesModule } from './images/images'

export { IImagesRecordList, IImagesState, IQueryImagesParams, IUpdateImagesParams }
export { imagesModule }

//照片
import {
    IPhotoRecordList,
    IAddPhotoParams,
    IEditPhotoParams,
    IDeletePhotoParams,
    IRemovePhotoParams,
    IQueryPhotoParams,
    IImagesInfoState,
} from './photo/types'
import { photoModule } from './photo/photo'
export {
    photoModule,
    IPhotoRecordList,
    IAddPhotoParams,
    IEditPhotoParams,
    IDeletePhotoParams,
    IRemovePhotoParams,
    IQueryPhotoParams,
    IImagesInfoState,
}

//回收站
import { recoveryModule } from './recovery/recovery'

export { recoveryModule }
