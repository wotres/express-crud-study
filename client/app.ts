interface Item {
    id: number;
    name: string;
    description: string;
}

function getItems(): void {
fetch('http://localhost:3000/items')
    .then(response => response.json())
    .then((data: Item[]) => {
        const itemsList = document.getElementById('itemsList') as HTMLUListElement;
        itemsList.innerHTML = '';
        data.forEach((item: Item) => {
            let listItem = document.createElement('li');
            listItem.textContent = `ID: ${item.id}, Name: ${item.name}, Description: ${item.description}`;
            itemsList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('createItem')!.addEventListener('click', function() {
    const name = (document.getElementById('itemName') as HTMLInputElement).value;
    const description = (document.getElementById('itemDescription') as HTMLInputElement).value;

    if (!name.trim() || !description.trim()) {
        (document.getElementById('createError') as HTMLParagraphElement).textContent = 'Please fill in both name and description.';
        return;
    }
    fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
    })
    .then(response => response.json())
    .then((data: Item) => {
        console.log('POST:', data);
        (document.getElementById('itemName') as HTMLInputElement).value = '';
        (document.getElementById('itemDescription') as HTMLInputElement).value = '';
        getItems();
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('getItems')!.addEventListener('click', function() {
getItems();
});

document.getElementById('updateItem')!.addEventListener('click', function() {
const itemId = (document.getElementById('updateItemId') as HTMLInputElement).value;
if (!itemId) {
    (document.getElementById('updateError') as HTMLParagraphElement).textContent = 'Please enter an item ID for update.';
    return;
}
const name = (document.getElementById('updateItemName') as HTMLInputElement).value;
const description = (document.getElementById('updateItemDescription') as HTMLInputElement).value;

fetch(`http://localhost:3000/items/${itemId}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description }),
})
.then(response => {
    if (!response.ok) {
    throw new Error('Server responded with status ' + response.status);
    }
    return response.json();
})
.then((data: Item) => {
    console.log('PUT:', data);
    (document.getElementById('updateItemId') as HTMLInputElement).value = '';
    (document.getElementById('updateItemName') as HTMLInputElement).value = '';
    (document.getElementById('updateItemDescription') as HTMLInputElement).value = '';
    (document.getElementById('updateError') as HTMLParagraphElement).textContent = '';
    getItems();
})
.catch(error => {
    console.error('Error:', error);
    (document.getElementById('updateError') as HTMLParagraphElement).textContent = error.message;
});
});

document.getElementById('deleteItem')!.addEventListener('click', function() {
const itemId = (document.getElementById('deleteItemId') as HTMLInputElement).value;
if (!itemId) {
    (document.getElementById('deleteError') as HTMLParagraphElement).textContent = 'Please enter an item ID for delete.';
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
.then((data: Item) => {
    console.log('DELETE:', data); 
    (document.getElementById('deleteItemId') as HTMLInputElement).value = '';
    getItems();
})
.catch(error => {
    console.error('Error:', error);
    (document.getElementById('deleteError') as HTMLParagraphElement).textContent = error.message;
});
});

getItems();
  