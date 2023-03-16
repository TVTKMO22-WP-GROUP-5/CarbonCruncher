namespace carbon_cruncher_api.Extensions.ServiceExtensions
{
    public static class ServiceExtensions
    {
        /// <summary>
        /// Allow all requests from all origins to API with cors configuration
        /// </summary>
        /// <param name="services"></param>
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                    builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
        }
    }
}
