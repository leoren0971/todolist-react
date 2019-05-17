import React, { Component } from 'react';
import {
  List,
  Avatar,
  Skeleton
} from 'antd';

class ListItem extends Component {
  constructor (props) {
    super(props);

    this.finshedHandle = this.finshedHandle.bind(this);
    this.deleteHandle = this.deleteHandle.bind(this);
  }

  render () {
    return (
      <List.Item 
        actions={[
        <a onClick={this.finshedHandle}>Finshed</a>,
        <a onClick={this.deleteHandle} style={{color: 'red'}}>Delete</a>]}
      >
        <Skeleton avatar title={false} loading={false} active>
          <List.Item.Meta
            avatar={
              (
                this.props.item.isFinshed ? (
                  <Avatar 
                    icon="check-circle"
                    style={{color: '#cccccc', backgroundColor: '#ffffff'}}
                  />
                ) : (
                  <Avatar 
                    icon="clock-circle"
                    style={{color: '#ffffff', backgroundColor: '#87d068'}}
                  />
                )
              )
            }
            title={<a style={this.props.item.isFinshed ? {textDecoration:'line-through'} : {}}>{this.props.item.content}</a>}
          />
        </Skeleton>
      </List.Item>
    )
  }

  finshedHandle () {
    if (this.props.item.isFinshed) return;
    this.props.finshedHandle(this.props.item, this.props.index);
  }

  deleteHandle () {
    this.props.deleteHandle(this.props.item.isFinshed, this.props.index);
  }
}

export default ListItem;