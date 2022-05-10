import LineEchart from './page-echarts/line-echart.vue'
import HeatMap from './page-echarts/heat-map.vue'
import BarEchart from './page-echarts/bar-echart.vue'
import PieEchart from './page-echarts/pie-echart.vue'
import MapEchart from './page-echarts/map-echart.vue'
import TagCloud from './page-echarts/tag-cloud.vue'
import ArticlesSearch from './articles/articles-search/articles-search.vue'
import ArticlesContent from './articles/articles-search/articles-content.vue'
import KxPagination from './articles/articles-search/kx-pagination.vue'
import CategoriesTable from './articles/articles-categories/categories-table.vue'
import TagsTable from './articles/articles-tags/tags-table.vue'
//评论相关
import MessageHeader from './message/message-header/message-header.vue'
import CommentContent from './message/comment-conent/comment-content.vue'
import WordsContent from './message/words-content/words-content.vue'
//用户相关
import UsersHeader from './users/users-header/users-header.vue'
//菜单
import PermissionHeader from './permission/permission-header/permission-header.vue'

export { LineEchart, HeatMap, BarEchart, PieEchart, MapEchart, TagCloud }
export { ArticlesSearch, ArticlesContent, KxPagination }
export { CategoriesTable, TagsTable }
//评论
export { MessageHeader, CommentContent, WordsContent }
//用户
export { UsersHeader }

//菜单
export { PermissionHeader }

//系统图片
import UploadImg from './system/upload-img.vue'
export { UploadImg }

//图片裁剪
import ImgCut from './img-cut/img-cut.vue'
export { ImgCut }
