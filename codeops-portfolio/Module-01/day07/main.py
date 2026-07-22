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


rg = AccountRegistry()

acc_1 = AccountFactory.create("checking", "mame", 1001, 12400)
sms_alert = Alert()
acc_1.attach(sms_alert)

rg.add(acc_1)

acc_1.deposit(500)
acc_1.withdraw(200)

acc_1.undo_last()