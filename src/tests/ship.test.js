import { describe } from "node:test";
import { Ship } from "../scripts/ship.js";

describe("ship tests", () => {
  test("should create ship object", () => {
    const testShip = new Ship("Rowboat", 2, "A, 5");
    expect(testShip.shipName).toBe("Rowboat");
    expect(testShip.length).toBe(2);
    expect(testShip.timesHit).toBe(0);
    expect(testShip.isSunk).toBe(false);
    expect(testShip.location).toEqual([]);
  });

  test("timesHit should go up by 1", () => {
    const testShip = new Ship("Rowboat", 2);
    testShip.hit();
    expect(testShip.timesHit).toBe(1);
  });

  test("if timesHit = length, isSunk should be yes", () => {
    const testShip = new Ship("Rowboat", 2);
    testShip.location.push('A5');
    testShip.location.push('B5');
    testShip.hit('A5');
    testShip.hit('B5');
    testShip.evalSunk();
    expect(testShip.isSunk).toBe(true);
  });

  test("if timesHit < length, do nothing", () => {
    const testShip = new Ship("Rowboat", 2);
    testShip.hit();
    testShip.evalSunk();
    expect(testShip.isSunk).toBe(false);
  });

  test("ships are created for both users", () => {
    let testShip = new Ship("init", 1);
    let shipsObject = testShip.createShips();
    expect(shipsObject).toEqual(
      expect.objectContaining({
        p1Array: expect.any(Array),
        p2Array: expect.any(Array),
      }),
    );

    expect(shipsObject.p1Array[0].shipName).toBe("p1AircraftCarrier");
    expect(shipsObject.p2Array[0].shipName).toBe("p2AircraftCarrier")
  });
});
