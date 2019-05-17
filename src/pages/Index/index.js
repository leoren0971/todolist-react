import React, { Component } from 'react';
import {
  Layout,
  Menu,
  Row,
  Col,
  Input,
  Button,
  List,
  message
} from 'antd';
import ListItem from './components/ListItem';
import './style.scss';
import * as common from './../../utils/common';

const { Header, Content, Footer } = Layout;

class Index extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: '',
      list: [],
      finishedList: [],
      initLoading: false,
      loadMore: false,

    }

    this.onChange = this.onChange.bind(this);
    this.addTodoHandle = this.addTodoHandle.bind(this);
    this.finshedHandle = this.finshedHandle.bind(this);
    this.deleteHandle = this.deleteHandle.bind(this);
  }

  componentDidMount () {
    let list = common.getStorage('wait-list');
    let finishedList = common.getStorage('fin-list');
    if (!list) list = [];
    if (!finishedList) finishedList = [];
    this.setState({ list, finishedList });
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            {/* <Menu.Item key="1">nav 1</Menu.Item> */}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Row>
            <Col><h2>添加任务清单</h2></Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Input value={this.state.value} onChange={this.onChange} placeholder="请输入要做的事" allowClear />
              <Button onClick={this.addTodoHandle} type="primary" block style={{ marginTop: '15px'}}>添加</Button>
            </Col>
            <Col span={16}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={this.state.list}
                renderItem={(item, index) => (
                  <ListItem
                    item={item}
                    index={index}
                    finshedHandle={this.finshedHandle}
                    deleteHandle={this.deleteHandle}
                  />
                )}
              />
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={this.state.finishedList}
                renderItem={(item, index) => (
                  <ListItem
                    item={item}
                    index={index}
                    finshedHandle={this.finshedHandle}
                    deleteHandle={this.deleteHandle}
                  />
                )}
              />
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ToDoList Plus</Footer>
      </Layout>
    )
  }

  onChange (e) {
    console.log(e.target);
    const { value } = e.target;
    this.setState({ value });
  }

  addTodoHandle (e) {
    const content = this.state.value;
    if (!content) {
      message.warning('输入不能为空！');
      return;
    }
    const list = this.state.list;
    list.unshift({ content });
    this.setState({
      list,
      value: ''
    });
    common.setStorage('wait-list', list);
  }

  finshedHandle (item, index) {
    console.log(item)
    const list = this.state.list;
    const finishedList = this.state.finishedList;
    const finItem = list[index];
    finItem.isFinshed = true;
    list.splice(index, 1);
    finishedList.unshift(finItem);
    this.setState({ list, finishedList });
    common.setStorage('wait-list', list);
    common.setStorage('fin-list', finishedList);
  }

  deleteHandle (isfinished, index) {
    console.log(index)
    const list = this.state.list;
    const finishedList = this.state.finishedList;
    if (!isfinished) {
      list.splice(index, 1);
      common.setStorage('wait-list', list);
    } else {
      finishedList.splice(index, 1);
      common.setStorage('fin-list', finishedList);
    }
    this.setState({
      list,
      finishedList
    });
  }
}
export default Index;