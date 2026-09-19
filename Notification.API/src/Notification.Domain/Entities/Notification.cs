using Notification.Domain.Core;

namespace Notification.Domain.Entities;

public readonly record struct EmailAddress(string Value);
public readonly record struct PhoneNumber(string Value);

public class Notification : AggregateRoot
{
    public Guid Id { get; private set; }
    public string Recipient { get; private set; } = string.Empty;
    public string Message { get; private set; } = string.Empty;
    public DateTime SentAt { get; private set; }
    public bool IsProcessed { get; private set; }
    public byte[] RowVersion { get; private set; } = Array.Empty<byte>();

    private Notification() { } // For EF Core

    public static Notification Create(string recipient, string message)
    {
        if (string.IsNullOrWhiteSpace(recipient)) 
            throw new ArgumentException("Recipient is required.");
        
        if (string.IsNullOrWhiteSpace(message)) 
            throw new ArgumentException("Message is required.");

        var notification = new Notification
        {
            Id = Guid.NewGuid(),
            Recipient = recipient,
            Message = message,
            SentAt = DateTime.UtcNow,
            IsProcessed = false
        };

        notification.RaiseDomainEvent(new NotificationCreatedEvent(notification.Id));
        return notification;
    }

    public void MarkAsProcessed()
    {
        IsProcessed = true;
    }
}

public record NotificationCreatedEvent(Guid NotificationId);
