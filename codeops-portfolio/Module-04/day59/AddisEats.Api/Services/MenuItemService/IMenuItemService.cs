using AddisEats.Api.Models;

namespace AddisEats.Api.Services.MenuItemService;

public interface IMenuItemService
{
    MenuItem? GetById(int id);
}