export interface IWebsiteConfig {
    websiteAvatar: string
    websiteName: string
    websiteAuthor: string
    websiteIntro: string
    websiteNotice: string
    websiteCreateTime: string
    websiteRecordNo: string
    socialLoginList: string[]
    socialUrlList: string[]
    qq: string
    github: string
    gitee: string
    touristAvatar: string
    userAvatar: string
    isCommentReview: number
    isMessageReview: number
    isEmailNotice: number
    isReward: number
    weiXinQRCode: string
    alipayQRCode: string
    isChatRoom: number
    websocketUrl: string
    isMusicPlayer: number
}

export interface IWebsiteState {
    data: IWebsiteConfig
}
