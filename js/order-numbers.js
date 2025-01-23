window.onload = function() {
    populateOrderNumbers();
    loadData();
};

function populateOrderNumbers() {
    const grid = document.getElementById('orderNumberGrid');
    for (let i = 1; i <= 1000; i++) {
        const div = document.createElement('div');
        div.className = 'grid-item';
        div.textContent = `BA${String(i).padStart(4, '0')}`;
        div.addEventListener('click', function() {
            selectOrderNumber(this);
        });
        grid.appendChild(div);
    }
}

function selectOrderNumber(element) {
    element.classList.toggle('selected');
}

function saveData() {
    const selected = document.querySelectorAll('.grid-item.selected');
    if (selected.length > 0) {
        const orderNumbers = Array.from(selected).map(item => item.textContent);
        localStorage.setItem('orderNumbers', JSON.stringify(orderNumbers));
        alert('Data saved locally!');
    } else {
        alert('Please select at least one order number.');
    }
}

function loadData() {
    const orderNumbers = JSON.parse(localStorage.getItem('orderNumbers')) || [];
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        if (orderNumbers.includes(item.textContent)) {
            item.classList.add('selected');
        }
    });
}

function clearData() {
    localStorage.removeItem('orderNumbers');
    const selected = document.querySelectorAll('.grid-item.selected');
    selected.forEach(item => {
        item.classList.remove('selected');
    });
    alert('Data cleared!');
}