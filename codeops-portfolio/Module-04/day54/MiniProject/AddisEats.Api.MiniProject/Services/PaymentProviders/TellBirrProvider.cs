namespace AddisEats.Services.PaymentProviders;

public class TeleBirrProvider : IPaymentProvider
{
    public string Pay(decimal price)
    {
        return $"Payder {price} in TeleBirr";
    }
}