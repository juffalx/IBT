using AddisEats.Models;
using AddisEats.Services.Clock;
using AddisEats.Services.PaymentProviders;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

[ApiController]
[Route("api/v1/[Controller]")]

public class HealthController : ControllerBase
{
    private  readonly IClock _ClockService;
    private  readonly IPaymentProvider _PaymentServce;

    public HealthController(IClock clockService, IPaymentProvider paymentService)
    {
        _ClockService = clockService;
        _PaymentServce = paymentService;
    }

    

    [HttpGet("Health")]
    public IActionResult GetHealth(IOptions<DeliveryOptions> deliveryoption )
    {
        var result = $" Clock is : {_ClockService.CheckTime()} \n DefaultFeeEtb is {deliveryoption.Value.DefaultFeeEtb} \n PaymentOption is : {_PaymentServce.Pay(45m)}";


        return Ok(result); 
    }

} 