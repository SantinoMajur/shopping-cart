const label = document.getElementById('label')
const shoppingCart = document.getElementById('shopping-cart')


let basket = JSON.parse(localStorage.getItem("data")) || []

const calculation = () => {
    const cartIcon = document.getElementById("cartNumber")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation()

const generateCartItem = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x
            let search = shopData.find((y) => y.id === id) || []
            let {img, name, price} = search
            return `
            <div
            class="flex gap-2 border-2 border-gray-900 rounded-md h-24 md:h-auto"
          >
            <img src="${img}" width="100" />
            <div class="relative md:static">
              <div
                class="flex items-center justify-between w-56 py-1 relative md:static"
              >
                <h4
                  class="flex items-center gap-2 font-bold absolute top-8 left-0 md:static"
                >
                  <p>${name}</p>
                  <p class="bg-gray-900 text-gray-200 px-2 rounded">$ ${price}</p>
                </h4>
                <span
                  onclick="removeItem(${id})"
                  class="material-symbols-outlined text-red-800 cursor-pointer absolute top-0.5 right-16 md:static"
                  >close</span
                >
              </div>
              <div
                class="flex gap-2 text-center absolute bottom-0 right-16 md:static"
              >
                <div
                  onclick="decrement(${id})"
                  class="text-red-800 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20 12H4"
                    />
                  </svg>
                </div>
                <div id="${id}">${item}</div>
                <div
                  onclick="increment(${id})"
                  class="text-green-900 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </div>
              <h3 class="font-bold absolute bottom-0 left-0 md:static">
                $ ${item * search.price}
              </h3>
            </div>
          </div>         
            `
        }).join(' '))
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart Empty</h2>
        <a href=".../index.html">
          <button class="bg-gray-800 text-gray-100 rounded p-2 mt-3">
            Continue Shopping
          </button>
        </a>
        `
    }
};
generateCartItem()

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem)
    if (search === undefined) {
        basket.push({
            id: selectedItem,
            item: 1,
        })
    }
    else {
        search.item += 1;
    }
    generateCartItem()
    update(selectedItem)
    localStorage.setItem("data", JSON.stringify(basket))


}
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem)
    if (search === undefined) {
        return;
    }
    else if (search.item === 0) {
        return;
    }
    else {
        search.item -= 1;
    }
    update(selectedItem)
    basket = basket.filter((x) => x.item !== 0)
    generateCartItem()
    localStorage.setItem("data", JSON.stringify(basket))

}
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item
    calculation()
    totalAmount()
   
}
let removeItem = (id) => {
    let selectedItem = id
    basket = basket.filter((x) => x.id !== selectedItem)
    generateCartItem()
    totalAmount()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))
}

let clearCart = () => {
    basket = []
    generateCartItem()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))

}

let totalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) =>{
            let { id, item } = x
            let search = shopData.find((y) => y.id === id) || []
            return item * search.price
        }).reduce((x, y) => x + y, 0)
        label.innerHTML = `
        <h2 class="font-bold">Total Amount: $ ${amount}</h2>
        <button
          class="bg-green-800 text-gray-100 p-1.5 rounded mt-2.5 cursor-pointer"
        >
          Checkout
        </button>
        <button
          onclick="clearCart()"
          class="bg-red-800 text-gray-100 p-1.5 rounded mt-2.5 cursor-pointer"
        >
          Clear Cart
        </button>
        `
    } else {
        return
    }
}
totalAmount()
