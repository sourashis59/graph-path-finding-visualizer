class Queue {
    list;
    size = 0;

    constructor() {
        this.size = 0;
        this.list = new DoublyLinkedList();
    }

    isEmpty() {
        return this.list.isEmpty();
    }

    front() {
        if (this.isEmpty)
            throw new Error("Trying to access top of empty queueue");
        else return this.list.getFirstNode();
    }

    enqueue(data) {
        this.list.insertAtEnd(data);
        this.size++;
    }

    dequeue() {
        if (this.isEmpty()) throw new Error("trying to access empty queue");
        else {
            this.size--;
            return this.list.removeFirstNode();
        }
    }
}

// let q = new Queue();

// for (let i = 0; i < 10; i++) {
//     q.enqueue(i);
// }

// for (let i = 0; i < 10; i++) {
//     console.log(q.dequeue());
// }
