using AddisEats.Services.MenuService;
using AddisEats.Models;
using AddisEats.Services.Clock;
using AddisEats.Services.PaymentProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IMenuService, MenuService>();

// builder.Services.AddScoped   <IClock, Clock>();
builder.Services.AddTransient<IClock, Clock>();
builder.Services.AddSingleton<IClock, Clock>();

builder.Services.AddScoped<IPaymentProvider, CbeBirrProvider>();


builder.Services.Configure<MenuOptions>(
    builder.Configuration.GetSection("MenuOptions"));

builder.Services.Configure<DeliveryOptions>(
    builder.Configuration.GetSection("DeliveryOption")
);

builder.Services.AddCors(o => o.AddPolicy("frontend", p =>
p.WithOrigins("http://localhost:5173") // Vite
.AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("frontend");
app.UseHttpsRedirection();

app.UseAuthentication();// add before Authorization

app.UseAuthorization();

app.MapControllers();

app.Run();
