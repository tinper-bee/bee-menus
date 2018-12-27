import {Col, Row} from 'bee-layout';
import {Panel} from 'bee-panel';
import Button from 'bee-button';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo3 = require("./demolist/Demo3");var Demo4 = require("./demolist/Demo4");var DemoArray = [{"example":<Demo3 />,"title":" 竖向手风琴Menu","code":"/**\n * @title 竖向手风琴Menu\n * @description 菜单展开是手风琴形式。\n */\n\n\nimport React, { Component } from 'react';\nimport { Menu } from 'tinper-bee';\n\nconst SubMenu = Menu.SubMenu;\n\n\nclass Demo3 extends Component {\n    constructor(props, context) {\n        super(props, context);\n        this.state = {\n            current: '5',\n            openKeys: []\n        }\n    }\n    handleClick = (e) => {\n        console.log('Clicked: ', e);\n        this.setState({current: e.key});\n    }\n    onOpenChange = (openKeys) => {\n        const state = this.state;\n\n        const latestOpenKey = this.myfilter(openKeys,state.openKeys);\n        const latestCloseKey = this.myfilter(state.openKeys,openKeys);\n\n        let nextOpenKeys = [];\n        if (latestOpenKey) {\n            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);\n        }\n        if (latestCloseKey) {\n            nextOpenKeys = this.getAncestorKeys(latestCloseKey);\n        }\n        this.setState({openKeys: nextOpenKeys});\n    }\n\n    //IE下 array.find（）方法不可用\n    myfilter = (arr1,arr2) => {\n        if(arr2.length === 0 || !arr2) {\n            return arr1[0];\n        }\n\n        for(var i=0;i<arr1.length;i++)\n        {\n          if(arr2.indexOf(arr1[i].toString()) === -1)\n          {\n                return arr1[i];\n          }      \n        }\n        return false;\n    }\n\n    getAncestorKeys = (key) => {\n        const map = {\n            sub3: ['sub2'],\n        };\n        return map[key] || [];\n    }\n\n    render() {\n        return (\n            <div>\n                <input placeholder='123'/>\n                \n            <Menu\n                mode=\"inline\"\n                openKeys={this.state.openKeys}\n                selectedKeys={[this.state.current]}\n                style={{ width: 240 }}\n                onOpenChange={this.onOpenChange}\n                onClick={this.handleClick}>\n                <SubMenu key=\"sub1\" title={<span><span>组织 1</span></span>}>\n                    <Menu.Item key=\"1\" >选项 1</Menu.Item>\n                    <Menu.Item key=\"2\">选项 2</Menu.Item>\n                    <Menu.Item key=\"3\">选项 3</Menu.Item>\n                    <Menu.Item key=\"4\">选项 4</Menu.Item>\n                </SubMenu>\n                <SubMenu key=\"sub2\" title={<span><span>组织 2</span></span>}>\n                    <Menu.Item key=\"5\">选项 5</Menu.Item>\n                    <Menu.Item key=\"6\">选项 6</Menu.Item>\n                    <SubMenu key=\"sub3\" title=\"子项\">\n                        <Menu.Item key=\"7\">选项 7</Menu.Item>\n                        <Menu.Item key=\"8\">选项 8</Menu.Item>\n                    </SubMenu>\n                </SubMenu>\n                <SubMenu key=\"sub4\" title={<span><span>组织 3</span></span>}>\n                    <Menu.Item key=\"9\">选项 9</Menu.Item>\n                    <Menu.Item key=\"10\">选项 10</Menu.Item>\n                    <Menu.Item key=\"11\">选项 11</Menu.Item>\n                    <Menu.Item key=\"12\">选项 12</Menu.Item>\n                </SubMenu>\n            </Menu>\n            <input placeholder='456'/>\n            </div>\n            \n        )\n    }\n}\n\n","desc":" 菜单展开是手风琴形式。"},{"example":<Demo4 />,"title":" 子菜单呼出形式Menu","code":"/**\n * @title 子菜单呼出形式Menu\n * @description 子菜单在右侧呼出形式显示。\n */\n\nimport React, { Component } from 'react';\nimport { Menu } from 'tinper-bee';\n\nconst SubMenu = Menu.SubMenu;\nconst MenuItemGroup = Menu.ItemGroup;\n\n\n\nclass Demo4 extends Component {\n\n    handleClick = (e) => {\n        console.log('click', e);\n    }\n    render() {\n        return (\n            <div><input placeholder='123'/>\n                <Menu onClick={this.handleClick} style={{ width: 240 }} mode=\"vertical\">\n                <SubMenu key=\"sub1\" title={<span><span>组织 1</span></span>}>\n                    <MenuItemGroup title=\"Item 1\">\n                        <Menu.Item key=\"1\">选项 1</Menu.Item>\n                        <Menu.Item key=\"2\">选项 2</Menu.Item>\n                    </MenuItemGroup>\n                    <MenuItemGroup title=\"Iteom 2\">\n                        <Menu.Item key=\"3\">选项 3</Menu.Item>\n                        <Menu.Item key=\"4\">选项 4</Menu.Item>\n                    </MenuItemGroup>\n                </SubMenu>\n                <SubMenu key=\"sub2\" title={<span><span>组织 2</span></span>}>\n                    <Menu.Item key=\"5\">选项 5</Menu.Item>\n                    <Menu.Item key=\"6\">选项 6</Menu.Item>\n                    <SubMenu key=\"sub3\" title=\"Submenu\">\n                        <Menu.Item key=\"7\">选项 7</Menu.Item>\n                        <Menu.Item key=\"8\">选项 8</Menu.Item>\n                    </SubMenu>\n                </SubMenu>\n                <SubMenu key=\"sub4\" title={<span><span>组织 3</span></span>}>\n                    <Menu.Item key=\"9\">选项 9</Menu.Item>\n                    <Menu.Item key=\"10\">选项 10</Menu.Item>\n                    <Menu.Item key=\"11\">选项 11</Menu.Item>\n                    <Menu.Item key=\"12\">选项 12</Menu.Item>\n                </SubMenu>\n            </Menu>\n            <input placeholder='456'/>\n                </div>\n            \n        )\n    }\n}\n\n","desc":" 子菜单在右侧呼出形式显示。"}]


class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({open: !this.state.open})
    }

    render() {
        const {title, example, code, desc, scss_code} = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const header = (
            <div>
                {example}
                <Button style={{"marginTop": "10px"}} shape="block" onClick={this.handleClick}>
                    {caret}
                    {text}
                </Button>
            </div>
        );
        return (
            <Col md={12}>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Panel collapsible headerContent expanded={this.state.open} colors='bordered' header={header}
                       footerStyle={{padding: 0}}>
                    <pre><code className="hljs javascript">{code}</code></pre>
                    {!!scss_code ? <pre><code className="hljs css">{scss_code}</code></pre> : null}
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Row>
                {DemoArray.map((child, index) => {

                    return (
                        <Demo example={child.example} title={child.title} code={child.code} scss_code={child.scss_code}
                              desc={child.desc} key={index}/>
                    )

                })}
            </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
