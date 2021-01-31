using System;

namespace server.Models
{
    public class Message
    {
        public long Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Fecha { get; set; }
        public string Ciudad { get; set; }
    }
}