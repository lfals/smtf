const NOTIFICATION_TITLE = "Seu tempo acabou vagabunda";
const NOTIFICATION_BODY = "Ta na hora de levantar";

const sendNotification = () => {
  new Notification(NOTIFICATION_TITLE, {
    body: NOTIFICATION_BODY,
  });
};

export default sendNotification;
