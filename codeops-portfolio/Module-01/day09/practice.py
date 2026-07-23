from collections import deque
import heapq


# quasito one

class Node:

    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):

    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root


def inorder(root):

    if root is None:
        return

    inorder(root.left)
    print(root.value)
    inorder(root.right)


root = None

balances = [5000, 1200, 8000, 3000, 15000, 900, 7000]

for balance in balances:
    root = insert(root, balance)

print("bst inorder")
inorder(root)


print()


# question 2

def height(node):

    if node is None:
        return 0

    left = height(node.left)
    right = height(node.right)

    return max(left, right) + 1


print("tree height")
print(height(root))

print()


# question 3

graph = {
    "mame": ["nati", "sami"],
    "nati": ["kidist"],
    "sami": ["abel"],
    "kidist": [],
    "abel": []
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


print("bfs")
print(bfs(graph, "mame"))

print()


# question 4

def dfs(graph, node, visited=None):

    if visited is None:
        visited = set()

    visited.add(node)

    print(node)

    for nxt in graph[node]:

        if nxt not in visited:
            dfs(graph, nxt, visited)

    return visited


print("dfs")
dfs(graph, "mame")

print()


# question 5

tasks = []

heapq.heappush(tasks, (3, "check account"))
heapq.heappush(tasks, (1, "send money"))
heapq.heappush(tasks, (5, "print report"))
heapq.heappush(tasks, (2, "create account"))
heapq.heappush(tasks, (4, "deposit"))

print("priority queue")

while tasks:
    print(heapq.heappop(tasks))