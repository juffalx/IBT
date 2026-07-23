import random
from collections import deque

# 1. recursive sum + count down
def total(nums):
    if not nums:
        return 0
    return nums[0] + total(nums[1:])


def count_down(n):
    if n < 1:
        return
    print(n)
    count_down(n - 1)


print("total")
print(total([10, 20, 30, 40]))
print(total([]))

print()

print("count down")
count_down(5)


# 2
def binary_search(items, target):
    low = 0
    high = len(items) - 1

    while low <= high:
        mid = (low + high) // 2

        if items[mid] == target:
            return mid

        elif items[mid] < target:
            low = mid + 1

        else:
            high = mid - 1

    return -1


balances = [500, 1200, 3400, 5000, 8900, 12400, 30500]

print()
print("binary search")

print(binary_search(balances, 8900))
print(binary_search(balances, 999))


# 3
def merge(left, right):
    result = []

    i = 0
    j = 0

    while i < len(left) and j < len(right):

        if left[i] <= right[j]:
            result.append(left[i])
            i += 1

        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result


def merge_sort(items):

    if len(items) <= 1:
        return items

    mid = len(items) // 2

    left_half = merge_sort(items[:mid])
    right_half = merge_sort(items[mid:])

    return merge(left_half, right_half)


print()
print("merge sort")

for i in range(3):
    rand_list = [random.randint(0, 500) for _ in range(15)]

    mine = merge_sort(rand_list)
    builtin = sorted(rand_list)

    print(mine == builtin)


# 4
accounts_tuples = [
    ("mame", 12400),
    ("kidist", 30500),
    ("nati", 5000),
    ("sami", 22000)
]

ranked = sorted(accounts_tuples, key=lambda t: t[1], reverse=True)

print()
print("sort by balance")

for name, bal in ranked:
    print(f"{name}: {bal}")


# 5
def has_pair(nums, target):

    left = 0
    right = len(nums) - 1

    while left < right:

        s = nums[left] + nums[right]

        if s == target:
            return True

        elif s < target:
            left += 1

        else:
            right -= 1

    return False


sorted_nums = [1, 4, 6, 8, 11, 15]

print()
print("has pair")
print(has_pair(sorted_nums, 15))


# day 9

class Account:

    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance


class Branch:

    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def add_branch(self, branch):
        self.children.append(branch)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):

        total = 0

        for acc in self.accounts:
            total += acc.balance

        for child in self.children:
            total += child.total_balance()

        return total


head = Branch("head office")

north = Branch("north")

south = Branch("south")

cbe1 = Branch("cbe-1")
cbe2 = Branch("cbe-2")
cbe3 = Branch("cbe-3")
cbe4 = Branch("cbe-4")

head.add_branch(north)
head.add_branch(south)

north.add_branch(cbe1)
north.add_branch(cbe2)

south.add_branch(cbe3)
south.add_branch(cbe4)

cbe1.add_account(Account("mame", 1001, 12000))
cbe1.add_account(Account("nati", 1002, 5000))

cbe2.add_account(Account("kidist", 1003, 9000))

cbe3.add_account(Account("sami", 1004, 15000))

cbe4.add_account(Account("mame", 1005, 3000))

print()
print("bank total")
print(head.total_balance())


transfers = {
    "cbe-1": ["cbe-2", "cbe-3"],
    "cbe-2": ["cbe-4"],
    "cbe-3": ["cbe-4"],
    "cbe-4": []
}


def bfs(graph, start):

    visited = set()
    queue = deque()

    visited.add(start)
    queue.append(start)

    while queue:

        node = queue.popleft()

        for nxt in graph[node]:

            if nxt not in visited:
                visited.add(nxt)
                queue.append(nxt)

    return visited


print()
print("bfs")

print(bfs(transfers, "cbe-1"))