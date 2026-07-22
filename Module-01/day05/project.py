#----------------------------------------------------------------------------
# Goad Extend Yes
#----------------------------------------------------------------------------

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Entered Amount must be positive")

        if amount > self.__balance:
            raise ValueError("Insufficient funds for this withdrawal")

        self.__balance -= amount

    def statement(self):
        print(f"Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB")



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
        print(f"Type: Saving | Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB | interest_rate: {self.rate}")

class CheckingAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft_limit=10000):
        super().__init__(owner, number, balance)
        self.overdraft_limit = overdraft_limit

    def statement(self):
        print(f"Type: Checking | Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB | overdraft_limit: {self.overdraft_limit}")


    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Entered negative or zero number")

        if amount > (self.balance + self.overdraft_limit):
            raise ValueError("Exceeded overdraft limit")

        self._Account__balance -= amount



#---------------------  let's check the code ------------------#


Account1 = SavingAccount("Mamulex", 1001, 2000, 0.1)
Account2 = CheckingAccount("Abdre", 1002, 4000)


#let's check both Balance

Account1.statement()
Account2.statement()


#let's add balance to account 1

Account1.deposit(500)


print()

#let's check its balance

Account1.statement()


print()

# add interest

Account1.add_interest()


print()


# test overdraft

try:
    Account2.withdraw(30000)
except ValueError:
    print("work correctly b/c account have not much money")


#--------------------- polymorphism test ------------------#

accounts = [Account1, Account2]

for account in accounts:
    account.statement()