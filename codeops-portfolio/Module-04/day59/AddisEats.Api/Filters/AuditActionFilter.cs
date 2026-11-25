using Microsoft.AspNetCore.Mvc.Filters;

public class AsyncActionFilter : IAsyncActionFilter
{
    private readonly ILogger<AsyncActionFilter> _log;

    public AsyncActionFilter(ILogger<AsyncActionFilter> log)
    {
        _log = log;
    }

    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        var action = context.RouteData.Values["action"];
        var argument = context.ActionArguments;

        _log.LogInformation(
            "Action: {Action}, Arguments: {@Arguments}",
            action,
            argument);

        await next();
    }
}