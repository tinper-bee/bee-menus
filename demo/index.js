
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Menu from '../src/index';
import FormControl from 'bee-form-control';
import Badge from 'bee-badge';
import Icon from 'bee-icon';
import {MenuToggle,SideContainer} from '../src/ExportMenu';

import Navbar from 'bee-Navbar';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const NavItem = Navbar.NavItem;
const Header = Navbar.Header;
const Brand = Navbar.Brand;
const Collapse = Navbar.Collapse;
const Toggle = Navbar.Toggle;
const Nav = Navbar.Nav;


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


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
}/**
 * @title 竖向Menu基础样式
 * @description 子菜单竖向显示，可折叠。
 */

class Demo2 extends Component {
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
}/**
 * @title 竖向手风琴Menu
 * @description 菜单展开是手风琴形式。
 */

class Demo3 extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: '1',
            openKeys: []
        }
        this.myfilter = this.myfilter.bind(this);
    }
    handleClick(e) {
        console.log('Clicked: ', e);
        this.setState({current: e.key});
    }
    onOpenChange(openKeys) {
        const state = this.state;

        const latestOpenKey = this.myfilter(openKeys,state.openKeys);
        const latestCloseKey = this.myfilter(state.openKeys,openKeys);

         /*   const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
            const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));*/

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({openKeys: nextOpenKeys});
    }
    //IE下 array.find（）方法不可用
    myfilter(arr1,arr2) {
        if(arr2.length == 0 || !arr2) {
            return arr1[0];
        }

        for(var i=0;i<arr1.length;i++)
        {
          if(arr2.indexOf(arr1[i].toString())==-1)
          {
                return arr1[i];
          }      
        }
        return false;
    }
    getAncestorKeys(key) {
        const map = {
            sub3: ['sub2'],
        };
        return map[key] || [];
    }
    render() {
        return (
            <Menu mode="inline" openKeys={this.state.openKeys} selectedKeys={[this.state.current]} style={{ width: 240 }} onOpenChange={this.onOpenChange.bind(this)} style={{ width: 240 }}  onClick={this.handleClick.bind(this)}>
                <SubMenu key="sub1" title={<span><span>组织 1</span></span>}>
                    <Menu.Item key="1">选项 1</Menu.Item>
                    <Menu.Item key="2">选项 2</Menu.Item>
                    <Menu.Item key="3">选项 3</Menu.Item>
                    <Menu.Item key="4">选项 4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><span>组织 2</span></span>}>
                    <Menu.Item key="5">选项 5</Menu.Item>
                    <Menu.Item key="6">选项 6</Menu.Item>
                    <SubMenu key="sub3" title="子项">
                        <Menu.Item key="7">选项 7</Menu.Item>
                        <Menu.Item key="8">选项 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" title={<span><span>组织 3</span></span>}>
                    <Menu.Item key="9">选项 9</Menu.Item>
                    <Menu.Item key="10">选项 10</Menu.Item>
                    <Menu.Item key="11">选项 11</Menu.Item>
                    <Menu.Item key="12">选项 12</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}/**
 * @title 子菜单呼出形式Menu
 * @description 子菜单在右侧呼出形式显示。
 */

class Demo4 extends Component {

    handleClick() {
        console.log('click', e);
    }
    render() {
        return (
            <Menu onClick={this.handleClick.bind(this)} style={{ width: 240 }} mode="vertical">
                <SubMenu key="sub1" title={<span><span>组织 1</span></span>}>
                    <MenuItemGroup title="Item 1">
                        <Menu.Item key="1">选项 1</Menu.Item>
                        <Menu.Item key="2">选项 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Iteom 2">
                        <Menu.Item key="3">选项 3</Menu.Item>
                        <Menu.Item key="4">选项 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <SubMenu key="sub2" title={<span><span>组织 2</span></span>}>
                    <Menu.Item key="5">选项 5</Menu.Item>
                    <Menu.Item key="6">选项 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">选项 7</Menu.Item>
                        <Menu.Item key="8">选项 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" title={<span><span>组织 3</span></span>}>
                    <Menu.Item key="9">选项 9</Menu.Item>
                    <Menu.Item key="10">选项 10</Menu.Item>
                    <Menu.Item key="11">选项 11</Menu.Item>
                    <Menu.Item key="12">选项 12</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}/**
 * @title Navbar和Menus的组合
 * @description 示例采取navbar与menus的组合，达到一种PC端常用的复合导航菜单。导航添加了常用的搜索表单消息提醒等组件。
 * import FormControl from 'bee-form-control';
 * import Badge from 'bee-badge';
 * import Icon from 'bee-icon';
 * import {MenuToggle,SideContainer} from '../src/ExportMenu';
 * import Navbar from 'bee-Navbar';
 * const SubMenu = Menu.SubMenu;
 * const MenuItemGroup = Menu.ItemGroup;
 * const NavItem = Navbar.NavItem;
 * const Header = Navbar.Header;
 * const Brand = Navbar.Brand;
 * const Collapse = Navbar.Collapse;
 * const Toggle = Navbar.Toggle;
 * const Nav = Navbar.Nav;
 */


class Demo5 extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            expanded: false,
            current: 1
        }
    }

    onToggle(value) {
        this.setState({expanded: value});
    }

    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    }

    render() {
        return (
            <div id="demo5">
                <Navbar expanded={this.state.expanded} onToggle={this.onToggle.bind(this)}>
                    <MenuToggle show/>
                    <Header>
                        <Brand>
                            <a href="#"><img style={{width:140}} src="http://design.yyuap.com/logos/logox.png"/></a>
                        </Brand>
                    </Header>

                    <Nav pullRight>
                        <NavItem eventKey={1}><FormControl type="text" placeholder="Search"/></NavItem>
                        <NavItem eventKey={2}><Badge dataBadge="4" colors="warning"><Icon
                            type="uf-bell"></Icon></Badge></NavItem>
                        <NavItem eventKey={3}><Icon type="uf-bubble-o"></Icon></NavItem>
                        <Menu mode="horizontal" className="dropdown">
                            <SubMenu title={<span>刘认华<Icon type="uf-triangle-down"></Icon></span>}>
                                <Menu.Item key="setting:1">选项 1</Menu.Item>
                                <Menu.Item key="setting:2">选项 2</Menu.Item>
                                <Menu.Item key="setting:3">选项 3</Menu.Item>
                                <Menu.Item key="setting:4">选项 4</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Nav>
                </Navbar>
                <SideContainer onToggle={this.onToggle.bind(this)} expanded={this.state.expanded}>
                    <Menu onClick={this.handleClick.bind(this)}
                          style={{ width: 240 }}
                          defaultOpenKeys={['demo3sub1']}
                          selectedKeys={[this.state.current]}
                          mode="inline"
                        >
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
                </SideContainer>
            </div>
        )
    }
}var DemoArray = [{"example":<Demo1 />,"title":" 横向Menu纯菜单导航","code":"/**\n * @title 横向Menu纯菜单导航\n * @description 更简洁，更方便\n */\n\nclass Demo1 extends Component {\n    constructor(props, context) {\n        super(props, context);\n        this.state = {\n            current: 'mail'\n        }\n    }\n\n    handleClick(e) {\n        this.setState({\n            current: e.key,\n        });\n    }\n\n    render() {\n        console.log(Menu);\n        return (\n            <Menu onClick={this.handleClick.bind(this)}\n                  selectedKeys={[this.state.current]}\n                  mode=\"horizontal\"\n                >\n                <Menu.Item key=\"mail\">\n                    组织 1\n                </Menu.Item>\n                <Menu.Item key=\"app\" disabled>\n                    组织 2\n                </Menu.Item>\n                <SubMenu title={<span>组织 1 - 子</span>}>\n                    <MenuItemGroup title=\"组 1\">\n                        <Menu.Item key=\"setting:1\">选项 1</Menu.Item>\n                        <Menu.Item key=\"setting:2\">选项 2</Menu.Item>\n                    </MenuItemGroup>\n                    <MenuItemGroup title=\"组 2\">\n                        <Menu.Item key=\"setting:3\">选项 3</Menu.Item>\n                        <Menu.Item key=\"setting:4\">选项 4</Menu.Item>\n                    </MenuItemGroup>\n                </SubMenu>\n            </Menu>\n        )\n    }\n}","desc":" 更简洁，更方便"},{"example":<Demo2 />,"title":" 竖向Menu基础样式","code":"/**\n * @title 竖向Menu基础样式\n * @description 子菜单竖向显示，可折叠。\n */\n\nclass Demo2 extends Component {\n    constructor(props, context) {\n        super(props, context);\n        this.state = {\n            current: 1\n        }\n    }\n\n    handleClick(e) {\n        console.log('click ', e);\n        this.setState({\n            current: e.key,\n        });\n    }\n\n    render() {\n        return (\n            <Menu onClick={this.handleClick.bind(this)} style={{ width: 240 }} defaultOpenKeys={['demo3sub1']} selectedKeys={[this.state.current]} mode=\"inline\">\n                <SubMenu key=\"demo3sub1\" title={<span><span>组织 1</span></span>}>\n                    <MenuItemGroup title=\"组 1\">\n                        <Menu.Item key=\"1\">选项 1</Menu.Item>\n                        <Menu.Item key=\"2\">选项 2</Menu.Item>\n                    </MenuItemGroup>\n                    <MenuItemGroup title=\"组 2\">\n                        <Menu.Item key=\"3\">选项 3</Menu.Item>\n                        <Menu.Item key=\"4\">选项 4</Menu.Item>\n                    </MenuItemGroup>\n                </SubMenu>\n                <SubMenu key=\"demo3sub2\" title={<span><span>组织 2</span></span>}>\n                    <Menu.Item key=\"5\">选项 5</Menu.Item>\n                    <Menu.Item key=\"6\">选项 6</Menu.Item>\n                    <SubMenu key=\"demo3sub3\" title=\"子项\">\n                        <Menu.Item key=\"7\">选项 7</Menu.Item>\n                        <Menu.Item key=\"8\">选项 8</Menu.Item>\n                    </SubMenu>\n                </SubMenu>\n                <SubMenu key=\"demo3sub4\" title={<span><span>组织 3</span></span>}>\n                    <Menu.Item key=\"9\">选项 9</Menu.Item>\n                    <Menu.Item key=\"10\">选项 10</Menu.Item>\n                    <Menu.Item key=\"11\">选项 11</Menu.Item>\n                    <Menu.Item key=\"12\">选项 12</Menu.Item>\n                </SubMenu>\n            </Menu>\n        )\n    }\n}","desc":" 子菜单竖向显示，可折叠。"},{"example":<Demo3 />,"title":" 竖向手风琴Menu","code":"/**\n * @title 竖向手风琴Menu\n * @description 菜单展开是手风琴形式。\n */\n\nclass Demo3 extends Component {\n    constructor(props, context) {\n        super(props, context);\n        this.state = {\n            current: '1',\n            openKeys: []\n        }\n        this.myfilter = this.myfilter.bind(this);\n    }\n    handleClick(e) {\n        console.log('Clicked: ', e);\n        this.setState({current: e.key});\n    }\n    onOpenChange(openKeys) {\n        const state = this.state;\n\n        const latestOpenKey = this.myfilter(openKeys,state.openKeys);\n        const latestCloseKey = this.myfilter(state.openKeys,openKeys);\n\n         /*   const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));\n            const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));*/\n\n        let nextOpenKeys = [];\n        if (latestOpenKey) {\n            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);\n        }\n        if (latestCloseKey) {\n            nextOpenKeys = this.getAncestorKeys(latestCloseKey);\n        }\n        this.setState({openKeys: nextOpenKeys});\n    }\n    //IE下 array.find（）方法不可用\n    myfilter(arr1,arr2) {\n        if(arr2.length == 0 || !arr2) {\n            return arr1[0];\n        }\n\n        for(var i=0;i<arr1.length;i++)\n        {\n          if(arr2.indexOf(arr1[i].toString())==-1)\n          {\n                return arr1[i];\n          }      \n        }\n        return false;\n    }\n    getAncestorKeys(key) {\n        const map = {\n            sub3: ['sub2'],\n        };\n        return map[key] || [];\n    }\n    render() {\n        return (\n            <Menu mode=\"inline\" openKeys={this.state.openKeys} selectedKeys={[this.state.current]} style={{ width: 240 }} onOpenChange={this.onOpenChange.bind(this)} style={{ width: 240 }}  onClick={this.handleClick.bind(this)}>\n                <SubMenu key=\"sub1\" title={<span><span>组织 1</span></span>}>\n                    <Menu.Item key=\"1\">选项 1</Menu.Item>\n                    <Menu.Item key=\"2\">选项 2</Menu.Item>\n                    <Menu.Item key=\"3\">选项 3</Menu.Item>\n                    <Menu.Item key=\"4\">选项 4</Menu.Item>\n                </SubMenu>\n                <SubMenu key=\"sub2\" title={<span><span>组织 2</span></span>}>\n                    <Menu.Item key=\"5\">选项 5</Menu.Item>\n                    <Menu.Item key=\"6\">选项 6</Menu.Item>\n                    <SubMenu key=\"sub3\" title=\"子项\">\n                        <Menu.Item key=\"7\">选项 7</Menu.Item>\n                        <Menu.Item key=\"8\">选项 8</Menu.Item>\n                    </SubMenu>\n                </SubMenu>\n                <SubMenu key=\"sub4\" title={<span><span>组织 3</span></span>}>\n                    <Menu.Item key=\"9\">选项 9</Menu.Item>\n                    <Menu.Item key=\"10\">选项 10</Menu.Item>\n                    <Menu.Item key=\"11\">选项 11</Menu.Item>\n                    <Menu.Item key=\"12\">选项 12</Menu.Item>\n                </SubMenu>\n            </Menu>\n        )\n    }\n}","desc":" 菜单展开是手风琴形式。"},{"example":<Demo4 />,"title":" 子菜单呼出形式Menu","code":"/**\n * @title 子菜单呼出形式Menu\n * @description 子菜单在右侧呼出形式显示。\n */\n\nclass Demo4 extends Component {\n\n    handleClick() {\n        console.log('click', e);\n    }\n    render() {\n        return (\n            <Menu onClick={this.handleClick.bind(this)} style={{ width: 240 }} mode=\"vertical\">\n                <SubMenu key=\"sub1\" title={<span><span>组织 1</span></span>}>\n                    <MenuItemGroup title=\"Item 1\">\n                        <Menu.Item key=\"1\">选项 1</Menu.Item>\n                        <Menu.Item key=\"2\">选项 2</Menu.Item>\n                    </MenuItemGroup>\n                    <MenuItemGroup title=\"Iteom 2\">\n                        <Menu.Item key=\"3\">选项 3</Menu.Item>\n                        <Menu.Item key=\"4\">选项 4</Menu.Item>\n                    </MenuItemGroup>\n                </SubMenu>\n                <SubMenu key=\"sub2\" title={<span><span>组织 2</span></span>}>\n                    <Menu.Item key=\"5\">选项 5</Menu.Item>\n                    <Menu.Item key=\"6\">选项 6</Menu.Item>\n                    <SubMenu key=\"sub3\" title=\"Submenu\">\n                        <Menu.Item key=\"7\">选项 7</Menu.Item>\n                        <Menu.Item key=\"8\">选项 8</Menu.Item>\n                    </SubMenu>\n                </SubMenu>\n                <SubMenu key=\"sub4\" title={<span><span>组织 3</span></span>}>\n                    <Menu.Item key=\"9\">选项 9</Menu.Item>\n                    <Menu.Item key=\"10\">选项 10</Menu.Item>\n                    <Menu.Item key=\"11\">选项 11</Menu.Item>\n                    <Menu.Item key=\"12\">选项 12</Menu.Item>\n                </SubMenu>\n            </Menu>\n        )\n    }\n}","desc":" 子菜单在右侧呼出形式显示。"},{"example":<Demo5 />,"title":" Navbar和Menus的组合","code":"/**\n * @title Navbar和Menus的组合\n * @description 示例采取navbar与menus的组合，达到一种PC端常用的复合导航菜单。导航添加了常用的搜索表单消息提醒等组件。\n * import FormControl from 'bee-form-control';\n * import Badge from 'bee-badge';\n * import Icon from 'bee-icon';\n * import {MenuToggle,SideContainer} from '../src/ExportMenu';\n * import Navbar from 'bee-Navbar';\n * const SubMenu = Menu.SubMenu;\n * const MenuItemGroup = Menu.ItemGroup;\n * const NavItem = Navbar.NavItem;\n * const Header = Navbar.Header;\n * const Brand = Navbar.Brand;\n * const Collapse = Navbar.Collapse;\n * const Toggle = Navbar.Toggle;\n * const Nav = Navbar.Nav;\n */\n\n\nclass Demo5 extends Component {\n    constructor(props, context) {\n        super(props, context);\n        this.state = {\n            expanded: false,\n            current: 1\n        }\n    }\n\n    onToggle(value) {\n        this.setState({expanded: value});\n    }\n\n    handleClick(e) {\n        console.log('click ', e);\n        this.setState({\n            current: e.key\n        });\n    }\n\n    render() {\n        return (\n            <div id=\"demo5\">\n                <Navbar expanded={this.state.expanded} onToggle={this.onToggle.bind(this)}>\n                    <MenuToggle show/>\n                    <Header>\n                        <Brand>\n                            <a href=\"#\"><img style={{width:140}} src=\"http://design.yyuap.com/logos/logox.png\"/></a>\n                        </Brand>\n                    </Header>\n\n                    <Nav pullRight>\n                        <NavItem eventKey={1}><FormControl type=\"text\" placeholder=\"Search\"/></NavItem>\n                        <NavItem eventKey={2}><Badge dataBadge=\"4\" colors=\"warning\"><Icon\n                            type=\"uf-bell\"></Icon></Badge></NavItem>\n                        <NavItem eventKey={3}><Icon type=\"uf-bubble-o\"></Icon></NavItem>\n                        <Menu mode=\"horizontal\" className=\"dropdown\">\n                            <SubMenu title={<span>刘认华<Icon type=\"uf-triangle-down\"></Icon></span>}>\n                                <Menu.Item key=\"setting:1\">选项 1</Menu.Item>\n                                <Menu.Item key=\"setting:2\">选项 2</Menu.Item>\n                                <Menu.Item key=\"setting:3\">选项 3</Menu.Item>\n                                <Menu.Item key=\"setting:4\">选项 4</Menu.Item>\n                            </SubMenu>\n                        </Menu>\n                    </Nav>\n                </Navbar>\n                <SideContainer onToggle={this.onToggle.bind(this)} expanded={this.state.expanded}>\n                    <Menu onClick={this.handleClick.bind(this)}\n                          style={{ width: 240 }}\n                          defaultOpenKeys={['demo3sub1']}\n                          selectedKeys={[this.state.current]}\n                          mode=\"inline\"\n                        >\n                        <SubMenu key=\"demo3sub1\" title={<span><span>组织 1</span></span>}>\n                            <MenuItemGroup title=\"组 1\">\n                                <Menu.Item key=\"1\">选项 1</Menu.Item>\n                                <Menu.Item key=\"2\">选项 2</Menu.Item>\n                            </MenuItemGroup>\n                            <MenuItemGroup title=\"组 2\">\n                                <Menu.Item key=\"3\">选项 3</Menu.Item>\n                                <Menu.Item key=\"4\">选项 4</Menu.Item>\n                            </MenuItemGroup>\n                        </SubMenu>\n                        <SubMenu key=\"demo3sub2\" title={<span><span>组织 2</span></span>}>\n                            <Menu.Item key=\"5\">选项 5</Menu.Item>\n                            <Menu.Item key=\"6\">选项 6</Menu.Item>\n                            <SubMenu key=\"demo3sub3\" title=\"子项\">\n                                <Menu.Item key=\"7\">选项 7</Menu.Item>\n                                <Menu.Item key=\"8\">选项 8</Menu.Item>\n                            </SubMenu>\n                        </SubMenu>\n                        <SubMenu key=\"demo3sub4\" title={<span><span>组织 3</span></span>}>\n                            <Menu.Item key=\"9\">选项 9</Menu.Item>\n                            <Menu.Item key=\"10\">选项 10</Menu.Item>\n                            <Menu.Item key=\"11\">选项 11</Menu.Item>\n                            <Menu.Item key=\"12\">选项 12</Menu.Item>\n                        </SubMenu>\n                    </Menu>\n                </SideContainer>\n            </div>\n        )\n    }\n}","desc":" 示例采取navbar与menus的组合，达到一种PC端常用的复合导航菜单。导航添加了常用的搜索表单消息提醒等组件。"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        return (
            <Col md={12}>
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0,borderColor: "transparent"}} >
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
