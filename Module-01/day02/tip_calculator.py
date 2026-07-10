#telebirr tip calculator

#step 1 , store a bill total and number of people

total_bill = 10000
people = 2

#step 2 write functin split_bill
def split_bill(total, tip_rate=0.2):
    total_plus_tip = total + (total * tip_rate)
    per_person = total_plus_tip / people

    per_person = int(per_person)
    return per_person
    

#step 4


friends = ["mame", "ela"] #list 



for name in friends:
    print(" Share is {5 + 5 } birrr")

