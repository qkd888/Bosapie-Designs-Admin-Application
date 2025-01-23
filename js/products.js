window.onload = function() {
    loadData();
};

function addRow(sku = '', description = '', price = '', quantity = '', imageSrc = '') {
    const table = document.getElementById('productTable');
    const newRow = table.insertRow();
    newRow.innerHTML = `
      <td contenteditable="true">${sku}</td>
      <td contenteditable="true">${description}</td>
      <td contenteditable="true">${price}</td>
      <td contenteditable="true">${quantity}</td>
      <td>
          <input type="file" accept="image/*" onchange="loadImage(event, this)">
          <img class="image-preview" src="${imageSrc}" alt="Image Preview">
      </td>
      <td>
          <button class="btn btn-delete" onclick="deleteRow(this)">Delete</button>
      </td>
  `;
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function loadImage(event, input) {
    const reader = new FileReader();
    reader.onload = function() {
        const img = input.nextElementSibling;
        img.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

function saveData() {
    const table = document.getElementById('productTable');
    const rows = table.rows;
    const data = [];
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        const product = {
            sku: cells[0].innerText,
            description: cells[1].innerText,
            price: cells[2].innerText,
            quantity: cells[3].innerText,
            imageSrc: cells[4].querySelector('img').src
        };
        data.push(product);
    }
    localStorage.setItem('productData', JSON.stringify(data));
    alert('Data saved locally!');
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('productData')) || [];
    data.forEach(product => {
        addRow(product.sku, product.description, product.price, product.quantity, product.imageSrc);
    });
}