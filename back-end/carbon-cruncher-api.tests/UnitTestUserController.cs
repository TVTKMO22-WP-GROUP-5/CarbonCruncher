using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using System.Net;
using System.Net.Http.Json;

namespace carbon_cruncher_api.tests
{
    public class UnitTestUserController
    {
        private HttpClient _client;

        public UnitTestUserController()
        {
            var webAppFactory = new WebApplicationFactory<Program>();
            _client = webAppFactory.CreateClient();
        }

        [Fact]
        public async void TestUserRegister()
        {
            var response = await _client.PostAsJsonAsync("/api/user/register", new { usernick = "jokke100", userpassword = "jokke123!" });

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}