namespace AddisEats.Services.Clock;

public class Clock : IClock
{
    public  DateTime CheckTime()
    {
        return DateTime.UtcNow;
    }
}