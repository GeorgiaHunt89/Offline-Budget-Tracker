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
  const transactions = await db.pending_transactions.toArray();
  console.log({ transactions });
  if (transactions.length > 0) {
    fetch("/api/transaction/bulk", {
      method: "POST",
      body: JSON.stringify(transactions),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  }
}

if (navigator.onLine) {
  getAllTransactions();
}
