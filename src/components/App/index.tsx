import React from 'react';
import StyledUser from '../SelectedUser'
import { Table, Input } from 'antd';
import styled from '@emotion/styled'
import { DataStore, TData } from '../../stores/DataStore';
import { inject, observer } from 'mobx-react';
import Dashboard from '../Dashboard';
import Search from '../Search';

const Root = styled.div`
padding: 60px;
`

const columns = [
  {
    title: "id", dataIndex: 'id', key: 'id', defaultSortOrder: 'descend' as 'descend',
    sorter: (a: TData, b: TData) => a.id - b.id
  },
  {
    title: "firstName", dataIndex: 'firstName', key: 'firstName', sorter: (a: TData, b: TData) => a.firstName.length - b.firstName.length
  },
  {
    title: "lastName", dataIndex: 'lastName', key: 'lastName', sorter: (a: TData, b: TData) => a.lastName.length - b.lastName.length
  },
  {
    title: "email", dataIndex: 'email', key: 'email'
  },
  {
    title: "phone", dataIndex: 'phone', key: 'phone', sorter: (a: TData, b: TData) => a.phone.length - b.phone.length
  },
  // { title: "address", dataIndex: 'address', key: 'address', render: ({ streetAddress, city, state, zip }: TAddress) => <a>{streetAddress + ' ' + city  + ' ' + state + ' ' + zip}</a> },
  // {
  //   title: "description", dataIndex: 'description', key: 'description'
  // },
  // {
  //   title: 'Name', dataIndex: 'name', key: 'name',
  //   sorter: (a: any, b: any) => a.name.length - b.name.length,
  //   sortDirections: ['descend' as 'descend'],
  // },

  // {
  //   title: 'Age', dataIndex: 'age', key: 'age',
  //   defaultSortOrder: 'descend' as 'descend',
  //   sorter: (a: any, b: any) => a.age - b.age,
  // },
  // { title: 'Address', dataIndex: 'address', key: 'address' },
  // {
  //   title: 'Action',
  //   dataIndex: '',
  //   key: 'x',
  //   render: () => <a>Delete</a>,
  // },
];

interface IProps {
  dataStore?: DataStore
}


interface IState {
  searchingValue: string
  selectedUser: TData | null
}


@inject('dataStore')
@observer
export default class App extends React.Component<IProps, IState> {

  state = {
    searchingValue: '',
    selectedUser: null
  }

  handleChangeSearchValue = (searchingValue: string) =>
    this.setState({ searchingValue })

  handleChangeSelectedUser = (selectedRowKeys: (string | number)[], selectedRows: TData[]) =>
    selectedRows.length > 0 && this.setState({ selectedUser: selectedRows[0] })


  render() {
    const { searchingValue, selectedUser } = this.state
    const data = this.props.dataStore!.data
      ? this.props.dataStore!.data.map((data: TData, key: number) => ({ ...data, key }))
      : [];

    return <Root>
      <Dashboard />
      <Search value={searchingValue} onChange={this.handleChangeSearchValue} />
      <Table
        columns={columns}
        loading={this.props.dataStore!.data === null}
        expandable={{ expandedRowRender: (user: TData) => <StyledUser user={user} /> }}
        dataSource={searchingValue === '' ? data : findDataRow(data, searchingValue)}
        rowSelection={{ type: 'radio', onChange: this.handleChangeSelectedUser }}
      />
      <StyledUser user={selectedUser} />
    </Root >
  }
};


const findDataRow = (data: TData[], str: string) =>
  (data || []).filter(row => Object.values(row).some((val) => String(val).includes(str)))
