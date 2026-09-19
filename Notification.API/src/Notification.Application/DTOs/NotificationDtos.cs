namespace Notification.Application.DTOs;

public readonly record struct SendNotificationRequest(string Recipient, string Message);
public readonly record struct NotificationResponse(Guid Id, string Recipient, string Message, DateTime SentAt);
