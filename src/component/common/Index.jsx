/**
 * 页面布局界面
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Icon, Menu } from 'antd';

import "../../style/common/index.css";

import Login from "./Login";

import SiderMenu from './SiderMenu';

import http from '../../axios/http';

import UserPassword from '../console/user/UserPassword';
import Theme from './Theme';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Header, Content } = Layout;

class Index extends React.Component {
  state = {
    collapsed: false,
    visible: false,
    themeVisible: false,
    menuToggle: '',
    userInfo: {}
  };

  componentDidMount() {
    //加载用户信息
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    http.post({
      url: '/auth/findUserInfo',
      success: (res) => {
        this.setState({ userInfo: res });
      }
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    this.state.menuToggle();
  }

  //退出登录
  logout = () => {
    http.post({
      url: '/logout',
      success: (res) => {
        sessionStorage.setItem("loginStatus", "false");
        ReactDOM.render(<Login />, document.getElementById('root'));
      }
    });
  }


  //修改密码
  changePassword = () => {
    this.showModal();
  }

  //点击触发
  handleClick = e => {
    if (e.key === "logout") {
      this.logout();
    } else if (e.key === "changePasswd") {
      this.changePassword();
    } else if (e.key === "setting") {
      this.showModalTheme();
    }
  }

  showModal = () => {
    this.setState({ visible: true });
  };
  hiddenModal = () => {
    this.setState({ visible: false });
  };
  showModalTheme = () => {
    this.setState({ themeVisible: true });
  };
  hiddenModalTheme = () => {
    this.setState({ themeVisible: false });
  };

  render() {
    return (
      <Layout className="layout-container">
        <Header >
          <div className={this.state.collapsed ? 'logo-min' : 'logo'} />
          <div style={{ float: "left" }} >
            <Icon className="menu-trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle} />
          </div>
          <div style={{ float: "right", height: '100%' }}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={null}
              mode="horizontal"
              className="header-menu"
              theme="light"
            >
              <SubMenu title={<span className="submenu-title-wrapper"><Icon type="user" />{this.state.userInfo.username}</span>}>
                <MenuItemGroup title="用户中心">
                  <Menu.Item key="userInfo">个人信息</Menu.Item>
                  <Menu.Item key="changePasswd">修改密码</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="设置中心">
                  <Menu.Item key="setting">个性设置</Menu.Item>
                </MenuItemGroup>
              </SubMenu>
              <Menu.Item key="logout" className="ant-menu-item-selected">
                <Icon type="logout" />退出
              </Menu.Item>
            </Menu>
            {/* 密码修改 */}
            <UserPassword
              visible={this.state.visible}
              onCancel={this.hiddenModal.bind(this)}
              editData={this.state.editData}
              successCallback={this.logout}
            />
            {/* 主题设置 */}
            <Theme
              visible={this.state.themeVisible}
              onCancel={this.hiddenModalTheme.bind(this)}
            />
          </div>
        </Header>
        <Layout>
          <SiderMenu menuToggle={(func) => { this.setState({ menuToggle: func }) }} />
          <Layout>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }} id="content-root"></Content>
            <Layout.Footer style={{ textAlign: 'center', paddingTop: '0px' }}>
              版权所有 © 2019-{new Date().getFullYear()} 
            </Layout.Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Index;