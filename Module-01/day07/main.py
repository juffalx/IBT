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
            raise ValueError("Insufficient funds")

        self.__balance -= amount

        self._notify(self.statement())


    def statement(self):

        return f"Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB"


    def subscribe(self, obj):

        self._observer.append(obj)


    def _notify(self, event):

        for obj in self._observer:

            obj.show(event)



class SavingAccount(Account):

    def __init__(self, owner, number, balance=0, rate=0.05):

        super().__init__(owner, number, balance)

        self.rate = rate


    def add_interest(self):

        interest = self.balance * self.rate

        self.deposit(interest)



    def statement(self):

        return f"Type: Saving | Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB | Interest: {self.rate}"



class CheckingAccount(Account):

    def __init__(self, owner, number, balance=0, overdraft_limit=10000):

        super().__init__(owner, number, balance)

        self.overdraft_limit = overdraft_limit



    def withdraw(self, amount):

        if amount <= 0:

            raise ValueError("Invalid amount")


        if amount > self.balance + self.overdraft_limit:

            raise ValueError("Exceeded overdraft limit")


        self._Account__balance -= amount

        self._notify(self.statement())



    def statement(self):

        return f"Type: Checking | Owner: {self.owner} | Account: {self.account_number} | Balance: {self.balance} ETB | Overdraft: {self.overdraft_limit}"




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

            raise ValueError("Invalid account type")





class SMSAlert:


    def show(self,event):

        print(f"[SMS Alert] {event}")



class AuditLog:


    def show(self,event):

        print(f"[Audit Log]\n{event}")





# -------------------- Day 07 --------------------


import time
from collections import deque



numbers = list(range(100000))

numbers_dict = {x:x for x in range(100000)}



start = time.time()

99999 in numbers

print("List time:", time.time() - start)



start = time.time()

99999 in numbers_dict

print("Dict time:", time.time() - start)





class Stack:


    def __init__(self):

        self.items = []



    def push(self,item):

        self.items.append(item)



    def pop(self):

        if self.items:

            return self.items.pop()



    def peek(self):

        if self.items:

            return self.items[-1]





names = ["Ali","Sara","John","Mika"]


stack = Stack()


for name in names:

    stack.push(name)



reverse_names = []


while stack.peek():

    reverse_names.append(stack.pop())



print(reverse_names)






queue = deque()


queue.append("Customer 1")
queue.append("Customer 2")
queue.append("Customer 3")
queue.append("Customer 4")
queue.append("Customer 5")



while queue:

    print(queue.popleft())






class Node:


    def __init__(self,value):

        self.value = value

        self.next = None





class LinkedList:


    def __init__(self):

        self.head = None



    def push_front(self,value):

        node = Node(value)

        node.next = self.head

        self.head = node



    def print_all(self):

        current = self.head


        while current:

            print(current.value)

            current = current.next






class TransactionStack:


    def __init__(self):

        self.items = []



    def push(self,data):

        self.items.append(data)



    def pop(self):

        if self.items:

            return self.items.pop()






class AccountRegistry:


    def __init__(self):

        self.by_number = {}

        self.order = []

        self.history = {}



    def add(self,acc):

        self.by_number[acc.account_number] = acc

        self.order.append(acc.account_number)

        self.history[acc.account_number] = TransactionStack()



    def find(self,number):

        return self.by_number.get(number)



    def list_all(self):

        result = []


        for number in self.order:

            result.append(self.by_number[number])


        return result



    def deposit(self,number,amount):

        account = self.find(number)

        account.deposit(amount)


        self.history[number].push(
            {
                "type":"deposit",
                "amount":amount
            }
        )



    def withdraw(self,number,amount):

        account = self.find(number)

        account.withdraw(amount)


        self.history[number].push(
            {
                "type":"withdraw",
                "amount":amount
            }
        )



    def undo_last(self,number):

        account = self.find(number)


        transaction = self.history[number].pop()


        if transaction["type"] == "deposit":

            account.withdraw(transaction["amount"])



        elif transaction["type"] == "withdraw":

            account.deposit(transaction["amount"])







acc1 = AccountFactory.create(
    "saving",
    "Mame",
    1001,
    5000
)


acc2 = AccountFactory.create(
    "checking",
    "Abdre",
    1002,
    3000
)



acc1.subscribe(SMSAlert())

acc1.subscribe(AuditLog())



registry = AccountRegistry()


registry.add(acc1)

registry.add(acc2)



registry.deposit(1001,500)

registry.withdraw(1001,1000)



print(registry.find(1001).statement())


registry.undo_last(1001)


print(registry.find(1001).statement())



for account in registry.list_all():

    print(account.statement())

    