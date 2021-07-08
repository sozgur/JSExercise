describe("calculateLoan", function () {
  it("should calculate the monthly rate correctly", function () {
    values = {
      amount: 12000,
      years: 7,
      rate: 3.5,
    };
    expect(calculateMonthlyPayment(values)).toEqual("161.28");
  });

  it("should return a result with 2 decimal places", function () {
    values = {
      amount: 10030,
      years: 6,
      rate: 5.1,
    };
    expect(calculateMonthlyPayment(values)).toEqual("162.00");
  });
});
