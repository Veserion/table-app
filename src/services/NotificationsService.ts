import { notification } from 'antd';


class NotificationsService  {
    openNotification = (message: string, description: string) => {
        notification.open({message,description
          // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      };
}

export default new NotificationsService()