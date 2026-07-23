class Alert:
    def update(self, message):
        print(f"SMS Alert Sent: {message}")
class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self.alerts = []
        self.history = []
    @property
    def balance(self):
        return self.__balance
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount
        self.history.append(("deposit", amount))
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Entered Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient funds for this withdrawal")
        self.__balance -= amount
        self.history.append(("withdraw", amount))
    def alert(self):
        print(f"Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB")
    def attach(self, alert_observer):
        self.alerts.append(alert_observer)
    def _notify(self, message):
        for alert_observer in self.alerts:
            alert_observer.update(message)
    def undo_last(self):
        if not self.history:
            return
        act, amt = self.history.pop()
        if act == "deposit":
            self.__balance -= amt
        elif act == "withdraw":
            self.__balance += amt
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
        return f"Type: Checking | Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB | overdraft_limit: {self.overdraft_limit}"
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Entered negative or zero number")
        if amount > (self.balance + self.overdraft_limit):
            raise ValueError("Exceeded overdraft limit")
        self._Account__balance -= amount
        self.history.append(("withdraw", amount))
        self._notify(self.statement())
class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0, rate=0.05, overdraft_limit=1000):
        if kind == "saving":
            return SavingAccount(owner, number, balance, rate)
        elif kind == "checking":
            return CheckingAccount(owner, number, balance, overdraft_limit)
        else:
            raise ValueError("Enter Valid Kind's")
class AccountRegistry:
    def __init__(self):
        self.dics_by_number = {}
        self.ordered_list = []
    def add(self, acc):
        self.dics_by_number[acc.account_number] = acc
        self.ordered_list.append(acc.account_number)
    def find(self, number):
        return self.dics_by_number.get(number) # this is O(1) b/c looklike hashmap or get value from memory specific addresst things
    def list_all(self):
        accounts = [] 
        for number in self.ordered_list:
            accounts.append(self.dics_by_number[number])
        return accounts

    def top_by_balance(self, n):
        # sort all account high to low balance then slice n, key=lambda take balance from each acc obj
        accounts = self.list_all()
        ranked = sorted(accounts, key=lambda acc: acc.balance, reverse=True)
        return ranked[:n]

    def _binary_search(self, sorted_numbers, target):
        # my own binary search bcz not allowed use in built one, list must be sorted already or wont work right
        low = 0
        high = len(sorted_numbers) - 1
        while low <= high:
            mid = (low + high) // 2
            if sorted_numbers[mid] == target:
                return mid
            elif sorted_numbers[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1 # means not found

    def find_by_number(self, number):
        # binary search need sorted keys, ordered_list is just insertion order so sort a copy first
        sorted_numbers = sorted(self.dics_by_number.keys())
        idx = self._binary_search(sorted_numbers, number)
        if idx == -1:
            return None
        found_number = sorted_numbers[idx]
        return self.dics_by_number[found_number]

    def total_transactions(self, acc, index=0):
        # recursive count of one acc history, base case when index pass the length
        if index >= len(acc.history):
            return 0
        return 1 + self.total_transactions(acc, index + 1)


rg = AccountRegistry()
acc_1 = AccountFactory.create("checking", "mame", 1001, 12400)
acc_2 = AccountFactory.create("saving", "kidist", 1003, 30500)
acc_3 = AccountFactory.create("saving", "nati", 1002, 5000)

sms_alert = Alert()
acc_1.attach(sms_alert)

rg.add(acc_1)
rg.add(acc_2)
rg.add(acc_3)

acc_1.deposit(500)
acc_1.withdraw(200)
acc_1.undo_last()

acc_2.deposit(1000)
acc_2.withdraw(500)
acc_2.deposit(200)

# test top_by_balance
print("top 2 by balance ")
for a in rg.top_by_balance(2):
    print(f"{a.owner} -> {a.balance} ETB")

# test find_by_number (binary search)
print("find by number")
found = rg.find_by_number(1002)
print(found.owner if found else "not found")

not_found = rg.find_by_number(9999)
print(not_found.owner if not_found else "not found")

# test recursive total_transactions
print(" total transactions")
print(f"acc_1 total txns: {rg.total_transactions(acc_1)}")
print(f"acc_2 total txns: {rg.total_transactions(acc_2)}")