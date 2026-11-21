namespace AddisEats.OrderBook.Services;

using AddisEats.OrderBook.Models;

public class OrderBook
{
    private readonly List<Order> _orders = new();

    public void AddOrder(Order order)
    {
        _orders.Add(order);
    }

    public void DisplayResult(string area, int pageNumber)
    {
        // Get orders for the requested area, highest total first
        var result = _orders
            .Where(o => o.Area == area)
            .OrderByDescending(o => o.Total)
            .ToList();

        // Total revenue
        var totalRevenue = result.Sum(o => o.Total);

        // Total orders
        var totalOrders = result.Count;

        // Busiest category by quantity ordered
        var busiestCategory = result
            .SelectMany(o => o.Lines)
            .GroupBy(line => line.Item.Category)
            .Select(group => new
            {
                Category = group.Key,
                Quantity = group.Sum(line => line.Quantity)
            })
            .OrderByDescending(group => group.Quantity)
            .FirstOrDefault();

        // Pagination: five orders per page
        var fivePerPage = result
            .Skip((pageNumber - 1) * 5)
            .Take(5)
            .ToList();

        // Customer names on the current page
        var customerNames = fivePerPage
            .Select(o => o.Customer)
            .ToList();

        // Display report
        Console.WriteLine($"Area: {area}");
        Console.WriteLine($"Total Revenue: {totalRevenue} ETB");
        Console.WriteLine($"Total Orders: {totalOrders}");

        Console.WriteLine(
            $"Busiest Category: {busiestCategory?.Category ?? "No orders"}"
        );

        Console.WriteLine(
            $"Page {pageNumber}: {fivePerPage.Count} Orders"
        );

        Console.WriteLine(
            $"Customers: {string.Join(", ", customerNames)}"
        );
    }
}