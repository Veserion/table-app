import React from 'react';
import { WarningOutlined, CheckSquareOutlined } from '@ant-design/icons';

export const ErrorIcn = () => <WarningOutlined style={{ color: '#ff4d4f' }} />
export const SuccessIcn = () => <CheckSquareOutlined style={{ color: '#108ee9' }} />

export const getIconByType = (type?: 'success' | 'error') => {
    switch (type) {
        case 'error':
            return <ErrorIcn />
        case 'success':
            return <SuccessIcn />
    }
    return null
}
