document.addEventListener("DOMContentLoaded", function() {
    const addToSpecificListBtn = document.querySelector('.btn-primary');
    const addToGeneralListBtn = document.querySelector('.btn-danger');
    const inputField = document.querySelector('.short-input');
    const fruitRadio = document.getElementById('fruitRadio');
    const legumeRadio = document.getElementById('legumeRadio');
    const listOfFruitsDiv = document.querySelector('.list-of-fruits');
    const listOfLegumesDiv = document.querySelector('.list-of-legumes');
    const listOfFruitsAndLegumesDiv = document.querySelector('.list-of-fruits-legumes');
    const searchButton = document.querySelector('.btn-info');
    const searchInput = document.querySelector('.shorter-input');
    const deleteButton = document.querySelector('.btn-del');

    addToSpecificListBtn.addEventListener('click', addToSpecificList);
    addToGeneralListBtn.addEventListener('click', addToGeneralList);
    searchButton.addEventListener('click', searchItems);
    deleteButton.addEventListener('click', deleteItems);

    function addToSpecificList() {
        const inputValue = inputField.value.trim();

        if (inputValue !== '' && (fruitRadio.checked || legumeRadio.checked)) {
            let selectedList, selectedDiv;
            const listType = fruitRadio.checked ? "Fruits" : "Legumes";
            const message = `${listType}! - ${inputValue}`;
            let itemClass = '';

            if (fruitRadio.checked) {
                selectedList = listOfFruitsDiv;
                selectedDiv = listOfFruitsDiv.parentElement;
                itemClass = 'bg-success';
            } else {
                selectedList = listOfLegumesDiv;
                selectedDiv = listOfLegumesDiv.parentElement;
                itemClass = 'bg-warning';
            }

            if (selectedList) {
                const newItem = document.createElement('div');
                newItem.classList.add('alert', itemClass);
                newItem.innerText = message;

               
                newItem.addEventListener('click', function(event) {
                   
                });

                selectedList.appendChild(newItem);
                selectedDiv.style.height = `${selectedList.clientHeight}px`;
            }
        } else {
            alert("Please make sure that you enter all details!");
        }
    }

    function addToGeneralList() {
        const inputValue = inputField.value.trim();

        if (inputValue !== '') {
            const listType = fruitRadio.checked ? "Fruits" : "Legumes";
            const message = `${listType}! - ${inputValue}`;

            const newItem = document.createElement('div');
            newItem.classList.add('alert', 'bg-info'); 
            newItem.innerText = message;

            
            newItem.addEventListener('click', function(event) {
                
            });

            listOfFruitsAndLegumesDiv.appendChild(newItem);
            listOfFruitsAndLegumesDiv.style.height = `${listOfFruitsAndLegumesDiv.clientHeight + newItem.clientHeight}px`;
        }
    }

    function searchItems() {
        const searchText = searchInput.value.trim().toLowerCase();

        if (searchText !== '') {
            const specificAlerts = document.querySelectorAll('.list-of-fruits .alert, .list-of-fruits-legumes .alert, .list-of-legumes .alert');

            specificAlerts.forEach(alert => {
                const alertText = alert.innerText.toLowerCase();

                if (alertText.includes(searchText)) {
                    alert.classList.add('bg-danger');
                } else {
                    alert.classList.remove('bg-danger');
                }
            });
        } else {
            alert("Please enter a search term!");
        }
    }

    function deleteItems() {
        const searchText = searchInput.value.trim().toLowerCase();

        if (searchText !== '') {
            const specificAlerts = document.querySelectorAll('.list-of-fruits .alert, .list-of-fruits-legumes .alert, .list-of-legumes .alert');

            specificAlerts.forEach(alert => {
                const alertText = alert.innerText.toLowerCase();

                if (alertText.includes(searchText)) {
                    alert.classList.add('bg-danger', 'fade-out');

                    setTimeout(() => {
                        alert.remove();
                    }, 1000);
                }
            });
        } else {
            alert("Please enter a search term!");
        }
        
    }

    
    document.querySelector('.list-of-fruits-legumes').addEventListener('click', function(event) {
        const clickedAlert = event.target.closest('.alert');

        if (clickedAlert) {
            const message = clickedAlert.innerText;
            const category = message.includes("Fruits") ? "Fruits" : "Legumes";

            const newItem = document.createElement('div');
            newItem.classList.add('alert', category === 'Fruits' ? 'bg-success' : 'bg-warning');
            newItem.innerText = message;

            const selectedList = category === 'Fruits' ? listOfFruitsDiv : listOfLegumesDiv;
            const selectedDiv = selectedList.parentElement;

            selectedList.appendChild(newItem);
            selectedDiv.style.height = `${selectedDiv.clientHeight + newItem.clientHeight}px`;

            clickedAlert.remove();
        }
    });
});