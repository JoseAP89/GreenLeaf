using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        public GeoLocation Locations { get; private set; }
        private readonly IHttpClientFactory _clientFactory;
        public CityController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }




        // GET: api/city/mysearch
        [HttpGet("{search}")]
        public async Task<ActionResult<GeoLocation>> GetMessage(string search)
        {
            await OnGet(search);
            var geoNames = Locations?.GeoNames;
            if (geoNames != null)
            {
                Locations.GeoNames = geoNames.Distinct().ToArray();
            }
            else
            {
                Console.WriteLine("No data available");
            }

            return Locations;
        }

        // it makes the http async request to get json data of the search requested
        public async Task OnGet(string search)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                "http://api.geonames.org/searchJSON?q=" + search + "&maxRows=10&lang=es&username=joseap89");

            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                Locations = await response.Content.ReadFromJsonAsync<GeoLocation>();
            }
            else
            {
                Locations = null;
            }
        }

    }
}