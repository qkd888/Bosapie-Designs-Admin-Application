document.addEventListener('DOMContentLoaded', loadData);

function addProduct(imageSrc = '', description = '', price = '', quantity = '') {
    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `
        <td><input type="file" accept="image/*" onchange="previewImage(event, this)"><img src="${imageSrc}" alt="Product Image" style="width: 50px; height: 50px;" onclick="openModal(this)"></td>
        <td><input type="text" value="${description}" placeholder="Enter description"></td>
        <td><input type="number" value="${price}" placeholder="Enter price"></td>
        <td><input type="number" value="${quantity}" placeholder="Enter quantity"></td>
        <td><button class="btn btn-delete" onclick="deleteProduct(this)">Delete</button></td>
    `;

}

function previewImage(event, input) {
    const reader = new FileReader();
    reader.onload = function() {
        const img = input.nextElementSibling;
        img.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

function deleteProduct(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    alert('Product deleted!');
}

function saveData() {
    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const products = [];
    for (let row of table.rows) {
        const product = {
            imageSrc: row.cells[0].getElementsByTagName('img')[0].src,
            description: row.cells[1].getElementsByTagName('input')[0].value,
            price: row.cells[2].getElementsByTagName('input')[0].value,
            quantity: row.cells[3].getElementsByTagName('input')[0].value
        };
        products.push(product);
    }
    localStorage.setItem('products', JSON.stringify(products));
    alert('Data saved!');
}

function loadData() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    for (let product of products) {
        addProduct(product.imageSrc, product.description, product.price, product.quantity);
    }

}

function openModal(img) {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = img.src;
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}