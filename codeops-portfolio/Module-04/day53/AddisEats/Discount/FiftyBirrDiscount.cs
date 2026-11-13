using AddisEats.Interface;

public class FiftyBirrDiscount : IDiscountPolicy
{
    public decimal ApplyDiscount(decimal price)
    {
        if (price <= 0)
        {
            throw new ArgumentException("Insert positive number");
        }
        else if (price > 50)
        {
            return price - 50m;
        }

        return price;
    }
}