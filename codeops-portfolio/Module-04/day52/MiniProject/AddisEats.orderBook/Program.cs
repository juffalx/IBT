using AddisEats.OrderBook.Models;
using AddisEats.OrderBook.Services;

// Menu
MenuItem Doro = new(1, "Doro Wat", "Traditional", 800m);
MenuItem Alicha = new(2, "Alicha", "Traditional", 600m);
MenuItem Tibs = new(3, "Tibs", "Traditional", 400m);
MenuItem Shiro = new(4, "Shiro", "Traditional", 200m);

// Order lines
OrderLine FirstChoose = new(Doro, 2);
OrderLine SecondChoose = new(Shiro, 1);

// Order
Order Order1 = new()
{
    Area = "Bole",
    Customer = "Elsabet",
    Lines = [FirstChoose, SecondChoose]
};

// Order book
OrderBook Book = new();

Book.AddOrder(Order1);

// Display report
Book.DisplayResult("Bole", 1);