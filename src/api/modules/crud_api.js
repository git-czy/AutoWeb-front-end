import {request} from "@/api/service";

/**
 * @description 获取多个对象数据
 * @param url 接口url
 * @param params url参数
 */
async function ListFunc(url, params) {
  return await request({url: url, method: 'get', params: params})
}

/**
 * @description 获取单个对象数据
 * @param url 接口url
 * @param id 对象id
 */
async function GetFunc(url, id) {
  return await request({url: url + id, method: 'get',})
}

/**
 * @description 更新单个对象
 * @param url 接口url
 * @param id 对象id
 * @param data 更新数据
 */
async function UpdateFunc(url, id, data) {
  return await request({url: url + id, method: 'post', data: data})
}

/**
 * @description 删除单个对象
 * @param url 接口url
 * @param id 对象id
 */
async function DeleteFunc(url, id) {
  return await request({url: url + id, method: 'delete'})
}

/**
 * @description 添加单个对象
 * @param url 接口url
 * @param data 新增数据
 */
async function AddFunc(url, data) {
  return await request({url: url, method: 'put', data: data})
}


export const GetList = ListFunc
export const GetObj = GetFunc
export const UpdateObj = UpdateFunc
export const DeleteObj = DeleteFunc
export const AddObj = AddFunc
