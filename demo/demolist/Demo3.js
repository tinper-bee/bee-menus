/**
 * @title 竖向Menu基础样式
 * @description 子菜单竖向显示，可折叠。
 */

class Demo3 extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: 1
        }
    }

    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Menu onClick={this.handleClick.bind(this)} style={{ width: 240 }} defaultOpenKeys={['demo3sub1']} selectedKeys={[this.state.current]} mode="inline">
                <SubMenu key="demo3sub1" title={<span><span>组织 1</span></span>}>
                    <MenuItemGroup title="组 1">
                        <Menu.Item key="1">选项 1</Menu.Item>
                        <Menu.Item key="2">选项 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="组 2">
                        <Menu.Item key="3">选项 3</Menu.Item>
                        <Menu.Item key="4">选项 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <SubMenu key="demo3sub2" title={<span><span>组织 2</span></span>}>
                    <Menu.Item key="5">选项 5</Menu.Item>
                    <Menu.Item key="6">选项 6</Menu.Item>
                    <SubMenu key="demo3sub3" title="子项">
                        <Menu.Item key="7">选项 7</Menu.Item>
                        <Menu.Item key="8">选项 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="demo3sub4" title={<span><span>组织 3</span></span>}>
                    <Menu.Item key="9">选项 9</Menu.Item>
                    <Menu.Item key="10">选项 10</Menu.Item>
                    <Menu.Item key="11">选项 11</Menu.Item>
                    <Menu.Item key="12">选项 12</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}