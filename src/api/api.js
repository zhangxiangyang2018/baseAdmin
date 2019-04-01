let host //主体域名设置
if (process.env.NODE_ENV == 'development') {
	host = '/app_user/'
} else {
	host = '../app_user/'
}
export default {
	// 登陆
	user: {
		login: host + 'login', //  登陆
		exit: host + 'logout' // 退出
	},
	showMenu: {
		list: host + 'ctrl/menu/list'
	}, //不同用户登陆进来显示的菜单
	// 用户管理
	userManger: {
		getList: host + 'ctrl/user/list', // 用户管理列表获取
		del: host + 'ctrl/user/del', // 删除用户
		add: host + 'ctrl/user/add', // 新增用户
		edit: host + 'ctrl/user/edit', // 编辑获取当前编辑项信息
		update: host + 'ctrl/user/update' // 更新用户编辑
	},
	// 角色管理
	role: {
		rolelist: host + 'ctrl/role/list', //  角色列表获取
		add: host + 'ctrl/role/add', // 增加角色列表
		del: host + 'ctrl/role/del', // 删除角色
		edit: host + 'ctrl/role/edit',
		update: host + 'ctrl/role/update',
		grantPermis: host + 'ctrl/role/grantPermis', // 角色分配权限
		getUser: host + 'ctrl/role/getUser' //查看当前角色下所属用户
	},
	// 部门管理
	dept: {
		deptList: host + 'ctrl/dept/list', // 部门列表的获取
		child: host + 'ctrl/dept/child', //获取子部门
		add: host + 'ctrl/dept/add', // 新增子部们
		del: host + 'ctrl/dept/del', // 删除子部门
		edit: host + 'ctrl/dept/edit', //  获取部门详情
		update: host + 'ctrl/dept/update', // 部门更新操作
		getUser: host + 'ctrl/dept/getUser' // 查看当前部门下所属用户
	},
	// 权限管理
	authority: {
		list: host + 'ctrl/menu/permis/list', // 权限管理列表获取
		add: host + 'ctrl/permis/add', //  权限列表添加
		bymenu: host + 'ctrl/permis/bymenu', // 查询对应菜单下的权限
		del: host + 'ctrl/permis/del', //  权限删除
		edit: host + 'ctrl/permis/edit', //  权限编辑查出对应信息
		update: host + 'ctrl/permis/update' //权限编辑
	},
	meun: {
		list: host + 'ctrl/menu/permis/list', // 菜单列表获取
		add: host + 'ctrl/menu/add', // 添加菜单
		edit: host + 'ctrl/menu/edit', // 编辑带出当前项
		child: host + 'ctrl/menu/child', // 详情
		del: host + 'ctrl/menu/del', // 删除菜单
		update: host + 'ctrl/menu/update' //  菜单更新
	}
}
