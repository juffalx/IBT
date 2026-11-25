namespace AddisEats.Api.Middleware;

public class ApiKeyMiddleware
{
    private readonly RequestDelegate _next;

    public ApiKeyMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var ApiKey = context.Request.Headers["X-API-Key"].FirstOrDefault();



        if (string.IsNullOrWhiteSpace(ApiKey))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return;
        }
        // some logic
            await _next(context);
        
    }
}