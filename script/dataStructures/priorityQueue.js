class PriorityQueue {
    list;
    size = 0;
    comparatorIsFirstPlacedBeforeSecond;

    //*the argument is a comparator
    constructor(isFirstPlacedBeforeSecond) {
        this.size = 0;
        this.list = new DoublyLinkedList();
        this.comparatorIsFirstPlacedBeforeSecond = isFirstPlacedBeforeSecond;
    }

    isEmpty() {
        return this.list.isEmpty();
    }

    top() {
        if (this.isEmpty())
            throw new Error("Trying to access top of empty priority queueue");
        else return this.list.getFirstNode();
    }

    push(data) {
        this.list.sortedInsert(data, this.comparatorIsFirstPlacedBeforeSecond);
        this.size++;
    }

    pop() {
        if (this.isEmpty())
            throw new Error("trying to access empty priority queue");
        else {
            this.size--;
            return this.list.removeFirstNode();
        }
    }
}

// function comparator(a, b) {
//     return a.weight < b.weight;
// }

// let minPQ = new PriorityQueue(comparator);
// minPQ.push({ weight: 60 });
// minPQ.push({ weight: 100 });
// minPQ.push({ weight: 10 });
// minPQ.push({ weight: 69 });
// minPQ.push({ weight: 50 });

// console.log("min PQ :");
// console.log(minPQ);

// console.log(minPQ.isEmpty());
// while (!minPQ.isEmpty()) {
//     console.log(minPQ.pop());
// }

// minPQ.push({ weight: 50 });
// minPQ.push({ weight: 6969 });

// while (!minPQ.isEmpty()) {
//     console.log(minPQ.pop());
// }
