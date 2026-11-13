using AddisEats.Model;

namespace AddisEats.Service;

public class MenuService
{
    private List<MenuItem> _items = new List<MenuItem>();

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
        return _items.Where(item => item.Category.Trim().ToLowerInvariant() == category.Trim().ToLowerInvariant())
        .OrderBy(item => item.Price)
        .ToList();
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