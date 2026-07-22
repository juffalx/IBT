#Factorial Calculator for daily problem 3

user_number = int(input("please Enter Possitive Intiger number: "))

def calculate_factorial(number):
    if (number <= 0):
        return "Factorial is not defined for negative numbers."
    
    sum = 1
    for num in range(1, number + 1):
        sum = sum * num

    return sum

print(f"factorial of {user_number} is {calculate_factorial(user_number)}")