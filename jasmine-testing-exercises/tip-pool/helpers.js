// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement("td");
  newTd.innerText = value;

  tr.append(newTd);
}

// expects a table row element to deleting to table row belong to
function appendDeleteBtn(tr) {
  let newTd = document.createElement("td");
  newTd.className = "deleteBtn";
  newTd.innerText = "X";

  newTd.addEventListener("click", removeEle);

  tr.append(newTd);
}

function removeEle(e) {
  let el = e.target.closest("tr");

  delete allServers[el.id];

  el.parentNode.removeChild(el);
  updateServerTable();
}
