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

async function checkDatabase() {
  console.log("check db ");

  // Get all records from store and set to a variable
  const getAll = await db.pending_transactions.toArray();
  console.log(getAll);

  // If there are items in the store, we need to bulk add them when we are back online
  if (getAll.length > 0) {
    fetch("/api/transaction/bulk", {
      method: "POST",
      body: JSON.stringify(getAll),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        // If our returned response is not empty
        if (res.length !== 0) {
          // Open another transaction to transaction_database with the ability to read and write
          await db.pending_transactions.delete();

          console.log("Clearing store 🧹");
        }
      });
  }
}

if (navigator.onLine) {
  getAllTransactions();
}
window.addEventListener("online", checkDatabase);
