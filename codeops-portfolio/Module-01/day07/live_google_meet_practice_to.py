# # 1. Book class. Define Book with title, author, and pages. Add a describe() method that prints a
# # one-line summary. Create two books.

# # ---------------- Task 1 ------------

# class Book:
#     def __init__(self,title,author,pages):
#         self.title = title
#         self.author = author
#         self.pages = pages
    
#     def describe(self):
#         print(f"Title: {self.title} | Author: {self.author} | Pages: {self.pages}")

# #create object's
# book_one = Book("fikr","addis",250)

# book_one.describe()

# # #2. Product class. Define Product with name, price (ETB), and quantity. Add restock(n) and
# # sell(n) methods that change the quantity.

# #---------------- task 2---------------

# class Product:
#     def __init__(self,name,price,quantity):
#         self.name = name
#         self.price = price
#         self.quantity = quantity
    

#     def restock(self,n):
#         self.quantity += n
#         print(f"stock quantity is {self.quantity}")

#     def sell(self,n):
#         self.quantity -= n
#         print(f"sell quantity is {self.quantity}")

# # #test task 2
# product_one = Product("rice",100,10)

# product_one.restock(200)
# product_one.sell(150)


# # 3. Make it private. Change quantity to a private __quantity and add a @property getter for it.

# # -------------------------- task 3 -------------

# class Product:
#     def __init__(self,name,price,quantity):
#         self.name = name
#         self.price = price
#         self.__quantity = quantity #private
    
#     @property   #getter  quantity
#     def aaa(self):
#         print(self.__quantity)

#     def restock(self,n):
#         self.__quantity += n
#         print(f"stock quantity is {self.__quantity}")

#     def sell(self,n):
#         self.__quantity -= n
#         print(f"sell quantity is {self.__quantity}")

# # # test task 2
# product_one = Product("rice",100,10)

# product_one.restock(200)
# product_one.sell(150)

# product_one.aaa

# # 4. Validate. Add a setter (or guard in sell) that refuses to let the quantity go below zero.

# # ------------------ task 4 -----------------------

# class Product:
#     def __init__(self,name,price,quantity):
#         self.name = name
#         self.price = price
#         self.__quantity = quantity #private
    
#     @property   #getter  quantity
#     def quantity(self):
#         return (self.__quantity)

#     @quantity.setter
#     def quantity(self, n):
#         if n < 0:
#             print("Can not Set Quantity")
#         else:
#             self.__quantity = n

#     def restock(self,n):
#         self.__quantity += n
#         print(f"stock quantity is {self.__quantity}")

#     def sell(self,n):
#         if n > self.__quantity:
#             print("inseficetn Quantityt")
#         else:
#             self.__quantity -= n
#             return (f"sell quantity is {self.__quantity}")

# # # task 5
# # Prove independence. Create three Product objects, change one, and show the other two are
# # unaffected.


# product_one = Product("phone",10000,14)
# product_two = Product("Laptop", 15000,20)
# product_three = Product("Tv", 20000, 18)

# print("Before Change:")

# print(f"{product_one.name} : {product_one.quantity}")
# print(f"{product_two.name} : {product_two.quantity}")
# print(f"{product_three.name} : {product_three.quantity}")

# product_three.sell(5)
# print("After Change")


# print(f"{product_one.name} : {product_one.quantity}")
# print(f"{product_two.name} : {product_two.quantity}")
# print(f"{product_three.name} : {product_three.quantity}")


# import time

# start = time.time() # start the time


# number = [1,2,3]

# for i in range(1,100000000):
#     1+1
# end = time.time()


# print(end - start)

# o(1) = very fast
# o(n) = በ value 
# o(n ** 2) = nested loop x * y 
# o(log10) = binary search 



# empty_list[5000]  => o(1) => get by idnex and get value
#binary serach 
    # order value
    # taret = 300

#     10,000 // 2 
# left = 5000


# target < left
# 300 < 5000

# 5000 // 2 

# left = 2500
# # right = 2500

# left < 2500

# 2500 // 2

# 300 < 1250

# using list loop = 300 
# using binary serach = 13

# binary = order value





# accounts = [acc0, acc1, acc2,acc3]

# accounts[2] # O(1) — jump straight to it
# accounts.append(acc) # O(1)* — amortised (occasionally resizes)
# accounts.insert(0, x) # O(n) — every later item shifts worst case
# x in accounts # O(n) — may check every item


#linked list

# lists = [1,2,3,4]

# print(id(lists[0]))
# print(id(lists[1]))
# print(id(lists[2]))
# print(id(lists[3]))



# class Node:
#     def __init__(self, data):
#         self.data = data
#         self.next = None # points to the next node
#         self.prev = None
    
    
# head = Node("acc1")
# head.next = Node("acc2") # acc1 -> acc2 -> None


# balance_1 = 10

# acc2 = Node("acc2")
# acc2.prev= balance_1

# balance_1 = 150

# acc3 = Node("acc3")
# acc3.prev = balance_1
# acc3.next = Node("acc4")


# print(acc3.next)




#__name__ = __main__ using name in if condition for if we inport from another file and without using this main all code here is automatically 
# ecute 
