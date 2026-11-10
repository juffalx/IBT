
// 2. Ask the customer for a name, a mobile network (Ethio Telecom or Safaricom),
// and a top-up amount in ETB.

Console.WriteLine("Please Enter Your Name:");
var Name = Console.ReadLine() ?? "unknown";

Console.WriteLine("Please Enter Your Mobile Network (Ethio Telecom or Safaricom");
var MobileNetwork = Console.ReadLine() ?? "unknown";

Console.WriteLine("Please Etner Your Top-up Amount In ETB:");
var TopUpAmount = Console.ReadLine() ?? "unknown";

//3. Parse the amount with TryParse. Reject anything that is not a number,
//is zero or negative, or is above 5,000 ETB.

if(!decimal.TryParse(TopUpAmount, out decimal topUp) || topUp > 5000 || topUp <= 0 )
{
    Console.WriteLine($"Rejected");
    return;
}

//3. Use a switch expression to set a bonus: Ethio Telecom gives 5%,
//Safaricom gives 3%, anything else gives 0%.

var bonus = MobileNetwork switch
{
    "Ethio Telecom" => 0.05m * topUp,
    "Safaricom" => 0.03m * topUp,
    _ => 0m
};

//4. Amounts of 1,000 ETB or more get an extra 20 ETB on top of the bonus.


decimal finalCredit = topUp >= 1000m ? topUp + bonus + 20m : topUp + bonus;

//Print a receipt: name, network, amount, bonus, and final credit —
//each formatted with N2 and aligned in a column.

Console.WriteLine($"Nmae:            {Name}");
Console.WriteLine($"Network:         {MobileNetwork}");
Console.WriteLine($"Amoutn:          {topUp:N2} ETB");
Console.WriteLine($"Bonus:           {bonus,10:N2} ETB");
Console.WriteLine($"Final Credit     {finalCredit,10:N2} ETB");