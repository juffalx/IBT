using Microsoft.AspNetCore.Mvc;
using AddisEats.Services.MenuService;

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
            return NotFound();
        } 
        return Ok(result);
    }


    
}