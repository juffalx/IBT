namespace AddisEats.Services.PaymentProviders;
public interface IPaymentProvider
{
    string Pay(decimal price);
}