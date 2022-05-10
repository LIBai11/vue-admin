//网站
import { websiteModule } from './website/website'
import { IWebsiteState, IWebsiteConfig } from './website/types'

export { IWebsiteState, IWebsiteConfig }
export { websiteModule }

//页面
import { IPageData, IUpdatePageParams } from './page/types'
import { pageModule } from './page/page'

export { IPageData, IUpdatePageParams }
export { pageModule }

//友链
import { ILinkRecordList, IQueryLinkParams, IUpdateLinkParams } from './link/types'
import { linkModule } from './link/link'

export { ILinkRecordList, IQueryLinkParams, IUpdateLinkParams }
export { linkModule }

//关于我
import { aboutModule } from './about/about'
