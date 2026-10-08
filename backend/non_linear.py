class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, root, value):
        if root is None:
            return BSTNode(value)
        if value < root.value:
            root.left = self.insert(root.left, value)
        else:
            root.right = self.insert(root.right, value)
        return root

    def inorder(self, root, res):
        if root:
            self.inorder(root.left, res)
            res.append(root.value)
            self.inorder(root.right, res)
        return res