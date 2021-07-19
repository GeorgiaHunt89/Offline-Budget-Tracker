const db = new Dexie("transaction_database");
db.version(1).stores({
  pending_transactions: "name,value",
});

function saveRecord(transaction) {
  db.pending_transactions
    .put({ name: transaction.name, value: transaction.value })
    .then(function () {
      console.log("Successfully saved", db);
    })
    .catch(function (error) {
      alert("The was an issue with the transaction: " + error);
    });
}

async function getAllTransactions() {
  const transaction = await db.pending_transactions.toArray();
  console.log(transaction);
  fetch("/api/transaction/bulk", {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  }).then(db.pending_transactions);
}

if (navigator.onLine) {
  getAllTransactions();
}
