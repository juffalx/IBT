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

"""day 07 project 
Larger Project — The Account Registry
The project scales today. Your bank models accounts well; now make it hold and find many of
them efficiently. Copy your day06/bank.py into day07/, then add a registry that stores accounts
in a dict for O(1) lookup and gives each account a transaction-history stack. Push the result to
your day07 folder before Day 8, where you'll search and sort these accounts.
"""

# A worked start
class AccountRegistry:
    def __init__(self):
        self.by_number = {} # number -> Account (O(1) find)
        self.order = [] # insertion order for listing

    def add(self, acc):
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)

    def find(self, number):
        return self.by_number.get(number) # O(1)
        # TODO: list_all(); per-account history stack; undo_
        
    def list_all(self):
        accounts = [] 
        for number in self.order:
            accounts.append(self.by_number[number])
            return accounts

    def add_history(self, number):
        self.history[number] = []



    def deposit(self, number, amount):
        account = self.find(number)
        account.deposit(amount)
        self.history[number].append(
            {
                "type": "deposit",
                "amount": amount
            }
        )

    def withdraw(self, number, amount):
        account = self.find(number) # 
        account.withdraw(amount)
        self.history[number].append(
            {
                "type": "withdraw",
                "amount": amount
            }
        )



    def undo_last(self, number):
        transaction = self.history[number].pop()
        account = self.find(number)
        if transaction["type"] == "deposit":
            account.withdraw(transaction["amount"])


        elif transaction["type"] == "withdraw":
            account.deposit(transaction["amount"])

#check code work or not

registry = AccountRegistry()


Account1 = AccountFactory.create(
    "saving",
    "Mamulex",
    1001,
    5000
)

Account2 = AccountFactory.create(
    "checking",
    "Abdre",
    1002,
    3000
)


registry.add(Account1)
registry.add(Account2)


registry.history = {}

registry.add_history(1001)
registry.add_history(1002)

registry.deposit(1001,500)

registry.withdraw(1001,1000)


print(registry.find(1001).statement())


registry.undo_last(1001)


print(registry.find(1001).statement())



for account in registry.list_all():

    print(account.statement())