#day for in exersie main.py
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

# ?step 5 loop oever a mixed list and call statmetn()

acc_1 = SavingAccount("mame",1011,1000)
acc_2 = SavingAccount("nati",1012,2000)
acc_3 = SavingAccount("sami",1013,3000)


#sample list
sample_list = [acc_1, acc_2, acc_3]

for obj in sample_list:
    obj.statement()