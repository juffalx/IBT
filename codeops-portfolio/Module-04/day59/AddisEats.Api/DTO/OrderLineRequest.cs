using System.ComponentModel.DataAnnotations;

namespace AddisEats.Api.DTOs;

public class OrderLineRequest
{
    [Range(1, int.MaxValue)]
    public int MenuItemId { get; set; }
    
    [Range(1, int.MaxValue)]

    public int Quantity { get; set; }
}