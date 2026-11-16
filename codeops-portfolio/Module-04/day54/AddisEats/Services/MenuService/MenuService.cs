using AddisEats.Models;
using Microsoft.Extensions.Options;
namespace AddisEats.Services.MenuService;
public class MenuService : IMenuService
{
    private decimal _MaximumPrice;

    public MenuService(IOptions<MenuOptions> options)
        {
            _MaximumPrice = options.Value.MaximumPrice;
        }
    private List<MenuItem> _items = new List<MenuItem>()
    {
        new MenuItem(){Id=1,Name="Kitfo",Category="Main", Price=100},
        new MenuItem(){Id=2,Name="Shiro",Category="Fast", Price=200},
        new MenuItem(){Id=3,Name="Aybe" ,Category="Slow", Price=300},
        new MenuItem(){Id=4,Name="Tibs" ,Category="Main", Price=400},
        new MenuItem(){Id=5,Name="Alich",Category="Fast", Price=500},
        new MenuItem(){Id=6,Name="Doro", Category="Slow", Price=600},

    };

    

    public void Add(MenuItem item)
    {
        
        if (item.Price <= 0)
        {
            throw new ArgumentException("Price must be greater than zero.");
        }

        _items.Add(item);
        }

    public List<MenuItem> GetByCategory(string category)
    {
        return _items.Where(item => category == null || item.Category.Trim().ToLowerInvariant().Contains(category.Trim().ToLowerInvariant()))
        .Where(item => item.Price <= _MaximumPrice)
        .OrderBy(item => item.Price)
        .ToList();
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

