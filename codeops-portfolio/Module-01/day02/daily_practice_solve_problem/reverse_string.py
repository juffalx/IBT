#reverse string words 

def reverse_word(text):
    reverse_text = ""
    for character in text:
        reverse_text = character + reverse_text

    return reverse_text

user_text = input("Enter text: ")
print(f"reverse of {user_text} is {reverse_word(user_text)}")