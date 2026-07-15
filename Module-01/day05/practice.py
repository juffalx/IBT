# ---------------------------------------
#Day05 Task 1
#1. Vehicle hierarchy. Make a Vehicle base class with make, model, and a describe() method.
#Add Car and Truck subclasses.
#------------------------------------------
from abc import abstractmethod


#Vehicle base class
class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model
    
    #describe() method
    def describe(self):
        print(f"this car is made by {self.make} and model is {self.model}")
    
class Car(Vehicle):
    def __init__(self,make,model):
        super().__init__(make,model)
        
    def describe(self):
        print(f"this car is Trunk type by {self.make} and model is {self.model} and \n Typically has four wheels and seats between 1 and 8 passengers.")


class Truck(Vehicle):
    @abstractmethod

    def __init__(self,make,model):
        super().__init__(make,model)
        
    def describe(self):
        print(f"this car is Trunk type by {self.make} and model is {self.model} and \n Used to securely store luggage, groceries, spare tires, and emergency toolkits.\n")
    
    def wheels(self):
        ...

# get car make and model name from the wiki for real data

vehicles = [
    Truck("Ford", "F-150"),
    Car("Honda", "Civic"),
    Truck("Chevrolet", "Silverado 1500"),
    Car("BYD", "Seal"),
    Truck("Ram", "1500"),
    Car("Subaru", "Outback"),
    Truck("GMC", "Sierra 1500"),
    Car("Tesla", "Model 3"),
    Truck("Nissan", "Frontier"),
    Car("BYD", "Atto 3")
]

for vehicle in vehicles:
    vehicle.describe()


#crate sub class frm truck class

class Two_While_Truck(Truck):
    def __init__(self,make,model):
        super().__init__(make,model)
    
    def wheel(self):
        return f" this {self.model} is 2 Wheel Truck's "

class Four_While_Truck(Truck):
    def __init__(self,make,model):
        super().__init__(make,model)
    
    def wheel(self):
        return f" this {self.model} is 4 Wheel Truck's "
#nwe line for abstract sub class test
print("\n\n\n")

#check Polymorphism working in abstract wheel method
Isuzu = Two_While_Truck("Isuzu", "NPR")
Ford = Four_While_Truck("Ford","F-650")

for vec in [Isuzu, Ford]:
    print(vec.wheel())