using Microsoft.AspNetCore.Mvc;
using AddisEats.Api.DTOs;
using AddisEats.Api.Services.RestaurantService;
using AddisEats.Api.Mappers;

namespace AddisEats.Api.Controllers;

[ApiController]
[Route("api/v1/controllers")]

public class RestaurantController : ControllerBase
{
    private IRestaurantService _restaurantService;

    public RestaurantController(IRestaurantService restaurantService)
    {
        _restaurantService = restaurantService;
    }
    [HttpGet]
    public ActionResult<IEnumerable<RestaurantDTO>> GetAll([FromQuery] string? Address , [FromQuery] int page, [FromQuery] int pageSize )
    {
        var result =  _restaurantService.GetAll( Address, page, pageSize);
        if (result == null)
        {
            return NotFound();
        }
        result.Select(r => r.ToDTOs()).ToList();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public ActionResult<IEnumerable<RestaurantDTO>>  GetById(int id)
    {
        var result = _restaurantService.GetById(id);
        if (result == null)
        {
         return NotFound();   
        }

       var finalResult =  result.ToDTOs();
       return Ok(finalResult);
    }
}