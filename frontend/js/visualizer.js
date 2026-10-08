const MISSION_INTEL = {
    'linked_list': { def: "A linked list is a dynamic, linear data structure where elements, called nodes, are linked together using references (pointers), rather than being stored in contiguous memory locations like an array.", apps: "Music playlists, Image viewers.", ops: ['Insert', 'Delete'], time: 'O(n)', space: 'O(n)' },
    'stack': { def: "LIFO: Last-In First-Out structure. A stack is a linear data structure that follows the Last-In, First-Out (LIFO) principle. This means the last element added to the stack is the first one to be removed, similar to a stack of plates where you take the top plate first.", apps: "Undo/Redo, Recursion.", ops: ['Push', 'Pop'], time: 'O(1)', space: 'O(n)' },
    'queue': { def: "FIFO: First-In First-Out structure. A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle, where the first element added is the first one to be removed. It operates like a line at a store, with insertion (enqueue) at the rear and deletion (dequeue) at the front. Common uses include task scheduling and buffering.", apps: "Printer tasks, CPU scheduling.", ops: ['Enqueue', 'Dequeue'], time: 'O(1)', space: 'O(n)' },
    'bst': { def: "Hierarchical sorted tree structure. A Binary Search Tree (BST) is a hierarchical, node-based data structure that maintains elements in a sorted order, enabling efficient search, insertion, and deletion operations. ", apps: "Databases, Search algorithms.", ops: ['Insert', 'Delete'], time: 'O(log n)', space: 'O(n)' },
    'deque': {
    def: "A Double-Ended Queue (Deque) is a linear data structure where insertion and deletion can be performed from both the front and the rear. It does not follow a strict FIFO or LIFO order.",
    apps: "• <b>Browser History:</b> Recently visited sites are added to the front; if the list gets too long, the oldest sites are removed from the rear.<br>• <b>Stealing Algorithms:</b> Used in task scheduling where a processor 'steals' a task from the back of another processor's deque.",
    ops: ['Insert Front', 'Insert Rear', 'Delete Front', 'Delete Rear'],
    time: 'O(1)', space: 'O(n)'
},
'circular_queue': {
    def: "A linear data structure in which the last position is connected back to the first position to make a circle. It is also called 'Ring Buffer'.",
    formulas: "<b>Insertion:</b> ((rear + 1) % size)<br><b>Deletion:</b> ((front + 1) % size)",
    apps: "• <b>Memory Management:</b> Used in computer systems to manage buffers where data is produced and consumed at different rates.<br>• <b>Traffic Lights:</b> The transition of lights follows a circular queue pattern.",
    ops: ['Enqueue', 'Dequeue'],
    time: 'O(1)', space: 'O(n)'
},
'circular_linked_list': {
    def: "A linked list where all nodes are connected to form a circle. There is no NULL at the end; the last node points back to the first node (Head).",
    formulas: "<b>Last Node Update:</b> last->next = head",
    apps: "• <b>Multiplayer Games:</b> The OS switches between players in a circular fashion, giving each player a turn before returning to the first.<br>• <b>Resource Allocation:</b> Used in Round Robin scheduling in Operating Systems.",
    ops: ['Insert', 'Delete'],
    time: 'O(n)', space: 'O(n)'
}
};

let currentMode = 'linked_list';
let dsData = [0];

function setMode(mode, el) {
    currentMode = mode;
    dsData = [0];
    document.querySelectorAll('.nav-menu li').forEach(li => li.classList.remove('active'));
    el.classList.add('active');
    
    const intel = MISSION_INTEL[mode];
    document.getElementById('ds-title').innerText = mode.toUpperCase().replace('_', ' ');
    document.getElementById('time-comp').innerText = intel.time;
    document.getElementById('space-comp').innerText = intel.space;

    const opBox = document.getElementById('op-buttons');
    opBox.innerHTML = intel.ops.map(op => `<button class="cmd-btn" onclick="handleOp('${op}')">${op}</button>`).join('');
    
    render();
}

function handleOp(op) {
    if (['Push', 'Enqueue', 'Insert'].includes(op)) {
        dsData.push(0);
    } else if (['Pop', 'Dequeue', 'Delete'].includes(op)) {
        if (currentMode === 'stack') dsData.pop(); else dsData.shift();
    }
    render();
}

function handleOp(op) {
    if (op === 'Insert Front') {
        dsData.unshift(0);
    } else if (op === 'Insert Rear' || op === 'Insert' || op === 'Enqueue' || op === 'Push') {
        dsData.push(0);
    } else if (op === 'Delete Front' || op === 'Delete' || op === 'Dequeue' || op === 'Pop') {
        dsData.shift();
    } else if (op === 'Delete Rear') {
        dsData.pop();
    }
    render();
}

function getLabel(i, len) {
    if (len === 0) return "";
    
    if (currentMode === 'stack') {
        return (i === len - 1) ? 'TOP ↑' : '';
    }
    
    if (currentMode === 'linked_list') {
        return (i === 0) ? 'HEAD ↓' : '';
    }
    
    if (currentMode === 'queue') {
        if (i === 0 && i === len - 1) return 'FRONT & REAR ↓';
        if (i === 0) return 'FRONT ↓';
        if (i === len - 1) return 'REAR ↓';
    }
    
    return "";
}

function getLabel(i, len) {
    if (len === 0) return "";
    
    // Logic for Deque and Circular Queue
    if (currentMode === 'queue' || currentMode === 'circular_queue' || currentMode === 'deque') {
        if (i === 0 && i === len - 1) return 'FRONT & REAR ↓';
        if (i === 0) return 'FRONT ↓';
        if (i === len - 1) return 'REAR ↓';
    }
    
    // Logic for Circular Linked List
    if (currentMode === 'circular_linked_list') {
    if (i === 0) return 'HEAD ↓';
    if (i === len - 1) return 'TAIL (NEXT → HEAD) ↓';
    }

    // Default existing logic for Stack/LL...
    return "";
}

function render() {
    const canvas = document.getElementById('visual-canvas');
    canvas.innerHTML = '';
    
    // Layout direction: Stack is vertical, others are horizontal
    canvas.style.flexDirection = (currentMode === 'stack') ? 'column-reverse' : 'row';

    dsData.forEach((val, i) => {
        const container = document.createElement('div');
        container.className = 'node-wrapper';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        
        container.innerHTML = `
            <div class="pointer-label" style="color:var(--burnt-orange); font-family:'Orbitron'; font-size:0.7rem; font-weight:900; height:25px; text-shadow: 0 0 8px var(--burnt-orange);">
                ${getLabel(i, dsData.length)}
            </div>
            <input type="number" class="node-input" value="${val}" onchange="dsData[${i}]=parseInt(this.value)">
            <div class="index-label" style="color:#444; font-size:0.6rem; margin-top:5px; font-family:monospace;">
                IDX_${i}
            </div>
        `;
        canvas.appendChild(container);
    });
}

function render() {
    const canvas = document.getElementById('visual-canvas');
    canvas.innerHTML = '';
    canvas.style.flexDirection = (currentMode === 'stack') ? 'column-reverse' : 'row';

    // Existing node rendering logic...
    dsData.forEach((val, i) => {
        const container = document.createElement('div');
        container.className = 'node-wrapper';
        // ... (your existing innerHTML for node-input and labels)
        canvas.appendChild(container);
    });

    // NEW: Circular Link Logic
    if (currentMode === 'circular_linked_list' && dsData.length > 1) {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("style", "position:absolute; width:100%; height:100%; pointer-events:none;");
        
        // Create a curved path from last node to first node
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M 90% 60% Q 50% 120% 10% 60%"); // Adjust coordinates based on your UI
        path.setAttribute("stroke", "var(--burnt-orange)");
        path.setAttribute("stroke-width", "3");
        path.setAttribute("fill", "transparent");
        path.setAttribute("marker-end", "url(#arrowhead)");
        
        svg.appendChild(path);
        canvas.appendChild(svg);
    }
}

function render() {
    const canvas = document.getElementById('visual-canvas');
    canvas.innerHTML = '';
    
    // 1. Render Nodes first
    dsData.forEach((val, i) => {
        const container = document.createElement('div');
        container.className = 'node-wrapper';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        
        container.innerHTML = `
            <div class="pointer-label" style="color:var(--burnt-orange); font-family:'Orbitron'; font-size:0.7rem; height:25px;">
                ${getLabel(i, dsData.length)}
            </div>
            <input type="number" class="node-input" value="${val}" onchange="dsData[${i}]=parseInt(this.value)">
            <div class="index-label" style="color:#444; font-size:0.6rem; margin-top:5px;">IDX_${i}</div>
        `;
        canvas.appendChild(container);
    });

    // 2. Add Circular Link (SVG)
    if (currentMode === 'circular_linked_list' && dsData.length > 1) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        // Set SVG to cover the canvas area
        svg.setAttribute("style", "position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1;");
        
        // Define path: Start at last node (Right), curve down, end at first node (Left)
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        // M (Move to last node) Q (Control Point for curve) T (End at first node)
        path.setAttribute("d", "M 80% 80% Q 50% 150% 20% 80%"); 
        path.setAttribute("stroke", "var(--burnt-orange)");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-dasharray", "5,5"); // Optional: Dashed line looks 'techy'
        
        svg.appendChild(path);
        canvas.appendChild(svg);
    }
}

function openModal() {
    const info = MISSION_INTEL[currentMode];
    document.getElementById('modal-body').innerHTML = `<p>${info.def}</p><br><strong>Apps:</strong><p>${info.apps}</p>`;
    document.getElementById('infoModal').style.display = "block";
}

function openModal() {
    const info = MISSION_INTEL[currentMode];
    let formulaHtml = info.formulas ? `<h4 style="color:var(--electric-amber); margin-top:15px;">Formulas</h4><p style="font-family:monospace; background:#000; padding:10px;">${info.formulas}</p>` : '';
    
    document.getElementById('modal-body').innerHTML = `
        <h4 style="color:var(--electric-amber);">Definition</h4>
        <p>${info.def}</p>
        ${formulaHtml}
        <h4 style="color:var(--electric-amber); margin-top:15px;">Real-World Applications</h4>
        <p>${info.apps}</p>
    `;
    document.getElementById('infoModal').style.display = "block";
}

function closeModal() { document.getElementById('infoModal').style.display = "none"; }

function goToCodePage() {
    const lang = document.getElementById('langSelect').value;
    window.location.href = `/code/${currentMode}?lang=${lang}`;
}

window.onload = () => {
    setMode('linked_list', document.querySelector('.nav-menu li'));
};