import random

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

print("--- total ---")
print(total([10, 20, 30, 40])) # shd be 100
print(total([]))

print("--- count down ---")
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

balances = [500, 1200, 3400, 5000, 8900, 12400, 30500] # already sorted list
print("--- binary search on balances ---")
print(binary_search(balances, 8900)) 
print(binary_search(balances, 999)) #


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

print(" merge sort vs sorted()")
for i in range(3):
    rand_list = [random.randint(0, 500) for _ in range(15)]
    mine = merge_sort(rand_list)
    builtin = sorted(rand_list)
    print(mine == builtin) # shd print true everytime if my sort correct


# 4
accounts_tuples = [("mame", 12400), ("kidist", 30500), ("nati", 5000), ("sami", 22000)]
ranked = sorted(accounts_tuples, key=lambda t: t[1], reverse=True)
print("--- sort by balance desc ---")
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
print("--- has pair ---")
print(has_pair(sorted_nums, 15))

# print(has_pair(sorted_nums, 100)) 