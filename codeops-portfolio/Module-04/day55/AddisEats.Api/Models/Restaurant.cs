namespace AddisEats.Api.Models;

public class Restaurant
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Area { get; set; } = "";
    public string Address { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Cuisine { get; set; } = "";
    public decimal DeliveryFeeEtb { get; set; }
    public double Rating { get; set; }
    public int EstimatedMinutes { get; set; }
    public bool IsActive { get; set; }
    public string OwnerAddress { get; set; } = "";
}
