#reverse string words 

def reverse_word(text):
    revese_text = ""
    for character in text:
        revese_text = character + revese_text

    return str(revese_text)

user_text = input("Enter text: ")
print(f"reverse of {user_text} is {reverse_word(user_text)}")

