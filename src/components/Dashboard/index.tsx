import React from 'react';
import { Button, Radio, Modal, Form, Input } from 'antd';
import styled from '@emotion/styled'
import { DataStore, TData } from '../../stores/DataStore';
import { inject, observer } from 'mobx-react';
import { RadioChangeEvent } from 'antd/lib/radio';
import notificationsService from '../../services/notificationsService';
const Root = styled.div`
padding: 20px 0 ;
display: flex;
align-items: center;
margin: 0 -20px;
& > * {
    margin: 0 20px;
}
`

interface IProps {
    dataStore?: DataStore
}


interface IState {
    isOpen: boolean
}


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: 'This field is required!',
    types: { email: 'Not a validate email!', },
};

@inject('dataStore')
@observer
export default class Dashboard extends React.Component<IProps, IState> {

    state = { isOpen: false }

    handleDataSourceChange = ({ target: { value } }: RadioChangeEvent) =>
        this.props.dataStore!.changeDataSource(value)

    showModal = () => this.setState({ isOpen: true });

    handleCancel = () => this.setState({ isOpen: false });

    onFinish = (values: Omit<TData, 'id'>) => {
        const id = -(this.props.dataStore!.userData.length + 1)
        this.props.dataStore!.userData.push({ ...values, id })
        this.handleCancel()
        notificationsService.openNotification('Success', 'User was added succesfully', 'success')
    };

    render() {
        const { dataSource } = this.props.dataStore!
        return <Root>

            <Button type="primary" size="large" onClick={this.showModal}>New user</Button>

            <Radio.Group value={dataSource} onChange={this.handleDataSourceChange}>
                <Radio.Button value="long">The large data source</Radio.Button>
                <Radio.Button value="short">The small data source</Radio.Button>
            </Radio.Group>
            <Modal
                title="New user"
                visible={this.state.isOpen}
                footer={null}
                onCancel={this.handleCancel}
            >
                <Form {...layout} name="nest-messages" onFinish={this.onFinish as (values: any) => void} validateMessages={validateMessages}>
                    <Form.Item name={'firstName'} label="First name" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name={'lastName'} label="Last name" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name={'email'} label="Email" rules={[{ type: 'email', required: true }]}><Input /></Form.Item>
                    <Form.Item name={'phone'} label="Phone Number" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name={['address', 'streetAddress']} label="Street address" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name={['address', 'city']} label="city" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name={['address', 'state']} label="state" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name={['address', 'zip']} label="zip" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name={'description'} label="Description" rules={[{ required: true }]}><Input.TextArea /></Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Root >
    }
};


