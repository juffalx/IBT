#problem 4 vowel counter

#create function of count vowel and accept word and return counting vowel using for loop
def count_vowels(word):
    vowels= "auieoAUIEO"
    count = 0

    for character in word:
        if (character in vowels):
            count += 1
    return count

user_input = input("Enter text for counting vowels: ")
print(f"vowels of {user_input} is {count_vowels(user_input)} ")