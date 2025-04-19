import React from "react";
import { Notification as NotificationType } from "../../context/AppContext";

interface NotificationProps {
  notification: NotificationType;
  onClose: () => void;
}

export function Notification({ notification, onClose }: NotificationProps) {
  const bgColor =
    notification.type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor =
    notification.type === "success" ? "text-green-800" : "text-red-800";
  const borderColor =
    notification.type === "success" ? "border-green-400" : "border-red-400";

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg border ${bgColor} ${textColor} ${borderColor} shadow-lg z-50`}
    >
      <div className="flex items-center">
        <div className="flex-1">{notification.message}</div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
