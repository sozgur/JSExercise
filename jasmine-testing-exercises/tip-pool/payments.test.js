describe("Payment test", function () {
    beforeEach(function () {
        billAmtInput.value = "500";
        tipAmtInput.value = "50";
    });

    it("should add new paymment to allApyment on submitServerInfo()", function () {
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments["payment" + paymentId].billAmt).toEqual("500");
        expect(allPayments["payment" + paymentId].tipAmt).toEqual("50");
    });

    it("should correct create a payment on createCurPayment()", function () {
        let payment = createCurPayment();
        expect(payment.billAmt).toEqual("500");
        expect(payment.tipAmt).toEqual("50");
        expect(payment.tipPercent).toEqual(10);
    });

    it("should add payment to payment table on appendPaymentTable()", function () {
        let payment = createCurPayment();
        appendPaymentTable(payment);
        expect(paymentTbody.children.length).toEqual(1);
        expect(paymentTbody.children[0].children.length).toEqual(3);
        expect(paymentTbody.children[0].children[0].innerText).toEqual("$500");
        expect(paymentTbody.children[0].children[1].innerText).toEqual("$50");
        expect(paymentTbody.children[0].children[2].innerText).toEqual("10%");
    });

    it("should update payment on summary table on updateSummary()", function () {
        submitPaymentInfo();
        updateSummary();
        expect(summaryTds[0].innerText).toEqual("$500");
        expect(summaryTds[1].innerText).toEqual("$50");
        expect(summaryTds[2].innerText).toEqual("10%");
    });

    afterEach(function () {
        billAmtInput.value = "";
        tipAmtInput.value = "";
        paymentTbody.innerHTML = "";
        allPayments = {};
        paymentId = 0;
        summaryTds[0].innerHTML = "";
        summaryTds[1].innerHTML = "";
        summaryTds[2].innerHTML = "";
    });
});
