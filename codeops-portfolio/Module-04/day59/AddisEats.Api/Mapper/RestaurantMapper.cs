namespace AddisEats.Api.Mappers;
using AddisEats.Api.DTOs;
using AddisEats.Api.Models;

public static class RestaurantMapper
{
    public static RestaurantDTO ToDTOs(this Restaurant r)
    {
        return new RestaurantDTO
        (
            r.Id,
            r.Name,
            r.Address
        );
    }
}