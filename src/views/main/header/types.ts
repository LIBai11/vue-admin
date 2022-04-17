export interface ITab {
    name: string
    path: string
}

export interface ITabs {
    [index: number]: ITab
}

export type ITabAndTabs = ITab & ITabs
