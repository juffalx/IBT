#Work through these in a file called day07/practice.py. Run each one and check the output before
# moving on

#---------------------------------task 1------------------------------


#  Name the Big-O. For five short snippets (a list index, a single loop, a nested loop, a dict
# lookup, a binary search), write the Big-O of each as a comment and explain why.
import time   # for visualise taking time for Big-O

number = [1,2,3,4,5,6,7,8,9,10]
char = ['a','b','c','d','e','f']

target_index = 9
start = time.time()
print(f"target is => {number[target_index]}")
#first snipit of list index
end = time.time()

print(f"taking time of list index is {end - start} ")
#see in terminal screen
# target_index is => 10
# taking time of list index is 0.002704143524169922 

" in terminal i see 0.0 and this is very little time b/c it's uses Big-o of o(1) b/c directly get by index number and print it"


#single loop
target = 8
count = 0
for num in number:
    count = count + 1
    if num == target:
        print(f"Found target {target}")
        break

#nested
target_num = 9
target_char = 'f'

for i in number:
    for j in char:
        if i == target_num and i == target_char:
            print(f"we Found Target {target_num}:{target_char}")
            break
#this is double nested loop and Big-o  O(n2) b/c every j item is loop of every i time this is very high complex of time uses in memory if number of order is very high like in milion

#dic
dic = {
    "first":1,
    "second":2,
    "third":3,
    "fourth":4
       }
print("third" in dic)

# this is Big-o   o(1) b/c not search every value it's get , it's address or refferece by memory and compair to target

#binary search have a list 

left = 0  # b/c first index is always 0 in list
right = len(number) - 1  # last index is always length of list - 1 
found = False

while left <= right:  #  v4
    mid = (left + right) // 2

    if number[mid] == target:
        print("Element found at index", mid)
        found = True
        break
    elif number[mid] < target:  # መሀል ላይ ያለው ቁጥር ከ target ሚያስን ከሆነ ወደግራ ይሄዳል ሚበልጥ ከሆነ ወደቀኝ ይሄዳልም ክክንያቱም binary search ሚሰራው order የሆነ ሊስት ላይ ነው list is order 
        left = mid + 1
    else:
        right = mid - 1

if not found:
    print("target not found")


# -------------------task 2 --------------
# . List vs. dict lookup. Build a list and a dict of 100,000 fake account numbers. Time how long it
# takes to find one near the end in each.

list_number = []
dic_number = {}


# List create 10,000 account number
accounts_list = [f"Acount_{i}" for i in range(100000)]

# Dictionary
accounts_dict = {f"Acount_{i}": i for i in range(100000)}

target = "Acount_99999"



#find using list
start = time.time()
target in accounts_list  # in terminal i see 0.0010519027709960938 time
end = time.time()

print(f"and taking time is {end - start}\n")



#find using Dictionary
start_for_dic = time.time()
target in accounts_dict   # in terminal i see 0.0 time
end_for_dict = time.time()
print(f"and taking time is {end_for_dict - start_for_dic}\n")


# ------------------------- task 3 ------
# 3. Build a stack. Write a Stack class with push, pop, and peek, and use it to reverse a list of
# names.

number = [1,2,3,4]
class Stack:
    def push(user_list,value):
        user_list.append(value)

    def pop(user_list,value):
        user_list.pop(value)

    def peek(user_list,value):
        user_list[(value-1)]

    def reverse_list(user_list):
        if user_list is  None:
            raise ValueError("Please Enter List In Object Creation or In reverse_list's")
        
        rv_list = [i for i in range(len(user_list)-1, 0 ,-1)]
        return rv_list
            
    
#check all stacks 
push = Stack.push([1,2], 5)
print(push)

pop = Stack.pop([1,2], 1)
print(pop)

peek = Stack.peek([1,2,3,4], 3)
print(peek)

reverse = Stack.reverse_list([1,2,3,4])
print(reverse)

# Build a queue. Use collections.deque to model a bank service line: enqueue five customers,
# then serve them in order.
# -------------------- task 4 ---------------------

from collections import deque as q

bank_service_line = q()
count = 1
for i in ["mame","nati","sami","abdre","amir"]:
    bank_service_line.append(i)
    print(f"{i} Enter number {count} ")
    count += 1
print("deque by First In First Out \n\n")
count = 1
for i in bank_service_line:
    print(f"{i} service number {count} ")
    count += 1



# . Singly linked list. Implement a Node and a LinkedList with push_front and a print_all() that
# walks the chain

# ------------------------- task 5 -------------------------------

# . Singly linked list. Implement a Node and a LinkedList with push_front and a print_all() that
# walks the chain

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, value):
        new_node = Node(value) # አዲስ ኖር ክሬት አድርጎ ይሰጠዋል

        new_node.next = self.head  # አዲስ create ያደረግነው node አሁን ላይ ያለውን head refere ያደርግልናል

        
        self.head = new_node # ሄዱን አሁን ይቀበላል .next ደግሞ push ስናደርግ  degmo እዚጋ ያለውን .head ለሚመጣው .next ይሰጠዋል 

    def print_all(self):
        values = self.head

        while values is not None:
            print(f"numbers {values.value}")
            values = values.next




numbers = LinkedList()

numbers.push_front(30)

numbers.push_front(40)


numbers.print_all()






