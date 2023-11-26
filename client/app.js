function getItems() {
    fetch('http://localhost:3000/items')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var itemsList = document.getElementById('itemsList');
        itemsList.innerHTML = '';
        data.forEach(function (item) {
            var listItem = document.createElement('li');
            listItem.textContent = "ID: ".concat(item.id, ", Name: ").concat(item.name, ", Description: ").concat(item.description);
            itemsList.appendChild(listItem);
        });
    })
        .catch(function (error) { return console.error('Error:', error); });
}
document.getElementById('createItem').addEventListener('click', function () {
    var name = document.getElementById('itemName').value;
    var description = document.getElementById('itemDescription').value;
    if (!name.trim() || !description.trim()) {
        document.getElementById('createError').textContent = 'Please fill in both name and description.';
        return;
    }
    fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, description: description }),
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log('POST:', data);
        document.getElementById('itemName').value = '';
        document.getElementById('itemDescription').value = '';
        getItems();
    })
        .catch(function (error) { return console.error('Error:', error); });
});
document.getElementById('getItems').addEventListener('click', function () {
    getItems();
});
document.getElementById('updateItem').addEventListener('click', function () {
    var itemId = document.getElementById('updateItemId').value;
    if (!itemId) {
        document.getElementById('updateError').textContent = 'Please enter an item ID for update.';
        return;
    }
    var name = document.getElementById('updateItemName').value;
    var description = document.getElementById('updateItemDescription').value;
    fetch("http://localhost:3000/items/".concat(itemId), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, description: description }),
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Server responded with status ' + response.status);
        }
        return response.json();
    })
        .then(function (data) {
        console.log('PUT:', data);
        document.getElementById('updateItemId').value = '';
        document.getElementById('updateItemName').value = '';
        document.getElementById('updateItemDescription').value = '';
        document.getElementById('updateError').textContent = '';
        getItems();
    })
        .catch(function (error) {
        console.error('Error:', error);
        document.getElementById('updateError').textContent = error.message;
    });
});
document.getElementById('deleteItem').addEventListener('click', function () {
    var itemId = document.getElementById('deleteItemId').value;
    if (!itemId) {
        document.getElementById('deleteError').textContent = 'Please enter an item ID for delete.';
        return;
    }
    fetch("http://localhost:3000/items/".concat(itemId), {
        method: 'DELETE',
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Server responded with status ' + response.status);
        }
        return response.json();
    })
        .then(function (data) {
        console.log('DELETE:', data);
        document.getElementById('deleteItemId').value = '';
        getItems();
    })
        .catch(function (error) {
        console.error('Error:', error);
        document.getElementById('deleteError').textContent = error.message;
    });
});
getItems();
