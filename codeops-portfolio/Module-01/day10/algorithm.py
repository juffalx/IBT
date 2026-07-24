#!!? i use every functin name to snake_case b/c python uses snake_case

# ---------------------------------quastion 1-------------------

def get_only_even(num):
    result = []

    for i in range(len(num)): #eyandandun pick eyaderege
        if i % 2 == 0 and num[i] % 2 == 0: #even mehonachewn ena index numberachew even mehonun check yadergal
            result.append(num[i]) # keza result wst append yadergutal

    print(result)
# --------------------------------- test quastin 1-----------------------------
print("  \n\n----------- \quastin 1 test-------------\n")

get_only_even([1, 2, 3, 6, 4, 8])  #i use snake case for functionss name
get_only_even([0, 1, 2, 3, 4])

# ---------------------------------quastion 2-------------------

def reverse_compair(number):
    first_digit = number // 10 # it's give first number b/c eliminate after . only intiger number return
    second_digit = number % 10 # get second number like in remainder 

    reverse_number = second_digit * 10 + first_digit # second number ye10 bet last number ye1 bet yadergachewal
    if number > reverse_number:
        print(f"\n\nOk because {number} > {reverse_number}")
    else:
        print(f"Not ok, becouse {number} is not greaterthatn {reverse_number}")
# --------------------------------- test quastin 1-----------------------------
print("  \n\n----------- \quastin 2 test-------------\n")

#test  quastion number 2
reverse_compair(72)
reverse_compair(23)

# ---------------------------------quastion 3-------------------

#using recursive function
def return_factorial(number):
    if number == 1:
        return 1 # this is base case b/c everny number is last possitive is 1 and result is same
    elif number == 0:
        return 0

    return number * return_factorial(number - 1)
    
# --------------------------------- test quastin 3-----------------------------
print("  \n\n----------- \quastin 3 test-------------\n")
# print(return_factorial(3))
print(return_factorial(6))
print(return_factorial(5))
print(return_factorial(0))



# ---------------------------------quastion 4-------------------

def check_meera(items):
    # two_times_value = [num for num in items if True num * 2]
    # print(two_times_value)
    Found = False
    for num in items:
         
        if num != 0 and num * 2 in items:
            Found = True
            break
    if Found:
        print(f"I am NOT a Meera array, because {num} * 2 is {num * 2} ")
    else:
        print(f"I am a Meera array")
# --------------------------------- test quastin 5-----------------------------
print("  \n\n----------- \quastin 4 test-------------\n")

check_meera([10,4,0,5])
check_meera([7,4,9])
check_meera([1,-6,4,-3])



# ---------------------------------quastion 5-------------------

def is_dual(items):

    counts = {} # for store value and for every repititive value it's add and for single value it's save and b/c of key is same as value 

    for num in items:
        if num in counts:
            counts[num] += 1
        else:
            counts[num] = 1

    for value in counts.values():
        if value != 2:
            return 0

    return 1

# --------------------------------- test quastin 5-----------------------------
print("  \n\n----------- \quastin 5 test-------------\n")

print(is_dual([1,1,2,2,3,3]))
print(is_dual([4,2,2,3,3]))



# --------------------------------- quastin 6 -----------------------------


def digital_clock(seconds):

    #1 minute = 3600 second and 1 day 24 or 24 * 3600 so 
    seconds = seconds % (24 * 3600)

    hours = seconds // 3600 
    seconds = seconds % 3600 # keneteb buhala yalew lemasqemet

    minutes = seconds // 60
    seconds = seconds % 60

    return f"{hours:02}:{minutes:02}:{seconds:02}"

# --------------------------------- test quastin 6 -----------------------------
print("  \n\n----------- \quastin 6 test-------------\n")

print("\n\n")
print(digital_clock(5025))
print(digital_clock(61201))
print(digital_clock(87000))