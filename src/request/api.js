import request from './request'

let preUrl = process.env.NODE_ENV == 'development' ? '/api' : '';

export const loginApi = (params) => request.post(`${preUrl}/tokens`, params)
export const departmentApi = (params) => request.get(`${preUrl}/departments`, {params}) // get 请求的数据要放在一个对象的 params 属性中


// 获取字典目录列表
export const GetSysApi = (params) => request.get(`${preUrl}/systemDictionaries`, {params})
// 添加字典目录列表
export const AddSysApi = (params) => request.post(`${preUrl}/systemDictionaries`, params)
// 编辑字典目录信息
export const EditSysApi = (params) => request.put(`${preUrl}/systemDictionaries/${params.id}`, params)


// 获取字典明细目录列表
export const GetSysItemApi = (params) => request.get(`${preUrl}/systemDictionaryItems`, {params})
// 添加字典明细
export const AddSysItemApi = (params) => request.post(`${preUrl}/systemDictionaryItems`, params)
// 编辑字典明细
export const EditSysItemApi = (params) => request.put(`${preUrl}/systemDictionaryItems/${params.id}`, params)


// 获取角色列表数据
export const GetRolesApi = (params) => request.get(`${preUrl}/roles`, {params})
// 获取单个角色信息
export const GetRoleApi = (params) => request.get(`${preUrl}/roles/${params.id}`)
// 添加角色列表
export const AddRoleApi = (params) => request.post(`${preUrl}/roles`, params)
// 修改角色列表
export const EditRoleApi = (params) => request.put(`${preUrl}/roles/${params.id}`, params)


// 获取权限列表数据
export const GetPermission = (params) => request.get(`${preUrl}/permissions`, {params})


// 获取部门列表数据
export const GetDepartmentApi = (params) => request.get(`${preUrl}/departments`, {params}) // get 请求的数据要放在一个对象的 params 属性中
// 添加部门信息
export const AddDepartmentApi = (params) => request.post(`${preUrl}/departments`, params)
// 编辑部门信息
export const EditDepartmentApi = (params) => request.put(`${preUrl}/departments/${params.id}`, params)
// 删除部门信息
export const DelDepartmentApi =(params) => request.delete(`${preUrl}/departments/${params.id}`, {})


// 获取员工列表数据
export const GetEmployeeApi = (params) => request.get(`${preUrl}/employees`, {params})
// 添加员工数据
export const AddEmployeeApi = (params) => request.post(`${preUrl}/employees`, params)
// 获取当个员工数据
export const GetEmployeeList = (params) => request.get(`${preUrl}/employees/${params.id}`, {})
// 编辑当个员工数据
export const EditEmployeeApi = (params) => request.put(`${preUrl}/employees/${params.id}`, params)
// 批量删除员工数据
export const DelMoreEmployApi = (params) => request.delete(`${preUrl}/employees`, {params})
// 导出员工信息
export const ExportEmployApi = `${preUrl}/employees/xlses`
// 删除员工信息
export const DelEmployApi = (params) => request.delete(`${preUrl}/employees/${params.id}`, {})


// 获取客户报表数据
export const GetReportsApi = (params) => request.get(`${preUrl}/customers/reports/list`, {params})
// 客户报表饼状图、条形图查询
export const GetReportsPieApi = (params) => request.get(`${preUrl}/customers/reports/pie`, {params})
// 客户报表数据查询
export const SearchReportApi = (params) => request.get(`${preUrl}/customers/reports/list`, {params})


// 获取权限列表数据
export const GetPermissionApi = (params) => request.get(`${preUrl}/permissions`, {params})
// 重新加载权限列表数据
export const OnloadPermissionApi = (params) => request.post(`${preUrl}/permissions`, params)
// 删除权限列表
export const DelPermissionApi = (params) => request.delete(`${preUrl}/permissions/${params.id}`, {})
