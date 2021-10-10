class DoublyLinkedLisNode {
    data = -1;
    next = null;
    prev = null;

    constructor(data = -1, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

class DoublyLinkedList {
    size = 0;
    head;
    tail;

    constructor() {
        this.size = 0;
        this.head = new DoublyLinkedLisNode();
        this.tail = new DoublyLinkedLisNode();

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    insertAtBeginning(data) {
        let newNode = new DoublyLinkedLisNode(data);

        newNode.next = this.head.next;
        newNode.prev = this.head;
        this.head.next = newNode;
        newNode.next.prev = newNode;

        this.size++;
    }

    insertAtEnd(data) {
        let newNode = new DoublyLinkedLisNode(data);

        newNode.prev = this.tail.prev;
        newNode.next = this.tail;
        this.tail.prev = newNode;
        newNode.prev.next = newNode;

        this.size++;
    }

    isEmpty() {
        return this.size === 0;
    }

    //returns first node data
    getFirstNode() {
        if (this.isEmpty())
            throw new Error("trying to access empty linked list");
        else return this.head.next.data;
    }

    //returns last node data
    getLastNode() {
        if (this.isEmpty())
            throw new Error("trying to access empty linked list");
        else return this.tail.prev.data;
    }

    //removes last node and returns the data
    removeLastNode() {
        if (this.isEmpty())
            throw new Error("trying to access empty linked list");

        let lastNode = this.tail.prev;
        lastNode.prev.next = this.tail;
        this.tail.prev = lastNode.prev;

        let lastNodeData = lastNode.data;

        this.size--;
        return lastNodeData;
    }

    //removes first  node and returns the data
    removeFirstNode() {
        if (this.isEmpty())
            throw new Error("trying to access empty linked list");

        let firstNode = this.head.next;
        this.head.next = firstNode.next;
        firstNode.next.prev = this.head;

        this.size--;
        return firstNode.data;
    }
}
