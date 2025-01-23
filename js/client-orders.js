const { jsPDF } = window.jspdf;

window.onload = function() {
    loadData();
};

function addOrder() {
    const table = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td contenteditable="true" placeholder="Order Number"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td>
            <table>
                <tr><td><input type="text" class="order-input" placeholder="SKU"></td></tr>
                <tr><td><input type="number" class="order-input" placeholder="Quantity" oninput="calculateTotal(this)"></td></tr>
                <tr><td><input type="number" class="order-input" placeholder="Amount" oninput="calculateTotal(this)"></td></tr>
                <tr><td><input type="number" class="order-input" placeholder="Total" readonly></td></tr>
            </table>
        </td>
        <td contenteditable="true"><input type="date"></td>
        <td contenteditable="true">Date Complete</td>
        <td><button class="btn btn-delete" onclick="deleteOrder(this)">Delete</button></td>
    `;
}

function deleteOrder(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function saveData() {
    const table = document.getElementById('ordersTable');
    const rows = table.getElementsByTagName('tbody')[0].rows;
    const data = [];
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        const order = {
            orderNumber: cells[0].innerText,
            clientName: cells[1].innerText,
            telephoneNumbers: cells[2].innerText,
            orders: {
                item: cells[3].getElementsByTagName('input')[0].value,
                quantity: cells[3].getElementsByTagName('input')[1].value,
                amount: cells[3].getElementsByTagName('input')[2].value,
                total: cells[3].getElementsByTagName('input')[3].value
            },
            dateOfOrder: cells[4].getElementsByTagName('input')[0].value,
            dateComplete: cells[5].innerText
        };
        data.push(order);
    }
    localStorage.setItem('ordersData', JSON.stringify(data));
    alert('Bosapie says.... hoe hoe hoe lykit!!!  ....Saved');
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('ordersData')) || [];
    const table = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    data.forEach(order => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td contenteditable="true">${order.orderNumber}</td>
            <td contenteditable="true">${order.clientName}</td>
            <td contenteditable="true">${order.telephoneNumbers}</td>
            <td>
                <table>
                    <tr><td><input type="text" class="order-input" placeholder="Item" value="${order.orders.item}"></td></tr>
                    <tr><td><input type="number" class="order-input" placeholder="Quantity" value="${order.orders.quantity}" oninput="calculateTotal(this)"></td></tr>
                    <tr><td><input type="number" class="order-input" placeholder="Amount" value="${order.orders.amount}" oninput="calculateTotal(this)"></td></tr>
                    <tr><td><input type="number" class="order-input" placeholder="Total" value="${order.orders.total}" readonly></td></tr>
                </table>
            </td>
            <td contenteditable="true"><input type="date" value="${order.dateOfOrder}"></td>
            <td contenteditable="true">${order.dateComplete}</td>
            <td><button class="btn btn-delete" onclick="deleteOrder(this)">Delete</button></td>
        `;
    });
}

function calculateTotal(input) {
    const row = input.parentNode.parentNode.parentNode;
    const quantity = row.getElementsByTagName('input')[1].value;
    const amount = row.getElementsByTagName('input')[2].value;
    const total = row.getElementsByTagName('input')[3];
    total.value = quantity * amount;
}

function convertToPDF() {
    const doc = new jsPDF();
    const table = document.getElementById('ordersTable');
    const rows = table.getElementsByTagName('tbody')[0].rows;
    const data = [];
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        const order = {
            orderNumber: cells[0].innerText,
            clientName: cells[1].innerText,
            telephoneNumbers: cells[2].innerText,
            orders: {
                item: cells[3].getElementsByTagName('input')[0].value,
                quantity: cells[3].getElementsByTagName('input')[1].value,
                amount: cells[3].getElementsByTagName('input')[2].value,
                total: cells[3].getElementsByTagName('input')[3].value
            },
            dateOfOrder: cells[4].getElementsByTagName('input')[0].value,
            dateComplete: cells[5].innerText
        };
        data.push(order);
    }
    doc.text('Bosapie Designs - Client Orders', 10, 10);
    doc.autoTable({
        head: [
            ['Order Number', 'Client Name', 'Telephone Numbers', 'Item', 'Quantity', 'Amount', 'Total', 'Date of Order', 'Date Complete']
        ],
        body: data.map(order => [
            order.orderNumber,
            order.clientName,
            order.telephoneNumbers,
            order.orders.item,
            order.orders.quantity,
            order.orders.amount,
            order.orders.total,
            order.dateOfOrder,
            order.dateComplete
        ])
    });
    doc.save('orders.pdf');
}