#----------------------------------------------------------------------------
# Goad Extend Yes
#----------------------------------------------------------------------------

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self._observer = []

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        
        self.__balance += amount
        self._notify(self.statement())

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Entered Amount must be positive")

        if amount > self.__balance:
            raise ValueError("Insufficient funds for this withdrawal")

        self.__balance -= amount

        self._notify(self.statement())

    def statement(self):
        return (f"Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB")

    def subscribe(self, obj):
        self._observer.append(obj)
    
    def _notify(self, event):
        for obj in self._observer:
            obj.show(event)



"""----------------------------------------------------------------------------
do day05 project
for saving we use rate=0.05 for default value
----------------------------------------------------------------------------"""


class SavingAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        super().__init__(owner, number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)
        print(f"Added {interest} ETB interest.")

    def statement(self):
        return (f"Type: Saving | Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB | interest_rate: {self.rate}")



class CheckingAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft_limit=10000):
        super().__init__(owner, number, balance)
        self.overdraft_limit = overdraft_limit

    def statement(self):
        return (f"Type: Checking | Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB | overdraft_limit: {self.overdraft_limit}")


    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Entered negative or zero number")

        if amount > (self.balance + self.overdraft_limit):
            raise ValueError("Exceeded overdraft limit")

        self._Account__balance -= amount

        self._notify(self.statement())



#---------------------  let's check the code ------------------#


# Account1 = SavingAccount("Mamulex", 1001, 2000, 0.1)
# Account2 = CheckingAccount("Abdre", 1002, 4000)


# #let's check both Balance

# Account1.statement()
# Account2.statement()


# #let's add balance to account 1

# Account1.deposit(500)


# print()

# #let's check its balance

# Account1.statement()


# print()

# # add interest

# Account1.add_interest()


# print()


# # test overdraft

# try:
#     Account2.withdraw(30000)
# except ValueError:
#     print("work correctly b/c account have not much money")


#--------------------- polymorphism test ------------------#

# accounts = [Account1, Account2]

# for account in accounts:
#     account.statement()


"""  ----------------------------------------------------------------------------
do day06 project  exersice's 
# Larger Project — Refactor with Patterns
The project levels up today. Your account family works; now make it clean and extensible.
Copy your day05/accounts.py into day06/, then refactor with SOLID and wire in three patterns
----------------------------------------------------------------------------"""


class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
       
        return cls._instance



class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0, rate=0, overdraft_limit=0):
        config = BankConfig()

        if rate == 0:
            rate = config.interest_rate

        if overdraft_limit == 0:
            overdraft_limit = config.overdraft_limit

        if kind == "saving":
            return SavingAccount(owner, number, balance, rate)
        elif kind == "checking":
            return CheckingAccount(owner, number, balance, overdraft_limit)
        else:
            raise ValueError("Enter Valid Kind's")



class SMSAlert:
    def show(self,event):
        print(f"[Sms Alert]  {event}")



class AuditLog:
    def show(self, event):
        print(f"\n[--> Audit Log <--]\n{event}")



Acc1 = AccountFactory.create(
    "checking",
    owner="mame",
    number=1001,
    balance=2000,
    overdraft_limit=1000
)


Acc1.subscribe(SMSAlert())
Acc1.subscribe(AuditLog())


Acc1.withdraw(200)

