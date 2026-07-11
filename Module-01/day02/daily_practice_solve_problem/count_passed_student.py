def count_passed_students(grade):
    passed_count = 0
    for item in grade:
        # ፊደሉን ወደ ትንሽ (lower) ቀይረን 'f' አለመሆኑን ማረጋገጥ
        if item.lower() != "f": 
            passed_count += 1
    return passed_count


grade_input = input("Enter Grade of list separate by , coma: ")
grades= []
for i in grade_input.strip().split(","):
    
    grades.append(i)

#print grades
print(grades)
passed_Student = count_passed_students(grades)
print(passed_Student)