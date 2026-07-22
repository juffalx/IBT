#----------------------------------------------------------------------------
# Addis Bank - Account Management System (V1)
# Account class with owner, account_number, and a private balance
# that can only change through validated deposit and withdraw methods.
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
# Quick manual tests / checks
#----------------------------------------------------------------------------
if __name__ == "__main__":
    # create two separate accounts object
    acc_1 = Account("Mohammed", "1001", 500)
    acc_2 = Account("Nati", "1002", 1000)

    print("---> Initial statements <---")
    acc_1.statement()
    acc_2.statement()

    # read balance but this work in directly 
    print(f"acc_1 balance via property: {acc_1.balance}")

    # try to set balance directly (should fail - no setter defined)
    try:
        acc_1.balance = 999999
    except AttributeError as e:
        print(f"Blocked direct edit: {e}") #print attribute erorr like e and print it

    # valid deposit
    acc_1.deposit(200)
    print("---> After depositing 200 to acc_1 <---")
    acc_1.statement()

    # valid withdrawal
    acc_1.withdraw(150)
    print("--- After withdrawing 150 from acc_1 ---")
    acc_1.statement()

    # invalid deposit (non-positive)
    try:
        acc_1.deposit(-50)  # this is try for if condtion work on not
    except ValueError as e:
        print(f"Deposit rejected: {e}")

    # invalid withdrawal (overdraft)
    try:
        acc_1.withdraw(999999)
    except ValueError as e:
        print(f"Withdrawal rejected: {e}")

    # prove indepedence: acc_2 utouched by all the upper code
    print("--- acc_2 remains unaffected ---")
    acc_2.statement()

