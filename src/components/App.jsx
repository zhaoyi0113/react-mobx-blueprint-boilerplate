import React from 'react';
import { observer, inject } from 'mobx-react'
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import '../styles/global.scss';
import '@blueprintjs/table/dist/table.css';
import { Button, Menu, MenuItem, MenuDivider, Popover, Position, Dialog, Intent, EditableText, EditableCell, SelectionModes } from "@blueprintjs/core";
import { Table, Column, Cell } from '@blueprintjs/table';
import _ from 'lodash';

@inject('store') @observer
export default class App extends React.Component {

  componentDidMount() {
    let list = [];
    _.times(100000, () => {
      this.props.store.addTodo((0 | Math.random() * 9e6).toString(16));
    });

  }

  render() {
    const { todoList, searchText } = this.props.store;
    let list = todoList;
    if (searchText) {
      list = _.filter(todoList, (todo) => {
        return todo.indexOf(searchText) >= 0;
      });
    }
    const renderCell = (rowIndex) =>
      <Cell>
        {list[rowIndex]}
      </Cell>;
    return (
      <div>
        <div style={{
          textAlign: 'center'
        }}>
          <h1>React Mobx Blueprint Boilerplate</h1>
          <MenuBar />
        </div>
        <Table numRows={list.length} className='pt-dark'
          onSelection={(regions) => {
            if (regions[0].rows) {
              this.props.store.setSelectedTodo(list[regions[0].rows[0]]);
            }
          }}>
          <Column name='List' renderCell={renderCell} />
        </Table>
        <InputDialog ref={(r) => this.inputDialog = r} />
      </div>
    );
  }
}

@inject('store') @observer
class MenuBar extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <nav className="pt-navbar pt-dark .modifier">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">Todo List</div>
          <input className="pt-input" placeholder="Search files..." type="text" onChange={(e) => store.setSearchText(e.target.value)} />
        </div>
        <div className="pt-navbar-group pt-align-right">
          <MenuActions />
          <span className="pt-navbar-divider" />
        </div>
      </nav>
    );
  }
}

@inject('store') @observer
class MenuActions extends React.Component {

  render() {
    const menu = <Menu className="pt-dark">
      <MenuItem text="New Todo" onClick={() => this.props.store.openDialog()} />
      <MenuItem text="Delete" onClick={() => this.props.store.removeTodo(this.props.store.selected)} />
    </Menu>;
    return (
      <Popover content={menu} position={Position.BOTTOM_RIGHT}>
        <Button text="Actions" />
      </Popover>
    );
  }
}

@inject('store') @observer
class InputDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { store } = this.props;
    return (
      <Dialog
        iconName="inbox"
        isOpen={this.props.store.inputOpen}
        onClose={() => this.props.store.closeDialog()}
        title="Dialog header"
      >
        <div className="pt-dialog-body">
          <EditableText className="dialog_input pt-input" confirmOnEnterKey={true} value={this.state.value} onChange={(value) => this.setState({ value: value })} />
        </div>
        <div className="pt-dialog-footer">
          <div className="pt-dialog-footer-actions">
            <Button text="Cancel" onClick={() => store.closeDialog()} />
            <Button
              intent={Intent.PRIMARY}
              disabled={!this.state.value}
              onClick={() => {
                store.closeDialog();
                this.setState({ value: '' });
                store.addTodo(this.state.value);
              }}
              text="OK"
            />
          </div>
        </div>
      </Dialog>
    );
  }
}