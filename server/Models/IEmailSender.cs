using System.Threading.Tasks;

namespace server.Models
{
    public interface IEmailSender
    {
        Task SendEmailAsync(EmailMessage email);
    }
}