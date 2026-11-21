


List<string> customers = new();
List<string> networks = new();
List<decimal> amounts = new();

List<decimal> bonuses = new();
decimal grandTotal = 0;

for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"\nCustomer {i + 1}");

    Console.Write("Customer name: ");
    string name = Console.ReadLine() ?? "";

    Console.Write("Network (Ethio Telecom / Safaricom): ");
    string network = Console.ReadLine() ?? "";

    decimal amount;

    while (true)
    {
        Console.Write("Amount (ETB): ");
        string input = Console.ReadLine() ?? "";

        if (decimal.TryParse(input, out amount)
            && amount > 0 && amount <= 5000)
        {
            break;
        }

        Console.WriteLine("Invalid amount. Enter a value from 0.01 to 5000.");
    }

    customers.Add(name);
    networks.Add(network);
    amounts.Add(amount);
}

Console.WriteLine("\n TOP-UP REPORT ");

Console.WriteLine(
    $"{"Customer",-15} {"Network",-18} {"Amount",10} {"Bonus",10} {"Total",10}");

for (int i = 0; i < customers.Count; i++)
{
    decimal bonusRate = networks[i] switch
    {
        "Ethio Telecom" => 0.05m,
        "Safaricom" => 0.03m,
        _ => 0m
    };

    decimal bonus = amounts[i] * bonusRate;

    if (amounts[i] >= 1000)
    {
        bonus += 20m;
    }

    decimal total = amounts[i] + bonus;

    bonuses.Add(bonus);
    grandTotal += total;

    Console.WriteLine(
        $"{customers[i],-15} {networks[i],-18} " +
        $"{amounts[i],10:F2} {bonus,10:F2} {total,10:F2}");
}

Console.WriteLine("---");
Console.WriteLine($"{"GRAND TOTAL",-45}{grandTotal,10:F2} ETB");
