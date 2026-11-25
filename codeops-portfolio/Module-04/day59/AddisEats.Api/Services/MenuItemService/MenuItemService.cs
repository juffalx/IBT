using AddisEats.Api.Models;

namespace AddisEats.Api.Services.MenuItemService;

public class MenuItemService : IMenuItemService
{
    private static readonly List<MenuItem> _menuItems = new()
    {
        new MenuItem { Id = 1, Name = "Doro Wot", Category = "Ethiopian", Price = 450m },
        new MenuItem { Id = 2, Name = "Special Tibs", Category = "Ethiopian", Price = 550m },
        new MenuItem { Id = 3, Name = "Cheese Burger", Category = "Fast Food", Price = 350m }
    };

    public MenuItem? GetById(int id)
    {
        return _menuItems.FirstOrDefault(item => item.Id == id);
    }
}