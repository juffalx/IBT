
namespace AddisEats.Data;
using AddisEats.Api.Models;
public static class Seed
{
    public static List<Restaurant> allRestaurant = new()
    {
    new Restaurant(){ Id = 1, Name = "Yod Abyssinia Traditional Restaurant", Area = "Bole", DeliveryFeeEtb = 120.00m, Cuisine = "Ethiopian", Rating = 4.8, EstimatedMinutes = 35 },
    new Restaurant(){ Id = 2, Name = "Sishu Burger & Grill", Area = "Bole", DeliveryFeeEtb = 110.00m, Cuisine = "Burgers", Rating = 4.7, EstimatedMinutes = 30 },
    new Restaurant(){ Id = 3, Name = "2000 Habesha Cultural Restaurant", Area = "Bole", DeliveryFeeEtb = 130.00m, Cuisine = "Ethiopian", Rating = 4.6, EstimatedMinutes = 40 },

    // Piassa
    new Restaurant(){ Id = 4, Name = "Tomoca Coffee & Pastries", Area = "Piassa", DeliveryFeeEtb = 85.00m, Cuisine = "Cafe & Bakery", Rating = 4.9, EstimatedMinutes = 25 },
    new Restaurant(){ Id = 5, Name = "Taitu Heritage Kitchen", Area = "Piassa", DeliveryFeeEtb = 90.00m, Cuisine = "Ethiopian Vegan", Rating = 4.5, EstimatedMinutes = 35 },
    new Restaurant(){ Id = 6, Name = "Castelli's Ristorante", Area = "Piassa", DeliveryFeeEtb = 100.00m, Cuisine = "Italian", Rating = 4.7, EstimatedMinutes = 40 },

    // Kazanchis
    new Restaurant(){ Id = 7, Name = "Kategna Restaurant", Area = "Kazanchis", DeliveryFeeEtb = 95.00m, Cuisine = "Ethiopian", Rating = 4.8, EstimatedMinutes = 30 },
    new Restaurant(){ Id = 8, Name = "Five Loaves Bistro", Area = "Kazanchis", DeliveryFeeEtb = 105.00m, Cuisine = "International", Rating = 4.6, EstimatedMinutes = 35 },
    new Restaurant(){ Id = 9, Name = "Lucy Lounge & Restaurant", Area = "Kazanchis", DeliveryFeeEtb = 110.00m, Cuisine = "Fusion", Rating = 4.5, EstimatedMinutes = 40 },

    // Megenagna
    new Restaurant(){ Id = 10, Name = "Dashen Traditional Kitfo House", Area = "Megenagna", DeliveryFeeEtb = 90.00m, Cuisine = "Ethiopian", Rating = 4.7, EstimatedMinutes = 30 },
    new Restaurant(){ Id = 11, Name = "Megenagna Shawarma & Pizza", Area = "Megenagna", DeliveryFeeEtb = 80.00m, Cuisine = "Fast Food", Rating = 4.4, EstimatedMinutes = 25 },
    new Restaurant(){ Id = 12, Name = "Zema Terrace & Cafe", Area = "Megenagna", DeliveryFeeEtb = 95.00m, Cuisine = "Cafe & Grill", Rating = 4.6, EstimatedMinutes = 35 }
};
    


}