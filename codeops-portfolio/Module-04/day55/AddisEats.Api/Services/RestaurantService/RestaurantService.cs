namespace AddisEats.Api.Services.RestaurantService;
using AddisEats.Api.Models;
using AddisEats.Data;
public class RestaurantService : IRestaurantService

{        
    private readonly List<Restaurant> _allRestaurant = Seed.allRestaurant;

    public List<Restaurant> GetAll(string? Address, int page, int pageSize)
    {
        // Console.WriteLine(_allRestaurant.Count);
        var result = _allRestaurant.Where(r => Address == null || r.Area.Trim().ToLowerInvariant() == Address.Trim().ToLowerInvariant())
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToList();

        Console.WriteLine($" aaaaaaaaaaaa => {result.Count}");
        return result;
    }

    public Restaurant? GetById(int id)
    {
        return _allRestaurant.Where(r => r.Id == id).FirstOrDefault();
    }
}