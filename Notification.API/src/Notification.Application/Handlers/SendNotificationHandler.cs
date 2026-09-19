using Notification.Application.DTOs;
using Notification.Domain.Entities;

namespace Notification.Application.Handlers;

public record SendNotificationCommand(SendNotificationRequest Request);

public class SendNotificationHandler(INotificationRepository repository, IUnitOfWork unitOfWork)
{
    public async Task<NotificationResponse> HandleAsync(SendNotificationCommand command, CancellationToken ct)
    {
        var notification = Notification.Create(command.Request.Recipient, command.Request.Message);
        
        await repository.AddAsync(notification, ct);
        await unitOfWork.CommitAsync(ct);

        return new NotificationResponse(
            notification.Id, 
            notification.Recipient, 
            notification.Message, 
            notification.SentAt);
    }
}

public interface INotificationRepository
{
    Task AddAsync(Notification notification, CancellationToken ct);
}

public interface IUnitOfWork
{
    Task CommitAsync(CancellationToken ct);
}
