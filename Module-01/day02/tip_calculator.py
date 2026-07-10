#telebirr tip calculator

#step 1 , store a bill total and number of people

total_bill = 9300
people = 3

#step 2 and 3 write functin split_bill and add total and tip_rate parameter and return per-person values

def split_bill(total, tip_rate=0.2):
    total_plus_tip = total + (total * tip_rate)
    per_person = total_plus_tip / people
    return per_person
    

#step 4 loop over a list of name and print it with each name with shared bills


friends = ["Mohammed", "Amir", "Eliyas"] #list for 3 person name of my friend



for name in friends:
    print(f"{name} Share bill is {split_bill(total_bill) } Birr  ")

