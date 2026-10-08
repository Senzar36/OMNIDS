class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    def insert(self, value):
        new_node = Node(value)
        if not self.head:
            self.head = new_node
        else:
            curr = self.head
            while curr.next:
                curr = curr.next
            curr.next = new_node
        self.size += 1

    def to_list(self):
        nodes = []
        curr = self.head
        while curr:
            nodes.append(curr.value)
            curr = curr.next
        return nodes

class Stack:
    def __init__(self):
        self.items = []
    def push(self, val): self.items.append(val)
    def pop(self): return self.items.pop() if self.items else None

class Queue:
    def __init__(self):
        self.items = []
    def enqueue(self, val): self.items.append(val)
    def dequeue(self): return self.items.pop(0) if self.items else None