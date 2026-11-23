using Microsoft.AspNetCore.Mvc;
using AddisEats.Services.MenuService;
using AddisEats.Models;

[ApiController]
[Route("api/v1/[controller]")]

public class MenuController : ControllerBase
{
    private IMenuService _menuService;
    public MenuController(IMenuService menuService)
    {
        _menuService = menuService;
    }
    [HttpGet]
    public IActionResult GetAllOrCategory([FromQuery]string? category)
    {
        var result = _menuService.GetByCategory(category);
        return Ok(result);
    }



    [HttpGet("{id}")]
    public IActionResult GetById( int id)
    {
        var result = _menuService.GetByID(id);
        if(result == null)
        {
            return BadRequest();
        } 
        return Ok(result);
    }

    [HttpPost]
public IActionResult CreateMenu([FromBody] MenuItem item)
{
    try
    {
            if (item.Price <= 0)
            {
                //return 400 Error 
                BadRequest();
            };
        var result = _menuService.Add(item);

        return CreatedAtAction(
            nameof(GetById),
            new { id = result.Id },
            result
        );
    }
    catch (ArgumentException ex)
    {
        return BadRequest(new { message = ex.Message });
    }
}
}