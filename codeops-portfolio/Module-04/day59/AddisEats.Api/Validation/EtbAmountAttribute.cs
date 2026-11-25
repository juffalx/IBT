
using System.ComponentModel.DataAnnotations;

namespace AddisEats.Api.Validations;

public class EtbAmountAttribute : ValidationAttribute
{
    public EtbAmountAttribute()
    {
        ErrorMessage = "Amount must be positive with at most two decimal places.";
    }

    public override bool IsValid(object? value)
    {
        if (value is not decimal amount || amount <= 0m)
            return false;

        return decimal.Round(amount, 2) == amount;
    }
}
