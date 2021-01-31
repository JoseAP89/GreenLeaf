using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;

namespace server.Models
{
    public class EmailSender: IEmailSender
    {
        private readonly EmailConfig _emailConfig;

        public EmailSender(EmailConfig emailConfig)
        {
            _emailConfig = emailConfig;
        }

        public async Task SendEmailAsync(EmailMessage email)
        {
            var emailMessage = CreateEmailMessage(email);
            await SendAsync(emailMessage);
        }

        private MimeMessage CreateEmailMessage(EmailMessage email)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add( new MailboxAddress(_emailConfig.From));
            emailMessage.To.AddRange(email.To);
            emailMessage.Subject = email.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html){
                Text = email.Content
            };
            return emailMessage;
        }

        private async Task SendAsync(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(_emailConfig.SmtpServer,_emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.AuthenticateAsync(_emailConfig.Username,_emailConfig.Password);
                    await client.SendAsync(mailMessage);
                }
                catch (System.Exception)
                {
                    
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
            }
        }
    }
}