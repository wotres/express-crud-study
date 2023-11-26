function getItems() {
    fetch('http://localhost:3000/items')
    .then(response => response.json())
    .then(data => {
        const itemsList = document.getElementById('itemsList');
        itemsList.innerHTML = '';
        data.forEach(item => {
            let listItem = document.createElement('li');
            listItem.textContent = `ID: ${item.id}, Name: ${item.name}, Description: ${item.description}`;
            itemsList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
}
  
document.getElementById('createItem').addEventListener('click', function() {
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;
    // 값이 비어 있는지 확인
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
    .then(response => response.json())
    .then(data => {
        console.log('POST:', data);
        document.getElementById('itemName').value = '';
        document.getElementById('itemDescription').value = '';
        getItems(); // 아이템 목록 갱신
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('getItems').addEventListener('click', function() {
    getItems();
});

document.getElementById('updateItem').addEventListener('click', function() {
    const itemId = document.getElementById('updateItemId').value;
    if (!itemId) {
        document.getElementById('updateError').textContent = 'Please enter an item ID for update.';
        return;
    }
    const name = document.getElementById('updateItemName').value;
    const description = document.getElementById('updateItemDescription').value;

    fetch(`http://localhost:3000/items/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, description: description }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server responded with status ' + response.status);
        }
        return response.json();
    })   
    .then(data => {
        console.log('PUT:', data);
        document.getElementById('updateItemId').value = '';
        document.getElementById('updateItemName').value = '';
        document.getElementById('updateItemDescription').value = '';
        document.getElementById('updateError').textContent = ''; // 에러 메시지 초기화      
        getItems(); // 아이템 목록 갱신
    })
    .catch(error => {
        console.error('Error:', error)
        document.getElementById('updateError').textContent = error.message;
    });
});

document.getElementById('deleteItem').addEventListener('click', function() {
    const itemId = document.getElementById('deleteItemId').value;
    if (!itemId) {
        document.getElementById('deleteError').textContent = 'Please enter an item ID for delete.';
        return;
    }
    fetch(`http://localhost:3000/items/${itemId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server responded with status ' + response.status);
        }
        return response.json();
    })   
    .then(data => {
        console.log('DELETE:', data);              
        document.getElementById('deleteItemId').value = '';
        getItems(); // 아이템 목록 갱신
    })
    .catch(error => {
        console.error('Error:', error)
        document.getElementById('deleteError').textContent = error.message;
    });
});

// 페이지 로드 시 아이템 목록 초기 로딩
getItems();  