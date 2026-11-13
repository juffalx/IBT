using AddisEats.Service;
using AddisEats.Model;
using AddisEats.Interface;
MenuService menu = new MenuService();

menu.Add(new MenuItem { Id = 1, Name = "Shiro", Category = "Main", Price = 250m });
menu.Add(new MenuItem { Id = 2, Name = "Kitfo", Category = "Main", Price = 450m });
menu.Add(new MenuItem { Id = 3, Name = "Doro Wot", Category = "Main", Price = 550m });
menu.Add(new MenuItem { Id = 4, Name = "Macchiato", Category = "Drinks", Price = 80m });
menu.Add(new MenuItem { Id = 5, Name = "Fresh Juice", Category = "Drinks", Price = 120m });
menu.Add(new MenuItem { Id = 6, Name = "Coffee", Category = "Drinks", Price = 60m });
menu.Add(new MenuItem { Id = 7, Name = "Cake", Category = "Dessert", Price = 180m });
menu.Add(new MenuItem { Id = 8, Name = "Ice Cream", Category = "Dessert", Price = 150m });

foreach (var item in menu.GetByCategory("Main"))
{
    Console.WriteLine($"{item.Id} | {item.Name} | {item.Category} | {item.Price:N2} ETB");
}

var stats = menu.GetCategoryStats("Main");

Console.WriteLine($"Total:   {stats.Total:N2} ETB");
Console.WriteLine($"Average: {stats.Average:N2} ETB");

IDiscountPolicy tenPercent = new TenPercentDiscount();
IDiscountPolicy fiftyBirr = new FiftyBirrDiscount();

decimal TenPercentDecimal = tenPercent.ApplyDiscount(250m);
decimal FiftyBirrDecimal = fiftyBirr.ApplyDiscount(250m);

Console.WriteLine($"10% Discount of {250m} is {TenPercentDecimal}");
Console.WriteLine($"50 Birr Discount of {250m} is {FiftyBirrDecimal}");