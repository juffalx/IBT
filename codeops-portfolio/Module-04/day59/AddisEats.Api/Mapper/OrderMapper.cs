namespace AddisEats.Api.Mappers;
using AddisEats.Api.DTOs;
using AddisEats.Api.Models;

public static class OrderMapper
{
    public static OrderDTO ToDTOs(this Order r)
    {
        return new OrderDTO
        {
            Id = r.Id,
            CustomerName = r.CustomerName,
            Quantity = r.Quantity,
            TotalAmount = r.TotalAmount
        };
    }
}