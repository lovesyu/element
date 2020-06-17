import Vue from 'vue';
import VueRouter from 'vue-router';

const importFile = (path, pre = "views/") => () => import(`@/${pre}${path}`);

// 注册 vue-router
Vue.use(VueRouter);

const routes = [
    // 登录的路由配置
    {
        path: '/login',
        component: importFile('login/Login'), // @代表的是 src 目录
    },
    {
        path: '/home',
        component: importFile('home/Home'),
        children: [{
                path: '/department',
                meta: {
                    name: '部门管理',
                    index: '/department'
                },
                component: importFile('department/Department')
            },
            {
                path: '/permission',
                meta: {
                    name: '权限管理',
                    index: '/permission'
                },
                component: importFile('permission/Permission')
            },
            {
                path: '/employee',
                meta: {
                    name: '员工管理',
                    index: '/employee'
                },
                component: importFile('employees/Employees')
            },
            {
                path: '/employee/add',
                meta: {
                    name: '添加员工',
                    index: '/employee'
                },
                component: importFile('employees/children/AddEmployees')
            },
            {
                path: '/employee/edit/:eid',
                meta: {
                    name: '编辑员工',
                    index: '/employee'
                },
                component: importFile('employees/children/AddEmployees')
            },
            {
                path: '/role',
                meta: {
                    name: '角色管理',
                    index: '/role'
                },
                component: importFile('role/Role')
            },
            {
                path: '/role/add',
                meta: {
                    name: '角色添加',
                    index: '/role'
                },
                component: importFile('role/children/RoleDialog')
            },
            {
                path: '/role/edit/:roleId',
                meta: {
                    name: '角色编辑',
                    index: '/role'
                },
                component: importFile('role/children/RoleDialog')
            },
            {
                path: '/sysdictionary',
                meta: {
                    name: '字典目录',
                    index: '/sysdictionary'
                },
                component: importFile('sysdictionary/SysDictionary')
            },
            {

                path: '/sysdictionaryitem',
                meta: {
                    name: '字典目录明细',
                    index: '/sysdictionaryitem'
                },
                component: importFile('sysdictionaryitem/SysDictionaryItem')
            },
            {
                path: '/customerlist',
                meta: {
                    name: '客户列表',
                    index: '/customerlist'
                },
                component: importFile('customerlist/CustomerList')
            },
            {
                path: '/pcustomerlist',
                meta: {
                    name: '潜在客户',
                    index: '/pcustomerlist'
                },
                component: importFile('pcustomerlist/PcustomerList')
            },
            {
                path: '/rpoolcustomer',
                meta: {
                    name: '客户池',
                    index: '/rpoolcustomer'
                },
                component: importFile('rpoolcustomer/RPoolCustomer')
            },
            {
                path: '/failcustomer',
                meta: {
                    name: '失败客户',
                    index: '/failcustomer'
                },
                component: importFile('failcustomer/FailCustomer')
            },
            {
                path: '/customertracehistory',
                meta: {
                    name: '跟进历史',
                    index: '/customertracehistory'
                },
                component: importFile('customertracehistory/CustomerTraceHistory')
            },
            {
                path: '/customerreport',
                meta: {
                    name: '潜在客户报表',
                    index: '/customerreport'
                },
                component: importFile('report/Report')
            },
            {
                path: '/error',
                component: importFile('error/Error')
            }
        ]
    },
    {
        path: '/',
        redirect: '/department'
    }, {
        path: '*',
        redirect: '/error'
    }
]

// 实例化的是路由 VueRouter
const router = new VueRouter({
    routes,
})

// 路由守卫
// router.beforeEach((to, from, next) => {
//     if (!localStorage.getItem('token') && to.path !== ('/login')) {
//         next('/login')
//     } else if (localStorage.getItem('token') && to.path == ('/login')) {
//         next(from)
//     } else {
//         next();
//     }
// })


// 导出路由
export default router;