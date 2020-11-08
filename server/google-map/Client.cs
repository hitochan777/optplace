using System;

namespace google_map
{
    public class Client
    {
			private HttpClient httpClient;
			public Client(HttpClient httpClient )
			{
				this.httpClient = httpClient;

			}
    }
}
