// Part One
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk() {
        return "Beep.";
    }

    toString() {
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`;
    }
}

// Part Two
class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

//Part Three
class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }

    revEngine() {
        return "VROOM!!!";
    }
}

//Part Four
class Garage {
    constructor(capacity) {
        if (!Number.isFinite(capacity)) {
            throw new Error("Your capacity must be a Number");
        }
        this.capacity = capacity; // Number
        this.vehicles = [];
    }

    add(vehicle) {
        if (!(vehicle instanceof Vehicle)) {
            return "Only vehicles are allowed in here!";
        }
        if (this.capacity === 0) {
            return "Sorry, we're full.";
        }

        this.vehicles.push(vehicle);
        this.capacity--;
        return "Vehicle added!";
    }
}
