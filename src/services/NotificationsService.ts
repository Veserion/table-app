import { notification } from "antd";
import { getIconByType } from "../components/Icons";

class NotificationsService {
  openNotification = (
    message: string,
    description: string,
    type?: "error" | "success"
  ) => notification.open({ message, description, icon: getIconByType(type) });
}

export default new NotificationsService();
