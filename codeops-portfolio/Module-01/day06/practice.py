# Spot the SRP violation. Take a Report class that builds, saves, and emails a report. Split it
#into three focused classes
#Single Responsiblity Principle:

class Report:
    def __init__(self,report):
        self.__report = report

    @property
    def report(self):
        return f"Report -> {self.__report} <-"

class ReportSave:
    def __init__(self, report):
        self.report = report 
        
    def save(self):
        with open("report.txt", "w") as file:
            file.write(str(self.report))

class ReportEmail:
    def __init__(self):
        self.email = "Sample@gmail.com"

    def email():
        print("Report Email Sample")

#Task 2 the Open/Closed Principle with the shape hierarchy
#without using open / close Principle problem
# -------------------------------------------
# if shape_type == "circle":
#     area = 3.14 * r * r

# elif shape_type == "square":
#     area = width * width

# elif shape_type == "triangle":
#     ...
# --------------------------------------------
from abc import ABC, abstractmethod

class Shape(ABC): # Inherit from ABC to make it abstract
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    PI = 3.14

    def __init__(self,radius ):
        self.radius   = radius 

    def area(self):
        return (self.PI * self.radius  * self.radius)

class Square(Shape):
    def __init__(self,width):
        self.width = width
        
    def area(self):
        return self.width * self.width

class Triangle(Shape):
    def __init__(self,base,height):
        self.base = base
        self.height = height
    def area(self):
        return 0.5 * self.base * self.height

sq1 = Square(4)
ci1 = Circle(23)
tr1 = Triangle(3,5)

print(sq1.area()) #output is 16
print(ci1.area()) #output from terminal is 1661.06

# Task 3 singlton 

class AppSetting:
    _instance = None

    def __new__(cls):
        if cls._instance is None:# for hold only one object perpose
            cls._instance = super().__new__(cls)# create and insert AppSetting object into _instace and we use by super() by object b/c object is master class of all class and python uses in hiden
            cls._instance.currency = 1000
        return cls._instance
    
currency1 = AppSetting()
currency2 = AppSetting()

print(currency1 is currency2)

#task 4
#Write a Factory. Create a ShapeFactory.create(kind) that returns a Circle, Square, or
#Triangle.

class ShapeFactory:
    def create(kind="",area=0,base=0,height=0):
        if kind == "Circle":
            return Circle(area)
        elif kind == "Square":
            return Square(area)
        elif kind == "Triangle":
            return Triangle(base,height)
        else:
            return "invalid kinds of type"
        
tri_angle = ShapeFactory.create("Triangle",base=10,height=2)

print(tri_angle.area()) #return in terminal is 10.0

#task 5
#Write an Observer pair. Make a NewsAgency subject and two subscriber classes that print when
#notified.

class NewsAgency:
    def __init__(self):
        self._observers = []

    def subscribe(self,obj):
        self._observers.append(obj)
        # print(f"{len(self._observers)} abalatoch")

    def notify(self):
        for obj in self._observers:
            obj.news()
            # print("test Notify")
        
    def breaking_news(self):
        self.notify()



class TvNotification:
    def news(self):
        print("Start News, Turn Tv for Shows")

class MessageNottification:
    def news(self):
        print( "Start news, click to see the url")


ag = NewsAgency()

ag.subscribe(TvNotification())
ag.subscribe(MessageNottification())

ag.breaking_news()
    
