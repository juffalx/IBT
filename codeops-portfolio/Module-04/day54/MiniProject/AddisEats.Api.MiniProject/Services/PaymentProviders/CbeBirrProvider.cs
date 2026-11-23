    namespace AddisEats.Services.PaymentProviders;

    public class CbeBirrProvider : IPaymentProvider
    {
        public string Pay(decimal price)
        {
            return $"Payder {price} in CBE Birr";
        }
    }