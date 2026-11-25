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
    public ActionResult<RestaurantDTO> GetAll( [FromQuery] RestaurantQueryDTO query )
    {
        var result =  _restaurantService.GetAll(query);
        if (result == null)
        {
            return NotFound();
        }
        result.Select(r => r.ToDTOs()).ToList();
        return Ok(result);
    }

    [HttpGet("{id:int}")] // Add contrains
    public ActionResult<RestaurantDTO>  GetById(int id)
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