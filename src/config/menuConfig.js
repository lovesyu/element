export const menuConfig =  [
    {
        icon: 'el-icon-s-tools',
        title: '系统管理',
        subs: [
            {
                index: '/department',
                title: '部门管理'
            },
            {
                index: '/employee',
                title: '员工管理'
            },
            {
                index: '/permission',
                title: '权限管理'
            },
            {
                index: '/role',
                title: '角色管理'
            }
        ]
    },
    {
        icon: 'el-icon-s-management',
        title: '数据管理',
        subs: [
            {
                index: '/sysdictionary',
                title: '字典目录'
            },
            {
                index: '/sysdictionaryitem',
                title: '字典明细'
            }
        ]
    },
    {
        icon: 'el-icon-service',
        title: '客户管理',
        subs: [
            {
                index: '/customerlist',
                title: '客户列表'
            },
            {
                index: '/pcustomerlist',
                title: '潜在客户'
            },
            {
                index: '/rpoolcustomer',
                title: '客户池'
            },
            {
                index: '/failcustomer',
                title: '失败客户'
            }
        ]
    },
    {
        icon: 'el-icon-s-custom',
        title: '客户历史',
        subs: [
            {
                index: '/customertracehistory',
                title: '跟进历史'
            }
        ]
    },
    {
        icon: 'el-icon-s-data',
        title: '报表统计',
        subs: [
            {
                index: '/customerreport',
                title: '潜在客户报表'
            }
        ]
    }
]