# Count Even Numbers problem 1
#problem  is accept multiple unlimited data and count even number and print

def count_evens(numbers):
    count = 0

    for number in numbers:
        if number % 2 == 0:
            count += 1

    return count


user_input = input("Enter Number each one separated by spaces: ")

numbers = []

for value in user_input.split():
    numbers.append(int(value))

result = count_evens(numbers)

print("total even numbers:", result)