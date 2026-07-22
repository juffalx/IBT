class AccountRegistry:
    def __init__(self):
        self.account = {}
    
    def create(self,owner,acc):
        self.account[owner] = acc
        
    def search(self, acc_num):
        return self.account.get(acc_num)
    
reg = AccountRegistry()

reg.create( 1001)
print(reg.search("mame"))






import time # for checking how much time to take the list Big 0 and another 

target = 7
number = [1,2,3,4,5,6,7,8,9,10]
count = 1

start = time.time() #measure starting time
for num in number:
    print(f"counted {count} time")
    count+=1 
    if num == target:
        print(f"Target Found and Value's : {target}")
        break

end = time.time() #measure ending time's

print(f"total time is done for O({target})  is  {end - start}")


#compare with taking time selecting by it's index and hashmap
start = time.time() #measure starting time
targets = number[6]
print(f"\nTarget Found and Value's : {targets}")

end = time.time() #measure ending time's

print(f"total time is done for O({1})  is  {end - start}")


