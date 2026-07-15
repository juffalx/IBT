#----------------------------------------------------------------------------
# #Goad Extend Yes
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
            raise ValueError("Enterd Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient funds for this withdrawals")
        self.__balance -= amount

    def statement(self):
        print(f"Owner: {self.owner} | Account: {self.account_number} | Balance: {self.__balance} ETB")


#----------------------------------------------------------------------------
# do day05 inclass exersice's 
# for saving we use rate=0.05 for default value
# #----------------------------------------------------------------------------

class SavingAccount(Account):
    def __init__(self,owner,number ,balance,rate=0.05):
        super().__init__ (owner,number ,balance)
        self.rate = rate

    def add_interest(self):
        interest = self.__balance * self.rate
        self.__balance += self.rate
        print(f"Added {interest} ETB interest.")

    def statement(self):
        print(f"Type: Saving   | Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB | interest_rate: {self.rate}")

class ChekingAccount(Account):
    def __init__(self,owner,number ,balance=0,overdraft_limit=10000):
        super().__init__(owner, number, balance)
        self.overdraft_limit = overdraft_limit

    def statement(self):
        print(f"Type: Checking | Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB | overdraft_limit: {self.overdraft_limit}")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Enterd negative or zero number")
        
        if amount > (self.balance + self.overdraft_limit):
            raise ValueError("Exessed overdraft the limit")
        
        self.__balance -= amount

#---------------------  let's check the code ------------------#
#
#

Account1 = SavingAccount("Mamulex", 1001, 2000, 0.1)
Account2 = ChekingAccount("Abdre", 1002, 4000)

#let's check both Balance
Account1.statement()
Account2.statement()

#let's add balance to accunt 1 
Account1.deposit(500)

print()
#le't check its balance
Account1.statement()


try:
    Account2.withdraw(30000)
except ValueError:
    print("work correctly b/c account have not much money")