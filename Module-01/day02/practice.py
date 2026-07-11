# Practice code for day 2

def temprature_label(temp):
    if temp < 15:
        return "cold"
    elif temp >= 15 and temp <= 28:
        return "warm"
    else:
        return "hot"


for i in range(1 ,11):
    print(f"Recipt {i}")

for num in range(1, 20):
    if num % 2 == 0:
        print(num)


def discount_price(price, percent=10):
    return price - (price * percent / 100)

count = 5

while(count > 0):
    print(f"{count} Liftoff!")
    count -= 1

tempreture = temprature_label(10)

discount = discount_price(200)

print(tempreture)

#with Default
print(f"with Default Test 10% {discount_price(200)}")

#without default
print(f"without Default Test and 50% {discount_price(200, 50)}")