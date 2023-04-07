using carbon_cruncher_api.Controllers;
using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Xunit.Abstractions;

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
                    {"Tokens:DefaultToken", "TestTokenValueForUnitTests"}
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
        public void TestUserRegisterBadRequest(string nick, string password, string testName)
        {
            // Arrange
            _output.WriteLine($"TestUserRegister Testname: {testName}");
            
            using var context = Fixture.CreateContext();
            var controller = new UserController(context, _configuration);
            
            // Act
            var actionResult = controller.Register(new VisuRegLoginUser { UserNick = nick, UserPassword = password });            
            _output.WriteLine($"TestUserRegister Result: {actionResult.Result}");

            // Assert
            Assert.IsType<BadRequestResult>(actionResult.Result);
        }

        [Theory]
        [InlineData("TestGuyExists", "R4nd0mP4ssw0rd!", "Username exists")]
        [InlineData("TestGuy2", "R4nd0mP4ssw0rd!", "Username exists")]
        public void TestUserRegisterConflict(string nick, string password, string testName)
        {
            // Arrange
            _output.WriteLine($"TestUserRegisterConflict Testname: {testName}");

            // Changes to datacontext are made inside transaction and are
            // rolled back after test to prevent conflict with other tests
            using var context = Fixture.CreateContext();
            var controller = new UserController(context, _configuration);
            context.Database.BeginTransaction();

            // Act
            var actionResult = controller.Register(new VisuRegLoginUser { UserNick = nick, UserPassword = password });
            _output.WriteLine($"TestUserRegisterConflict Result: {actionResult.Result}");

            // Assert
            Assert.IsType<ConflictResult>(actionResult.Result);
        }

        [Theory]
        [InlineData("TestGuy1", "R4nd0mP4ssw0rd!", "Username TestGuy1 registered succesfully")]
        public void TestUserRegisterSuccess(string nick, string password, string testName)
        {
            // Arrange
            _output.WriteLine($"TestUserRegisterSuccess Testname: {testName}");

            // Changes to datacontext are made inside transaction and are
            // rolled back after test to prevent conflict with other tests
            using var context = Fixture.CreateContext();
            var controller = new UserController(context, _configuration);
            context.Database.BeginTransaction();

            // Act
            var actionResult = controller.Register(new VisuRegLoginUser { UserNick = nick, UserPassword = password });
            _output.WriteLine($"TestUserRegisterSuccess Result: {actionResult.Result}");
            
            // Assert
            Assert.IsType<OkObjectResult>(actionResult.Result);
        }

        [Theory]
        [InlineData("TestGuy1", "R4nd0mP4ssw0rd!", "Username TestGuy1 logged in succesfully")]
        public void TestUserLoginSuccess(string nick, string password, string testName)
        {
            // Arrange
            _output.WriteLine($"TestUserLoginSuccess Testname: {testName}");

            // Changes to datacontext are made inside transaction and are
            // rolled back after test to prevent conflict with other tests
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();
            var controller = new UserController(context, _configuration);
            controller.Register(new VisuRegLoginUser { UserNick = nick, UserPassword = password });            
            context.ChangeTracker.Clear();
            
            // Act
            var loginResult = controller.Login(new VisuRegLoginUser { UserNick = nick, UserPassword = password });
            _output.WriteLine($"TestUserLoginSuccess Result: {loginResult.Result}");
            
            // Assert
            Assert.IsType<OkObjectResult>(loginResult.Result);
        }

        [Theory]
        [InlineData("TestGuy1", "R4nd0mP4ssw0rd!", "Username TestGuy1 deleted succesfully")]
        public void TestUserDeleteSuccess(string nick, string password, string testName)
        {
            // Arrange
            _output.WriteLine($"TestUserDeleteSuccess Testname: {testName}");

            // Changes to datacontext are made inside transaction and are
            // rolled back after test to prevent conflict with other tests
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();
            var controller = new UserController(context, _configuration);

            // Register and login user to get token
            controller.Register(new VisuRegLoginUser { UserNick = nick, UserPassword = password });
            var loginResult = controller.Login(new VisuRegLoginUser { UserNick = nick, UserPassword = password });
            context.ChangeTracker.Clear();

            // Get token from login result and extract username from token
            var token = ((ObjectResult)loginResult.Result!).Value!.ToString();
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);
            string username = jwtSecurityToken.Claims.FirstOrDefault()!.Value;

            // Act
            var deleteResult = controller.Delete(username);
            _output.WriteLine($"TestUserDeleteSuccess Result: {loginResult}");

            // Assert
            Assert.IsType<NoContentResult>(deleteResult);
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