# that takes a list of customers (name and TeleBirr balance in ETB),
#assigns each a tier, and prints a tidy report — plus a summary count of how many customers fall in
#each tier...

customers = [
("Almaz", 1500), ("Dawit", 700), ("Tigist", 200),
("Hanna", 1200), ("Samuel", 450),
]

def tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    else:
        return "Basic"
    
for name, balance in customers:
    print(f"{name}: {tier(balance)} ({balance} ETB)")

Premium = 0
Standard = 0
Basic = 0

for name,balance in customers:
    value = tier(balance)
    if value == "Premium":
        Premium += 1
    elif value == "Standard":
        Standard += 1
    else:
        Basic += 1

print(f"\n\n{Premium} number in Premium tier")
print(f"{Standard} number in Standard tier and ")
print(f"{Basic} number in Basic tier")