namespace AddisEats.Api.Services.RestaurantService;
using AddisEats.Api.Models;
public interface IRestaurantService
{    
    List<Restaurant> GetAll(string? Address, int page, int pageSize);
    Restaurant? GetById(int id); 
}