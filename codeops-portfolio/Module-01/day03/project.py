# =====================================================
# Mini Project - Pharmacy Inventory Tracker
# IBT_WOW - Module 1 Practice 
# I use 1.5 hour for this code and one don't update bug challenged me but only change empty dictionary to actucal read dictionary name, and other bug but after that rewritting with format take only 10 minute omg
# =====================================================


# -------------------------------
# Step 1
# Get medicine name and quantity from user
# -------------------------------
def user_input():

    try:
        
        user_inputs = input("Enter medicine and quantity separated by comma (,): ")

        # FIX:
        #taking 2o+ minute for click . insted of coma , b/c of writting to fast to split(",")
        item_name, quantity = user_inputs.strip().split(",")

        # FIX:
        # first bug i don't convert to intiger so quantitiy is in string
        quantity = int(quantity)

        return item_name.capitalize(), quantity

    except ValueError:
        print("Invalid input.")
        return None, None


# -------------------------------
# Step 2
# Read inventory file
# -------------------------------
def read_stock(file_path):

    stock = {}

    try:

        with open(file_path, "r") as file:

            for line in file:

                item, quantity = line.strip().split(",")
                stock[item] = int(quantity)
        
    except FileNotFoundError:

        print("Inventory file not found.")

    except ValueError:

        print("Inventory format error.")

    return stock


# -------------------------------
# Step 3
# Add or update stock
# -------------------------------
def adjust_stock(item, quantity, stock):

    # FIX:
    #Take 35 minute + for only updating uffff
    # If medicine exists:
    #     incrase not replace
    # Else:
    #     create new medicine

    stock[item] = stock.get(item, 0) + quantity


# -------------------------------
# Step 4
# Save dictionary back to file
# -------------------------------
def stock_write(file_path, stock):

    try:

        with open(file_path, "w") as file:

            # FIX:
            # my before  code is 
            # file.write(stock)
            #
            #and this bug is very challenging i know the method but i don't know why i don't use

            for item, quantity in stock.items():

                file.write(f"{item},{quantity}\n")

    except FileNotFoundError:

        print("Cannot create report. b/c file is not found")


# =====================================================
# Main Program
# =====================================================





# Get user input

item_name, item_quantity = user_input()

#read stock name and store in stock
stock = read_stock("stock.txt")


if item_name is not None:

    adjust_stock(item_name, item_quantity, stock)

    stock_write("stock.txt", stock)

    print("\nUpdated Inventory\n")

    # Sort by quantity (Highest → Lowest)

    sorted_stock = sorted(
        stock.items(),
        key=lambda item: item[1], # i use this b/c dics give only in key so .items give both and if we say item[0] this mean key and item[1] referve value b/c we want sorted by values not by key
        reverse=True
    )

    for item, quantity in sorted_stock:

        print(f"{item}: {quantity}")


    # Low stock report

    low_stock = []

    for item, quantity in stock.items():

        if quantity < 10:

            low_stock.append(item)

    print("\nLow Stock Items")

    print(low_stock)

    # finally working after 1.5 hour debuging and learn more things , good



