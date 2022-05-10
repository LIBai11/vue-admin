/**
 * 网站
 */
import { asyncGetWebsiteConfig, asyncUpdateWebsiteConfig } from './website/website'
export { asyncGetWebsiteConfig, asyncUpdateWebsiteConfig }

/**
 * 页面
 */
import { asyncGetPageList, asyncUpdatePage, asyncDeletePage } from './page/page'
export { asyncUpdatePage, asyncGetPageList, asyncDeletePage }

/**
 * 友链
 */
import { asyncDeleteLink, asyncGetLinkData, asyncUpdateLink } from './link/link'
export { asyncUpdateLink, asyncGetLinkData, asyncDeleteLink }

/**
 * 关于我
 */
import { asyncGetMineIntro, asyncUpdateMine } from './about/about'
export { asyncUpdateMine, asyncGetMineIntro }
