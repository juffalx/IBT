# Count Even Numbers problem 1
#problem  is accept multiple unlimited data and count even number and print

def count_evens(numbers):
    count = 0

    for number in numbers:
        if number % 2 == 0:
            count += 1

    return count

def filter_evens(numbers):
    temp_evens = []
    for num in numbers:
        if num % 2 == 0:
            temp_evens.append(num)
    
    return temp_evens




user_input = input("Enter Number each one separated by spaces: ")
print_output_user_input = input("if you want filter the even number press y or for skip click any key")
numbers = []

for value in user_input.split():
    numbers.append(int(value))

result = count_evens(numbers)

print("total even numbers:", result)


if print_output_user_input == "y" or "Y":
    status = True

if status:
    print(f"value is here {filter_evens(numbers)}")
