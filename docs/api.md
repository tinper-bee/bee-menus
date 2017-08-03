## Navbar

帮助用户依赖导航在各个页面中进行跳转。分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构

## 代码演示

### API

## Navbar

|参数|说明|类型|默认值|
|:---|:----|:---|:------|
|componentClass|自定义组件元素|element type|nav|
|expanded|设置导航条是否展开，针对小屏幕|bool|false|
|fixedBottom|设置固定在底部|bool|false|
|fixedTop|设置固定在顶部|bool|false|
|inverse|黑色背景|bool|false|
|onToggle|切换导航条显示隐藏 针对小屏幕|func|-|

## Navbar.Toggle

|参数|说明|类型|默认值|
|:---|:----|:---|:------|
|children|切换的文字或图标|element type|如例子|
|onClick|自定义方法|func|-|


## Menu

|参数|说明|类型|默认值|
|:---|:----|:---|:------|
|theme|主题颜色|String: light dark	light|
|mode|菜单类型，现在支持垂直、水平、和内嵌模式三种	|String: vertical horizontal inline|vertical|
|selectedKeys|当前选中的菜单项 key 数组|Array|-|	
|defaultSelectedKeys|初始选中的菜单项 key 数组|Array|-|	
|openKeys|当前展开的 SubMenu 菜单项 key 数组|Array|-|
|defaultOpenKeys|初始展开的 SubMenu 菜单项 key 数组|-|
|onOpenChange|SubMenu 展开/关闭的回调	Function(openKeys: string[])|noop|
|onSelect|被选中时调|	Function({ item, key, selectedKeys })|-|
|onDeselect|取消选中时调用，仅在 multiple 生效|	Function({ item, key, selectedKeys })|-|
|onClick|点击 menuitem 调用此函数，参数为 {item, key, keyPath}|	function|-|
|style|根节点样式	|Object|-|	

## Menu.Item

|参数|说明|类型|默认值|
|:---|:----|:---|:------|
|disabled|是否禁用|Boolean|false|
|key|item 的唯一标志|String|-|

##Menu.SubMenu

|参数|说明|类型|默认值|
|:---|:----|:---|:------|
|disabled|是否禁用|Boolean|false|
|key|唯一标志|String|	
|title|子菜单项值	|String or React.Element|
|children|子菜单的菜单项|(MenuItem or SubMenu)[]|
|onTitleClick|点击子菜单标题|Function({ eventKey, domEvent })|
|disabled|是否禁用|Boolean|false|
|key|item 的唯一标志|String|-|


