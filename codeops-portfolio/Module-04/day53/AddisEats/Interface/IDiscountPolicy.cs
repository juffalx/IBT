namespace AddisEats.Interface;

public interface IDiscountPolicy
{
      decimal ApplyDiscount(decimal price);
}