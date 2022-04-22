export interface IPubState {
    tags: ITagState[]
    categories: ICategoryState[]
}
export interface ITagState {
    id?: number
    tagName?: string
}
export interface ICategoryState {
    id?: number
    categoryName: string
}
