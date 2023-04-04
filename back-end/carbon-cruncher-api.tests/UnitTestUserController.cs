using carbon_cruncher_api.Controllers;
using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Http.Json;
using Xunit.Abstractions;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using FluentAssertions;

namespace carbon_cruncher_api.tests
{
    public class UnitTestUserController : IClassFixture<TestDatabaseFixture>
    {
        public TestDatabaseFixture Fixture { get; }

        private ITestOutputHelper _output;
        private HttpClient _client;
        private IConfiguration _configuration;

        public UnitTestUserController(TestDatabaseFixture fixture, ITestOutputHelper output)
        {
            // Create and build test configuration
            var myConfiguration = new Dictionary<string, string>
                {
                    {"Tokens:DefaultToken", "TestTokenValue"}
                };
            _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(myConfiguration)
                .Build();

            // Setup test database and test result messages
            Fixture = fixture;
            _output = output;

            // Init http client
            var webAppFactory = new WebApplicationFactory<Program>();
            _client = webAppFactory.CreateClient();
        }

        [Theory]
        [InlineData("te", "R4nd0mP4ssw0rd!", "Username too short ( < 3 )")]
        [InlineData("testGuy", "d!", "Password too short ( < 3 )")]
        [InlineData("testGuy", "password", "Password too weak")]
        [InlineData("testGuytestGuytestGuy", "R4nd0mP4ssw0rd!", "Username too long ( > 20 )")]
        [InlineData("testGuy", "R4nd0mP4ssw0rd!R4nd0mP4ssw0rd!", "Password too long ( > 20 )")]
        [InlineData("", "R4nd0mP4ssw0rd!R4nd0mP4ssw0rd!", "Username empty")]
        [InlineData("testGuy", "", "Password empty")]
        [InlineData("testGuy", "R4nd0mP4ssw0rd!", "Password empty")]
        public async void TestUserRegister(string nick, string password, string testName)
        {
            _output.WriteLine($"TestUserRegister: {testName}");

            using var context = Fixture.CreateContext();
            var controller = new UserController(context, _configuration);
            var actionResult = controller.Register(new VisuRegLoginUser { UserNick = nick, UserPassword = password });
            
            //Assert
            var okResult = Assert.IsType<BadRequestObjectResult>(actionResult.Result);
            var value = Assert.IsType<int>(okResult.Value);
            Assert.Equal(10, value);

            //Assert.IsType(BadRequestObjectResult, response);
            //var model = Assert.IsAssignableFrom<IEnumerable<StormSessionViewModel>>(
            //    viewResult.ViewData.Model);

            //var response = await _client.PostAsJsonAsync("/api/user/register", new { usernick = nick, userpassword = password });
            //Assert.Equal(statusCode, response.Result);
        }

        private void EmptyDatabase()
        {
            using var context = Fixture.CreateContext();
            context.Database.ExecuteSqlRaw("DELETE FROM VisuUsers");
            context.Database.ExecuteSqlRaw("DBCC CHECKIDENT (visu_user, RESEED, 0)");
        }
    }

    public class TestDatabaseFixture
    {
        private const string ConnectionString = @"Server=(localdb)\mssqllocaldb;Database=carbon-cruncher_30032023;Trusted_Connection=True";

        private static readonly object _lock = new();
        private static bool _databaseInitialized;

        public TestDatabaseFixture()
        {
            lock (_lock)
            {
                if (!_databaseInitialized)
                {
                    using (var context = CreateContext())
                    {
                        context.Database.EnsureDeleted();
                        context.Database.EnsureCreated();
                        context.AddRange(
                            new VisuUser { UserNick = "TestGuyExists", UserPassHash = "9c4m8y3m984yu3cm30u4" },
                            new VisuUser { UserNick = "TestGuy2", UserPassHash = "9gewhewhy3m984ewyuu4" });
                        context.SaveChanges();
                    }

                    _databaseInitialized = true;
                }
            }
        }

        public CarbonCruncherContext CreateContext()
            => new CarbonCruncherContext(
                new DbContextOptionsBuilder<CarbonCruncherContext>()
                    .UseSqlServer(ConnectionString)
                    .Options);
    }
}