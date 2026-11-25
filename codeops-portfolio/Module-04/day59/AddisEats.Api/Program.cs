
using System.Text.Json;
using System.Text.Json.Serialization;
using AddisEats.Api.Middleware;
using AddisEats.Api.Services.MenuItemService;
using AddisEats.Api.Services.OrderService;
using AddisEats.Api.Services.RestaurantService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IRestaurantService, RestaurantService>();
builder.Services.AddScoped<IMenuItemService, MenuItemService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<AsyncActionFilter>();
builder.Services.AddControllers(options =>
{
    options.Filters.Add<AsyncActionFilter>();
})
.AddJsonOptions(o =>
{
    o.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    o.JsonSerializerOptions.DefaultIgnoreCondition =
        JsonIgnoreCondition.WhenWritingNull;
});

var app = builder.Build();
// custom middleware
app.UseMiddleware<CorreletionIdMiddleware>();
app.UseMiddleware<RequestTimingMiddleware>();

app.Map("/admin", admin =>
{
    admin.UseMiddleware<ApiKeyMiddleware>();

    admin.Run(async context =>
    {
        await context.Response.WriteAsync("እንኳን ወደ አድሚን ፔጅ መጣችሁ foor testing purpose");
    });
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseAuthorization();

app.UseAuthentication();

app.MapControllers();

app.Run();
