namespace AddisEats.Services.MenuService;
using AddisEats.Models;


public interface IMenuService
{
        List<MenuItem> GetByCategory(string category);
        MenuItem GetByID(int id);
        // List<MenuItem> GetALL();

}