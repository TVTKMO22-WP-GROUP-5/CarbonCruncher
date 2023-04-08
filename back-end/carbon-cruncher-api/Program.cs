using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var corsName = "carbon-cruncher-origins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsName,
                      policy =>
                      {
                          policy.AllowAnyOrigin();
                      });
});

// Prevent recursive data fetching
builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    // Swagger generate documentation from comments
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

    // Swagger authentication configuration
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme 
    { 
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

// Authentication scheme
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration["Tokens:DefaultToken"])),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

// Add DbContext using SQL Server Provider and connection string from appsettings.json (or resource that overrides it)
builder.Services.AddDbContext<CarbonCruncherContext>(options => options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Special exception page for development.
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts(); // Middleware for HSTS, which adds the Strict-Transport-Security-Header.
}

app.UseHttpsRedirection(); // Middleware for HTTPS redirection from HTTP.
app.UseStaticFiles(); // Enables using static files for the request.
app.UseForwardedHeaders(new ForwardedHeadersOptions // Forward proxy headers to current request.
{
    ForwardedHeaders = ForwardedHeaders.All
});

app.UseCors(corsName);
app.UseAuthentication(); // Middleware for authentication.
app.UseAuthorization(); // Adds authorization middleware.
app.MapControllers(); // Adds endpoints from controller actions.
app.Run();
