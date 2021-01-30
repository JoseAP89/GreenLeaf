using System.Net;

namespace server.Models
{
    public static class SearchEngine
    {
        
        public static string GetHtml(string search)
        {
            string url = "https://www.geonames.org/search.html?q=";
            string html = null;
            using (WebClient client = new WebClient())
            {
                html =  client.DownloadString(url + search);
            } 
            return html;
        }
            
    }
}