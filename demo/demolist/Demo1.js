/**
 * @title 横向Menu纯菜单导航
 * @description 更简洁，更方便
 */

class Demo1 extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: 'mail'
        }
    }

    handleClick(e) {
        this.setState({
            current: e.key,
        });
    }

    render() {
        console.log(Menu);
        return (
            <Menu onClick={this.handleClick.bind(this)}
                  selectedKeys={[this.state.current]}
                  mode="horizontal"
                >
                <Menu.Item key="mail">
                    组织 1
                </Menu.Item>
                <Menu.Item key="app" disabled>
                    组织 2
                </Menu.Item>
                <SubMenu title={<span>组织 1 - 子</span>}>
                    <MenuItemGroup title="组 1">
                        <Menu.Item key="setting:1">选项 1</Menu.Item>
                        <Menu.Item key="setting:2">选项 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="组 2">
                        <Menu.Item key="setting:3">选项 3</Menu.Item>
                        <Menu.Item key="setting:4">选项 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
        )
    }
}