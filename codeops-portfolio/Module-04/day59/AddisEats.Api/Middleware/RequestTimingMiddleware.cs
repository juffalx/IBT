using System.Diagnostics;

namespace AddisEats.Api.Middleware;

public class RequestTimingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestTimingMiddleware> logger;

    public RequestTimingMiddleware(RequestDelegate next, ILogger<RequestTimingMiddleware> logger)
    {
        _next = next;
        this.logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();

        try
        {
            await _next(context);
        }
        finally
        {
            stopwatch.Stop();

            var method = context.Request.Method;
            var path = context.Request.Path;
            var statusCode = context.Response.StatusCode;
            var elapsedMs = stopwatch.ElapsedMilliseconds;
            var correlationId = context.TraceIdentifier;

            logger.LogInformation(
                "Request {Method} {Path} responded {StatusCode} in {ElapsedMs} ms CorrelationId: {CorrelationId}",
                method, path, statusCode, elapsedMs, correlationId);
        }
    }
}