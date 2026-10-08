from flask import Flask, render_template, request

app = Flask(__name__)

CODE_SAMPLES = {
    'python': {
        'stack': "class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, x): self.items.append(x)\n    def pop(self): return self.items.pop()",
        'queue': "from collections import deque\nclass Queue:\n    def __init__(self):\n        self.items = deque()\n    def enqueue(self, x): self.items.append(x)\n    def dequeue(self): return self.items.popleft()",
        'linked_list': "class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None",
        'bst': "class Node:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None"
    },
    'java': {
        'stack': "import java.util.Stack;\nStack<Integer> s = new Stack<>();\ns.push(10);\ns.pop();",
        'queue': "import java.util.LinkedList;\nQueue<Integer> q = new LinkedList<>();\nq.add(10);\nq.remove();",
        'linked_list': "class Node {\n    int val;\n    Node next;\n    Node(int v) { val = v; }\n}",
        'bst': "class Node {\n    int val;\n    Node left, right;\n    Node(int v) { val = v; }\n}"
    },
    'c': {
        'stack': "void push(int stack[], int *top, int val) {\n    stack[++(*top)] = val;\n}",
        'queue': "void enqueue(int q[], int *rear, int val) {\n    q[++(*rear)] = val;\n}",
        'linked_list': "struct Node {\n    int data;\n    struct Node* next;\n};",
        'bst': "struct Node {\n    int data;\n    struct Node *left, *right;\n};"
    }
}

@app.route('/')
def index():
    return render_template('frontend/index.html')

@app.route('/code/<ds_type>')
def show_code(ds_type):
    lang = request.args.get('lang', 'python')
    code = CODE_SAMPLES.get(lang, {}).get(ds_type, "// Implementation coming soon")
    return render_template('code.html', ds=ds_type, lang=lang, code_content=code)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)