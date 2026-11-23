using AddisEats.Models;
using Microsoft.Extensions.Options;
namespace AddisEats.Services.MenuService;
public class MenuService : IMenuService
{
    private decimal _MaximumPrice; // ፕራይቬት የሆነ ፈጠርን
    private readonly int _DefaultPageLimit;

    public MenuService(IOptions<MenuOptions> options)
        {
            _MaximumPrice = options.Value.MaximumPrice;
        _DefaultPageLimit = options.Value.DefaultPageSize;
        }
    private List<MenuItem> _items = new List<MenuItem>()
    {
        new MenuItem(){Id=7,Name="FIRFIR", Category="Main", Price=150},
        new MenuItem(){Id=8,Name="Chechebsa", Category="Fast", Price=180},
        new MenuItem(){Id=9,Name="Genfo", Category="Slow", Price=120},
        new MenuItem(){Id=10,Name="Dulet", Category="Main", Price=250},
        new MenuItem(){Id=11,Name="Gomen", Category="Fast", Price=160},
        new MenuItem(){Id=12,Name="Misir", Category="Slow", Price=140},
        new MenuItem(){Id=13,Name="Beyaynet", Category="Main", Price=220},
        new MenuItem(){Id=14,Name="Enkulal", Category="Fast", Price=130},
        new MenuItem(){Id=15,Name="Ful", Category="Slow", Price=170},
        new MenuItem(){Id=16,Name="Kikil", Category="Main", Price=280},
        new MenuItem(){Id=17,Name="Azifa", Category="Fast", Price=110},
        new MenuItem(){Id=18,Name="Shinbra", Category="Slow", Price=190},
        new MenuItem(){Id=19,Name="Quanta Firfir", Category="Main", Price=320},
        new MenuItem(){Id=20,Name="Bula", Category="Fast", Price=200},
        new MenuItem(){Id=21,Name="Kurt", Category="Slow", Price=350},


    };

    

    public MenuItem Add(MenuItem item)
    {
        
        if (item.Price <= 0)
        {
            throw new ArgumentException("Price must be greater than zero.");
        }

        _items.Add(item);
        return item;
        }

    public List<MenuItem> GetByCategory(string category)
    {
        var result = _items.Where(item => category == null || item.Category.Trim().ToLowerInvariant().Contains(category.Trim().ToLowerInvariant()))
        .Where(item => item.Price <= _MaximumPrice)
        .OrderBy(item => item.Price)
        .ToList();

        int Page = 1;

        var TotalResult = result.Count;
        Console.WriteLine($"---------------   ttttesssst ----->  {_DefaultPageLimit}");
        var FinalFilterResult = result
            .Skip(Page - 1 * _DefaultPageLimit)
            .Take(2)
            .ToList();

        return FinalFilterResult;
    }
    
    // public List<MenuItem> GetALL()
    // {
    //     return _items.ToList();
    // }
    public MenuItem GetByID(int id)
    {
       var result = _items.Where(item=> item.Id == id).FirstOrDefault();
        return result;
    }
    public (decimal Total, decimal Average) GetCategoryStats(string category)
{
    var item = _items.Where(item => item.Category.Trim().ToLowerInvariant() == category.Trim().ToLowerInvariant()).ToList();

    if(item.Count == 0)
        {
            return (0,0);
        }

    var sum = item.Sum(item => item.Price);
    var average = item.Average(item => item.Price);

    return (sum, average);
}
        
}

