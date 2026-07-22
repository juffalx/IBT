# Goal
# Build the first version of the Addis Bank Account class — encapsulated balance,
# validated deposits and withdrawals. This is the start of your larger project.

class Account:
    def __init__(self,owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
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
        
account_one = Account("mame",1001,5000)
account_two= Account("deva",1002,4000)

account_one.deposit(200)
account_one.withdraw(1500)

print(account_one.balance)

account_two.withdraw(2030)
print(account_two.balance)

