import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCkDL6o5zIadycIqJoROr48mqUB3EkZab0",
    authDomain: "mikutoys-d47de.firebaseapp.com",
    databaseURL: "https://mikutoys-d47de-default-rtdb.firebaseio.com",
    projectId: "mikutoys-d47de",
    storageBucket: "mikutoys-d47de.appspot.com",
    messagingSenderId: "453934610008",
    appId: "1:453934610008:web:092e9ad475e2c675773c2d"
};
var data = {}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
const submitButton = document.getElementById('submit');
const noOfFlowersInput = document.querySelector('[data-flowers]')
const dropdownTemplate = document.querySelector('[data-dropdowns]')
const dropdownContainer = document.querySelector('[data-flower-dropdown-container]')
const resetButton = document.querySelector('[data-reset]')
const totalAmount = document.querySelector('[data-total-amount]')
const addToCart = document.querySelector('[data-add-to-cart]')
const alertContainer = document.querySelector('[data-alert]')
const viewCart = document.querySelector('[data-cart-view]')
const closeAlert = document.querySelector('[data-close-alert]')
const accessoryDrodownContainer = document.querySelector('[data-accessory-container]')
const accessoryTemplate = document.querySelector('[data-accessory-template]')
const accessorySubmitButton = document.querySelector('[data-accessory-submit]')
const accessoryNumberInput = document.querySelector('[data-accessory]')
var flowerNumber = 0
var counter = 0
var flowerData;
var flowerKeys;
var noOfFlowers;
var amountTotal = 0
var accessoryCounter;
var accessoriesData;
var accessoriesKeys;
var accessoryNumber;
var cart = {}
var selectedValues= Array()
totalAmount.textContent = `Total: Rs. ${amountTotal}`
var f;
var price;
await get(child(dbRef, '/Flowers')).then((snapshot) => {
    flowerData = snapshot.val()
    flowerKeys = Object.keys(flowerData)
    noOfFlowers = flowerKeys.length

    submitButton.addEventListener('click', () => {
        counter = noOfFlowersInput.value

        for (let i = 0; i < counter; i++) {
            flowerNumber = i
            flowerNumber++
            const dropdowns = dropdownTemplate.content.cloneNode(true).children[0]
            const dropdownFlowerNumber = dropdowns.querySelector('[data-flower-count]')
            dropdownFlowerNumber.textContent = `Flower ${flowerNumber}`


            flowerKeys.forEach(function (flower) {
                const options = dropdowns.querySelector('[data-option]')
                const optionsContainer = dropdowns.querySelector('[data-select-dropdown]')
                const optionsSelect = options.cloneNode()
                optionsSelect.setAttribute('value', flower)
                optionsSelect.textContent = `${flowerData[flower].name}  -Rs${flowerData[flower].price}`
                optionsContainer.append(optionsSelect)
            })
            dropdownContainer.append(dropdowns)

        }
        const dropdown = document.querySelectorAll('.dropdown-flower')
        dropdown.forEach((e) => {
            e.addEventListener('change', (x) => {
                
                f = x.target.value
                if (f != ""){
                    price = flowerData[f].price
                    amountTotal = amountTotal + price
                    totalAmount.textContent = `Total: Rs. ${amountTotal}`
                    selectedValues.push(f)
                    
                }
              

            })
        })
        resetButton.addEventListener('click', () => {
            dropdownContainer.innerHTML = ""
            accessoryDrodownContainer.innerHTML = ""
            accessoryCounter = 0
            accessoryNumber = 0
            counter = 0
            flowerNumber = 0
            amountTotal = 0
            totalAmount.textContent = `Total: Rs. ${amountTotal}`
        })

    })


})
await get(child(dbRef, '/Accessories')).then((snapshot) => {
    accessoriesData = snapshot.val()
    accessoriesKeys = Object.keys(accessoriesData)

    accessorySubmitButton.addEventListener('click', () => {
        accessoryCounter = accessoryNumberInput.value

        for (let x = 0; x < accessoryCounter; x++) {
            accessoryNumber = x
            accessoryNumber++
            const accessoryDropdown = accessoryTemplate.content.cloneNode(true).children[0]
            console.log(accessoryDropdown);
            const accessoryDropdownCount = accessoryDropdown.querySelector('[data-accessory-count]')
            accessoryDropdownCount.innerHTML = `Accessory ${accessoryNumber}`

            accessoriesKeys.forEach(accessory => {
                const accessoryOption = accessoryDropdown.querySelector('[data-accessory-option]')
                const accessoryOptionContainer = accessoryDropdown.querySelector('[data-select-accessory-dropdown]')
                const accessorySelect = accessoryOption.cloneNode()

                accessorySelect.setAttribute('value', accessory)
                accessorySelect.textContent = `${accessoriesData[accessory].name}  -Rs${accessoriesData[accessory].price}`
                accessoryOptionContainer.append(accessorySelect)

            });
            accessoryDrodownContainer.append(accessoryDropdown)

        }
        const dropdownAccessory = document.querySelectorAll('.dropdown-accessory')
        dropdownAccessory.forEach((e) => {
            e.addEventListener('change', (x) => {
              
                f = x.target.value
                if (f != "") {
                    price = accessoriesData[f].price
                    amountTotal = amountTotal + price
                    totalAmount.textContent = `Total: Rs. ${amountTotal}`
                    selectedValues.push(f)
                    console.log(selectedValues);
                }
             
            })
        })
    

        closeAlert.addEventListener('click', () => {
            alertContainer.style.display = "none"
        })

    })




})
addToCart.addEventListener('click', () => {
 
    if (selectedValues == "") {
        alert('Please give some values')
    }
    else{
        alertContainer.style.display = "block"
    selectedValues.forEach(x =>{
        cart[x] = (cart[x] || 0) +1 
        console.log(cart);

    })
    setInterval(() => {
        location.reload()
    }, 4000);
    }
    
})