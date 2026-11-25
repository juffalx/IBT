using AddisEats.Api.Validations;

namespace AddisEats.Api.DTOs;

public class CreateOrderRequest
{
    public int RestaurantId { get; set; }
    public int MenuItemId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string DeliveryAddress { get; set; } = string.Empty;

    [EthiopianMobile]
    public string CustomerPhone { get; set; } = string.Empty;
    public int Quantity { get; set; }

};