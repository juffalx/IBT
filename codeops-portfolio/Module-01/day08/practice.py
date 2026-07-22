# item = [1,2,3,4,5]
# target = 4
# def binary_search(item, target):

#     first_index , last_index = 0, len(item) - 1 # first index is 0 and last index is 4
#     while first_index <= last_index:   #  0 <= 5  so True and start while loop
#         midle_index = (first_index + last_index) // 2 # midle ማለት 0 + 5 // 2 = 2 

#         if item [midle_index] == target:  # 3 == 4  False so check the next loop condition
#             return midle_index
#         elif item[midle_index] < target:  # 3 < 4  True so excute it's body
#             first_index = midle_index + 1 # first_index = 2 +1   =  3
#         else:               # kalhone gn   last_index = 2 - 1
#             last_index = midle_index - 1
#     return -1



# #marge sort

# def merge_sort(items):
#     if len(items) <= 1: # base case
#         return items
#     mid = len(items) // 2
#     left = merge_sort(items[:mid]) # recurse
#     right = merge_sort(items[mid:]) # recurse
#     return merge(left, right) # combine in order

"""Exercises
Work through these in a file called day08/practice.py. Run each one and check the output before
moving on."""

# 1. Recursive sum. Write a recursive total(nums) that sums a list, and a recursive count_down(n)
# that prints n down to 1

def total(num):
    if len(num) == 0:
        return 0
    return num[len(num)-1] + total(num[len(num) - 2])
    

total([1,2,3,4])

# print(len(number))

print( len([1,2,3,4]) == 1)
