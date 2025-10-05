import { NotificationPayload } from "firebase/messaging";
import React from "react";
import { styled } from "@mui/material/styles";

const NotificationHeader = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  fontSize: 20,
  fontWeight: "bold",
}));

const NotificationBody = styled("div")(() => ({
  marginTop: 10,
  textAlign: "center",
}));

const ImageContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  height: 100,
  objectFit: "contain",
}));

const Message: React.FC<{ notification: NotificationPayload | undefined }> = ({ notification }) => {
  return (
    <>
      <NotificationHeader>
        {notification?.image && (
          <ImageContainer>
            <img src={notification.image} width={100} alt="Notification" />
          </ImageContainer>
        )}
        <span>{notification?.title}</span>
      </NotificationHeader>
      <NotificationBody>{notification?.body}</NotificationBody>
    </>
  );
};

export default Message;
