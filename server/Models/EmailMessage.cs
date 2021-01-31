using System.Collections.Generic;
using System.Linq;
using MimeKit;

namespace server.Models
{
    public class EmailMessage
    {
        public EmailMessage(IEnumerable<string> to, string subject, string content)
        {
            To = new List<MailboxAddress>();
            To.AddRange(to.Select(emails => new MailboxAddress(emails)));
            Subject = subject;
            Content = content;
        }

        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }

        
    }
}