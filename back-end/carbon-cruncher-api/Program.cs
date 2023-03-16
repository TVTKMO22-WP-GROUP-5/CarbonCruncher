using carbon_cruncher_api.Extensions;
using carbon_cruncher_api.Extensions.ServiceExtensions;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.ConfigureCors();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
app.UseAuthorization(); // Adds authorization middleware.
app.MapControllers(); // Adds endpoints from controller actions.
app.Run();
