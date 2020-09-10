import ajax from './ajax'
import qs from 'qs'

// export const reqOneList = () => ajaxlist.get("/onelist");
// 获取资料列表
export const reqGetWikis = () => ajax.post('/wap/getWikis')
// 新增数据
export const reqAddWiki = (data) =>
  ajax.post('/wap/addWiki', qs.stringify(data))
// 更新数据
export const reqEditWiki = (fdata) =>
  ajax.post('/wap/editWiki', qs.stringify(fdata))
// 图片上传
export const reqUpload = (udata) => ajax.post('/wap/uploadImg', udata)
// 搜索
export const reqSerch = (sdata) => ajax.post('/wap/search', sdata)
// 刷新token、api/auth/getRefresh
export const refresh = Tdata => ajax.post('/auth/getRefresh',Tdata)