import React from 'react';
import StyledUser from '../SelectedUser'
import { Table, Input } from 'antd';
import styled from '@emotion/styled'
import { DataStore, TData } from '../../stores/DataStore';
import { inject, observer } from 'mobx-react';
import Dashboard from '../Dashboard';

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

  findDataRow = (str: string) => (this.props.dataStore!.data || []).filter(row => Object.values(row).some((val) => String(val).includes(str)))

  handleChangeSearchValue = ({ target: { value: searchingValue } }: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ searchingValue })

  handleChangeSelectedUser = (selectedRowKeys: (string | number)[], selectedRows: TData[]) =>
    selectedRows.length > 0 && this.setState({ selectedUser: selectedRows[0] })


  render() {
    const { searchingValue, selectedUser } = this.state
    const data = this.props.dataStore!.data
      ? this.props.dataStore!.data.map((data: TData, key: number) => ({ ...data, key }))
      : null;

    return <Root>
      <Dashboard />
      <Input placeholder="The field to filter." value={searchingValue} onChange={this.handleChangeSearchValue} />
      <Table
        columns={columns}
        loading={data === null}
        expandable={{ expandedRowRender: (user: TData) => <StyledUser user={user} /> }}
        dataSource={searchingValue === '' ? data || [] : this.findDataRow(searchingValue)}
        rowSelection={{ type: 'radio', onChange: this.handleChangeSelectedUser }}
      />
      <StyledUser user={selectedUser} />
    </Root >
  }
};

