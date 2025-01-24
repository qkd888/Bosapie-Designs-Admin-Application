document.addEventListener("DOMContentLoaded", loadData);

function addProduct() {
    const table = document.getElementById("productTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    const skuCell = newRow.insertCell(0);
    const descriptionCell = newRow.insertCell(1);
    const priceCell = newRow.insertCell(2);
    const quantityCell = newRow.insertCell(3);
    const actionCell = newRow.insertCell(4);

    skuCell.contentEditable = "true";
    descriptionCell.contentEditable = "true";
    priceCell.contentEditable = "true";
    quantityCell.contentEditable = "true";
    actionCell.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';
}

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function saveData() {
    const table = document.getElementById("productTable");
    const rows = table.getElementsByTagName("tbody")[0].rows;
    const data = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        const product = {
            sku: cells[0].innerText,
            description: cells[1].innerText,
            price: cells[2].innerText,
            quantity: cells[3].innerText
        };
        data.push(product);
    }

    localStorage.setItem("productData", JSON.stringify(data));
    alert("Data saved locally!");
}

function deleteData() {
    localStorage.removeItem("productData");
    const table = document.getElementById("productTable").getElementsByTagName("tbody")[0];
    table.innerHTML = "";
    alert("All products deleted!");
}

function loadData() {
    const data = JSON.parse(localStorage.getItem("productData"));
    if (data && data.length > 0) {
        const table = document.getElementById("productTable").getElementsByTagName("tbody")[0];
        data.forEach(product => {
            const newRow = table.insertRow();
            const skuCell = newRow.insertCell(0);
            const descriptionCell = newRow.insertCell(1);
            const priceCell = newRow.insertCell(2);
            const quantityCell = newRow.insertCell(3);
            const actionCell = newRow.insertCell(4);

            skuCell.contentEditable = "true";
            descriptionCell.contentEditable = "true";
            priceCell.contentEditable = "true";
            quantityCell.contentEditable = "true";
            skuCell.innerText = product.sku;
            descriptionCell.innerText = product.description;
            priceCell.innerText = product.price;
            quantityCell.innerText = product.quantity;
            actionCell.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';
        });
    }
}

document.getElementById('searchInput').addEventListener('keyup', function() {
    var input = document.getElementById('searchInput');
    var filter = input.value.toLowerCase();
    var rows = document.getElementById('productTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var match = false;
        for (var j = 0; j < cells.length; j++) {
            if (cells[j].innerHTML.toLowerCase().indexOf(filter) > -1) {
                match = true;
                break;
            }
        }
        if (match) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
});