/**
 * 菜单控件
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { Menu, Icon, Layout } from 'antd';

import http from '../../axios/http';

import NotFound from './NotFound';

import MenuData from '../../route/menu';

const { Sider } = Layout;


class SiderMenu extends React.Component {

    state = {
        openKey: '',
        selectedKey: '',
        currentOpenKey: null,
        menus: '',
        collapsed: false
    };

    componentDidMount() {
        this.loadMenu();

        if (this.props.menuToggle !== undefined && this.props.menuToggle != null) {
            this.props.menuToggle(this.toggle);
        }
    }

    toggle = () => {
        let open = this.state.collapsed?this.state.currentOpenKey:null;
        this.setState({
            collapsed: !this.state.collapsed,
            openKey: open
        });
    }

    loadMenu = () => {
        http.post({
            url: '/auth/findMenu',
            success: (res) => {
                let firstMenuCode = "";
                let firstSelectCode = "";
                if (res != null && res.length > 0) {
                    if (res[0].subNode != null && res[0].subNode.length > 0) {
                        firstSelectCode = res[0]["subNode"][0]["code"];
                        firstMenuCode = res[0]["code"];
                    } else {
                        firstMenuCode = null;
                        firstSelectCode = res[0]["code"];
                    }
                }
                this.loadPage(firstSelectCode);
                this.setState({ menus: res, openKey: firstMenuCode, currentOpenKey: firstMenuCode, selectedKey: firstSelectCode });
            }
        });
    }

    menuClick = e => {
        this.loadPage(e.key);
        // let Dom = MenuData[e.key];
        // Dom = Dom === undefined || Dom == null ? NotFound : Dom["component"];
        // ReactDOM.render(<Dom />, document.getElementById('content-root'));
        // this.setState({
        //     selectedKey: e.key,
        //     currentOpenKey: this.state.openKey
        // });
    };

    loadPage = key =>{
        let Dom = MenuData[key];
        Dom = Dom === undefined || Dom == null || Dom["component"] === "" ? NotFound : Dom["component"];
        ReactDOM.render(<Dom />, document.getElementById('content-root'));
        this.setState({
            selectedKey: key,
            currentOpenKey: this.state.openKey
        });
    }

    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1]
        })
    };

    MenuDom = ({ menus, ...props }) => (
        <Menu {...props}>
            {menus && menus.map(item =>
                item.subNode ? this.subMenu(item) : this.menuItem(item)
            )}
        </Menu>
    )

    menuItem = item => {
        let icon = MenuData[item.code];
        icon = icon === undefined || icon == null ? null : icon["icon"];
        return (
            <Menu.Item key={item.code}>
                {icon && <Icon type={icon} />}
                <span className="nav-text">{item.name}</span>
            </Menu.Item>
        )
    };

    subMenu = item => {
        let icon = MenuData[item.code];
        icon = icon === undefined || icon == null ? null : icon["icon"];
        return (
            <Menu.SubMenu
                key={item.code}
                title={
                    <span>
                        {icon && <Icon type={icon} />}
                        <span className="nav-text">{item.name}</span>
                    </span>
                }
            >
                {item.subNode.map(item => this.menuItem(item))}
            </Menu.SubMenu>
        );
    }

    render() {
        const { menus, selectedKey, openKey, collapsed } = this.state;
        return (
            <Sider trigger={null} collapsible collapsed={collapsed} className="menu-container">
                <this.MenuDom
                    menus={menus}
                    mode="inline"
                    theme="dark"
                    onClick={this.menuClick}
                    openKeys={[openKey]}
                    selectedKeys={[selectedKey]}
                    onOpenChange={this.openMenu}
                />
            </Sider>
        );
    }
}

export default SiderMenu;