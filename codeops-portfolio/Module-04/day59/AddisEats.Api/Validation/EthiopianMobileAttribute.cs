
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace AddisEats.Api.Validations;

public class EthiopianMobileAttribute : ValidationAttribute
{
    private static readonly Regex PhoneRegex =
        new(@"^(?:\+251|0)(?:7|9)\d{8}$", RegexOptions.Compiled);

    public EthiopianMobileAttribute()
    {
        ErrorMessage = "Enter a valid Ethiopian mobile number.";
    }

    public override bool IsValid(object? value)
    {
        if (value is not string phone)
            return false;

        return PhoneRegex.IsMatch(phone);
    }
}
