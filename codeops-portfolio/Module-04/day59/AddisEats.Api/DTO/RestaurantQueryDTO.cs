namespace AddisEats.Api.DTOs;

public class RestaurantQueryDTO
{
    public List<string> Area {get; set;}= new List<string>();
    public string MaxFeeEtb{get; set;} ="";
    public int Page{get; set;}
    public int Limit{get; set;}
}