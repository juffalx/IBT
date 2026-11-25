
using AddisEats.Api.DTOs;
using AddisEats.Api.Mappers;
using AddisEats.Api.Services.OrderService;
using Microsoft.AspNetCore.Mvc;

namespace AddisEats.Api.Controllers;

[ApiController]
[Route("api/v1/orders")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet("{id:int}")]
    public ActionResult<OrderDTO> GetById(int id)
    {
        var result = _orderService.GetById(id);

        if (!result.IsSuccess)
        {
            return StatusCode(result.Error!.Status, result.Error);
        }

        return Ok(result.Value!.ToDTOs());
    }

    [HttpPost]
    public ActionResult<OrderDTO> CreateOrder(
        [FromBody] CreateOrderRequest request)
    {
        var result = _orderService.CreateOrder(request);

        if (!result.IsSuccess)
        {
            return StatusCode(result.Error!.Status, result.Error);
        }

        var order = result.Value!;

        return CreatedAtAction(
            nameof(GetById),
            new { id = order.Id },
            order.ToDTOs()
        );
    }
}
