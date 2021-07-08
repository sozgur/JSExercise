describe("helper functions test", function () {
    beforeEach(function () {
        billAmtInput.value = "123";
        tipAmtInput.value = "20";
    });

    it("should calculate correct tip percent", function () {
        expect(calculateTipPercent(billAmtInput.value, tipAmtInput.value)).toBe(
            16
        );
    });

    it("should add new td in tr using appendTd()", function () {
        let newTr = document.createElement("tr");
        appendTd(newTr, billAmtInput.value);
        appendTd(newTr, tipAmtInput.value);
        expect(newTr.children[0].innerText).toEqual("123");
        expect(newTr.children[1].innerText).toEqual("20");
    });

    it("should add new td in tr using appendDeleteBtn()", function () {
        let newTr = document.createElement("tr");
        appendDeleteBtn(newTr);
        expect(newTr.children[0].innerText).toEqual("X");
    });

    it("should sum total payment calculate correct amount on sumPaymentTotal()", function () {
        submitPaymentInfo();
        expect(sumPaymentTotal("billAmt")).toEqual(123);
        expect(sumPaymentTotal("tipAmt")).toEqual(20);
        expect(sumPaymentTotal("tipPercent")).toEqual(16);
    });
    afterEach(function () {
        billAmtInput.value = "";
        tipAmtInput.value = "";
        paymentTbody.innerHTML = "";
        paymentId = 0;
        allPayments = {};
        summaryTds[0].innerHTML = "";
        summaryTds[1].innerHTML = "";
        summaryTds[2].innerHTML = "";
    });
});
