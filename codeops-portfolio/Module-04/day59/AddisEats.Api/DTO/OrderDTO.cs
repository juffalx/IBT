namespace AddisEats.Api.DTOs;


public class OrderDTO
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public int Quantity {get; set;}
    public decimal TotalAmount { get; set; }
};