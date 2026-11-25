namespace AddisEats.Api.Services.RestaurantService;

using AddisEats.Api.DTOs;
using AddisEats.Api.Models;
using AddisEats.Data;
public class RestaurantService : IRestaurantService

{        
    private readonly List<Restaurant> _allRestaurant = Seed.allRestaurant;

    public List<Restaurant> GetAll(RestaurantQueryDTO query)
    {
        var result = _allRestaurant.Where(r => query.Area.Count == 0 || query.Area.Contains(r.Area))
        .Skip((query.Page - 1) * query.Limit)
        .Take(query.Limit)
        .ToList();

        // Console.WriteLine($" aaaaaaaaaaaa => {result.Count}");
        return result;
    }

    public Restaurant? GetById(int id)
    {
        return _allRestaurant.Where(r => r.Id == id).FirstOrDefault();
    }
}