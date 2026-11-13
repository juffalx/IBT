using AddisEats.Interface;
public class TenPercentDiscount : IDiscountPolicy
{
    public decimal ApplyDiscount(decimal price)
    {
        if(price <= 0)
        {
            throw new ArgumentException("insert Possetive number");
        }

        return price - (price * 0.1m);
    }

}