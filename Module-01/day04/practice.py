#---------------- task 1----------------------
#Book class. Define Book with title, author, and pages. Add a describe() method that prints a
#one-line summary. Create two books

class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        print(f"Title: {self.title}, Author: {self.author}, Pages: {self.pages}")

#define object
book_1 = Book("the_thinker", "Mamulex", 200)
book_2 = Book("for_future", "Mamulex", 546)

#print the summeray
book_1.describe()
book_2.describe()
#-----------------------------------------------------------------------------


#----------------------------------task 2--------------------------------------
#Product class. Define Product with name, price (ETB), and quantity. Add restock(n) and
#sell(n) methods that change the quantity.

class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    def restock(self, n):
        self.quantity += n
        print(f"Restocked {n} units of {self.name}. New quantity: {self.quantity}")

    def sell(self, n):
        self.quantity -= n
        print(f"Sold {n} units of {self.name}. remaining quantity: {self.quantity}")

#define object
product_1 = Product("Coffee", 1200, 50)

#test restock and sell
product_1.restock(10)
product_1.sell(15)
print(f"{product_1.name} price: {product_1.price} ETB, quantity: {product_1.quantity}")
#-----------------------------------------------------------------------------


#----------------------------------task 3--------------------------------------
#Make it private. Change quantity to a private __quantity and add a @property getter for it.

class Product2:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    def restock(self, n):
        self.__quantity += n
        print(f"Restocked {n} units of {self.name}. New quantity: {self.__quantity}")

    def sell(self, n):
        self.__quantity -= n
        print(f"Sold {n} units of {self.name}. Remaining quantity: {self.__quantity}")

#define object
product_2 = Product2("Tea", 80, 30)
product_2.restock(5)
print(f"{product_2.name} quantity (via property): {product_2.quantity}")
#-----------------------------------------------------------------------------


#----------------------------------task 4--------------------------------------
#Validate. Add a setter (or guard in sell) that refuses to let the quantity go below zero.

class Product3:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    @quantity.setter
    def quantity(self, value):
        if value < 0:
            print(f"Cannot set quantity below zero for {self.name}.")
        else:
            self.__quantity = value

    def restock(self, n):
        self.quantity = self.__quantity + n
        print(f"Restocked {n} units of {self.name}. New quantity: {self.__quantity}")

    def sell(self, n):
        if n > self.__quantity:
            print(f"Cannot sell {n} units of {self.name}. Only {self.__quantity} in stock.")
        else:
            self.quantity = self.__quantity - n
            print(f"Sold {n} units of {self.name}. Remaining quantity: {self.__quantity}")

#define object and test the guard
product_3 = Product3("Sugar", 60, 10)
product_3.sell(15)   # should refuse, not enough stock
product_3.sell(5)    # should work fine
print(f"{product_3.name} final quantity: {product_3.quantity}")
#-----------------------------------------------------------------------------


#----------------------------------task 5--------------------------------------
#Prove independence. Create three Product objects, change one, and show the other two are
#unaffected.

product_a = Product3("Rice", 100, 20)
product_b = Product3("Oil", 250, 15)
product_c = Product3("Salt", 30, 40)

print("Before change:")
print(f"{product_a.name}: {product_a.quantity}")
print(f"{product_b.name}: {product_b.quantity}")
print(f"{product_c.name}: {product_c.quantity}")

#change only product_a
product_a.sell(5)
product_a.restock(2)

print("After changing only Rice:")
print(f"{product_a.name}: {product_a.quantity}")
print(f"{product_b.name}: {product_b.quantity}")
print(f"{product_c.name}: {product_c.quantity}")
#-----------------------------------------------------------------------------