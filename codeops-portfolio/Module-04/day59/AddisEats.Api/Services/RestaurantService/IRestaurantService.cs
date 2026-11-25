namespace AddisEats.Api.Services.RestaurantService;

using AddisEats.Api.DTOs;
using AddisEats.Api.Models;
public interface IRestaurantService
{    
    List<Restaurant> GetAll(RestaurantQueryDTO query);
    Restaurant? GetById(int id); 

}