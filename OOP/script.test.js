describe("Vehicle Class Test", () => {
    it("should correct results for each Instance", () => {
        let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
        let mySecondVehicle = new Vehicle("Toyota", "Corolla", 2020);
        expect(mySecondVehicle.make).toEqual("Toyota");
        expect(myFirstVehicle.year).toEqual(1999);
        expect(mySecondVehicle.honk()).toEqual("Beep.");
        expect(myFirstVehicle.toString()).toEqual(
            "The vehicle is a Honda Monster Truck from 1999."
        );
        expect(mySecondVehicle.toString()).toEqual(
            "The vehicle is a Toyota Corolla from 2020."
        );
    });
});
describe("Car Class Test", () => {
    it("should correct results for each Instance", () => {
        let myFirstCar = new Car("Toyota", "Corolla", 2005);
        expect(myFirstCar.toString()).toEqual(
            "The vehicle is a Toyota Corolla from 2005."
        );
        expect(myFirstCar.honk()).toEqual("Beep.");
        expect(myFirstCar.numWheels).toEqual(4);
    });
});

describe("Motorcycle Class Test", () => {
    it("should correct results for each Instance", () => {
        let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);
        expect(myFirstMotorcycle.toString()).toEqual(
            "The vehicle is a Honda Nighthawk from 2000."
        );
        expect(myFirstMotorcycle.honk()).toEqual("Beep.");
        expect(myFirstMotorcycle.revEngine()).toEqual("VROOM!!!");
        expect(myFirstMotorcycle.numWheels).toEqual(2);
    });
});
describe("Garage Class Test", () => {
    it("should correct results for each Instance", () => {
        let garage = new Garage(2);
        expect(garage.vehicles.length).toEqual(0);
        expect(garage.add(new Car("Hyundai", "Elantra", 2015))).toEqual(
            "Vehicle added!"
        );
        expect(garage.vehicles[0].make).toEqual("Hyundai");
        expect(garage.add("Taco")).toEqual(
            "Only vehicles are allowed in here!"
        );
        expect(garage.add(new Motorcycle("Honda", "Nighthawk", 2000))).toEqual(
            "Vehicle added!"
        );
        expect(garage.vehicles[1].make).toEqual("Honda");
        expect(garage.add(new Motorcycle("Honda", "Nighthawk", 2001))).toEqual(
            "Sorry, we're full."
        );
    });
});
