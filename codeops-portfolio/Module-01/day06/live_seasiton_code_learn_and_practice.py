#Solid clearn code

# 3 design Patter  (common solutions)

# S => one class should have one job

# class Report:
#     def create_report(self):
#         print("crater report")
#     def save_report(self):
#         print("save report")
#     def send_report(self):
#         print("send report")
    
# class Report:
#     def create_report(self):
#         print("crater report")

# class SaveReport:
#     def save_report(self):
#         print("save report")

# class SendReport:
#     def send_report(self):
#         print("send report")

# each have responsibility

# open / closed (ocp)

# class Shape:
#     def area(self, kind):
#         if kind == "circle":
#             return 3.14 * 5 * 5
        

# # -----------------------
# class Shape:
#     def area(self):
#         pass

# # --------------------

# class Circle(Shape):
#     def area(self):
#         return 
    
# 

#Liskov substitution
# chile class shold work anyware the parent class works

# class Account:
#     def withdraw(self):
#         print("test")

# class SavingAccount(Account):
    

# class CheckingAccount(Account):
#     pass

# accounts = [SavingAccount(), CheckingAccount()]

# for obj in accounts:
#     obj.withdraw()


#interface Segregation

# class Machine:
#     def print(self):
#         pass
#     def scan(self):
#         pass
#     def fax(self):
#         pass

# class New_printer(Machine)  #መስራት የሌበት ወይም ማይችለው በግዴታ ስንሰጠው

# class Printer:
#     def print(self):
#         pass

# class Scanner:
#     def scan(self):
#         pass
# class Fax:
#     def fax(self):
#         pass


# class New_print(Printer, Scanner)


# class Notifcation:
#     def __init__(slef):
#         self.sms = SMS()

# # specific depedent 
    
# class Notifcation1:
#     def __init__(slef):
#         self.service = service

# service1 = Notifcation1(Email())

# class A:

#     def b(self):
#         pass

# test1 = A()
# test2 = A()

# print(id(test1))
# print(id(test2))

# class BankConfig:
#     _instance = None # ባሆ የሆነ instance variable for remember purpose
#     def __new__(cls): #overite of default python method
#         if cls._instance is None: # ባዶ ነው ወይስ አይደለም
#             cls._instance = object.__new__(cls)  # ባዶ የነበረው ተቀብለ
#             cls._instance.interest_rate = 0.05
#             cls._instance.overdraft_limit = 1000
#         return cls._instance
    
# y = BankConfig()   # recive object 1
# z = BankConfig()   

# print(id(y))
# print(id(z))




# __new__    create object cls class 
# __init__   initialse to object  self  object


# object.__new__(cls)
# __new__(cls)

#super()  = parent class 
# object.__new__

class SavingAccount:
    def __new__(self,owner,number,balance):
        self.owenr = owner
        self.number = number
        self.balance = balance

    def show(self):
        return self.balance
    
class adfkljadfjkladfkjldasfjklasdfjklasdfjkasdf: #saving
    def __new__(self,owner,number,balance):
        self.owenr = owner
        self.number = number
        self.balance = balance

    def show(self):
        return self.balance + 50
    

# class AccountFactory:
#     @staticmethod
#     def create(kind, owner, number, balance=0):
#         if kind == "savings":
#             return adfkljadfjkladfkjldasfjklasdfjklasdfjkasdf(owner, number, balance)
#         if kind == "current":
#             return CurrentAccount(owner, number, balance)

    
#         raise ValueError(f"Unknown type: {kind}")
# acc = AccountFactory.create("savings", "Almaz", "CBE-1", 1500)


# class Account:
#     def __init__(self, balance):
#         self.balance = balance
#         self._observers = [obj]

#     def subscribe(self, obs):  # ኦብጀክት እየተቀበለ empty ላይ ያስገባቸዋል
#         self._observers.append(obs)
#         print(self._observers)

#     def _notify(self, event):
#         for obs in self._observers: #polymorphis
#             obs.update(event)
            


#     def withdraw(self, amount):
#         self.balance -= amount
#         self._notify(f"-{amount} ETB")

# class SMSAlert:
#     def update(self, event):
#             print(f"\n[TeleBirr SMS] {event}")
# class AuditLog:
#     def update(self, event):
#         print(f"[Log] {event}")

# acc = Account(5000)

# acc.subscribe(SMSAlert())  #obs ብሎ ሊስት ላይ አስቀምጦታል
# acc.subscribe(AuditLog())  #obs ብሎ ሊስት ላይ ያስቀምጠዋል
# acc.withdraw(5000) # both observers fire





#task 1
# Spot the SRP violation. Take a Report class that builds, saves, and emails a report. Split it
# into three focused classes.

# class Report:
#    def build_report():
#         pass
#    def seva_report():
#         pass
#    def email_report():

# class Report():
#     pass

# class SaveReport():
#    pass

# class EmailReport():
#    pass

# class strong_reporter(SaveReport, EmailReport)


#task 2
# Refactor to OCP. Replace an if/elif that prints a shape's area by shape type with a small
# class hierarchy and one method.




