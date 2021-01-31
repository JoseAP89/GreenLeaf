using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly MessageContext _context;
        private readonly IEmailSender _emailSender;

        public MessageController(MessageContext context, IEmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        // GET: api/Message
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            return await _context.Messages.ToListAsync();
        }

        // GET: api/Message/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(long id)
        {
            var message = await _context.Messages.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }


        // POST: api/Message
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Message>> PostMessage(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            int[] arrdt = Regex.Split(message.Fecha, "[-/]").Select(s => int.Parse(s)).ToArray();
            string fecha = new DateTime(arrdt[2],arrdt[1],arrdt[0],0,0,0,2)
                .ToString("MMM dd, yyyy");
            string bodyMessage = $@"
            <h3>Información de contacto</h3>
            <p>Nombre: <strong>{message.Nombre}</strong></p>
            <p>Email: <strong>{message.Email}</strong></p>
            <p>Telefono: <strong>{message.Telefono}</strong></p>
            <p>Fecha: <strong>{fecha}</strong></p>
            <p>Ciudad: <strong>{message.Ciudad}</strong></p>
            ";
            var email = new EmailMessage(
                new string[] { message.Email},
                "Información de contacto Green Leaf",
                bodyMessage
            );

            try
            {
                await _emailSender.SendEmailAsync(email);
            }
            catch (System.Exception)
            {
                
                Console.WriteLine(".....An error has occurred connecting with SMTP.....");
            }
            
            return CreatedAtAction(nameof(GetMessage), new { id = message.Id }, message);
        }

    }
}
