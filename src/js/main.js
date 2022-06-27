let shop = document.getElementById('shop');



let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop = () => {
    return (shop.innerHTML = shopData.map((x) => {
        let { id, desc, name, img, price } = x

        let search = basket.find((x) => x.id === id) || []
        return `
        <div id="product-id-${id}" class="border-2 border-gray-900 rounded-md">
        <img class="h-52 w-full rounded-t rounded-r" src="${img}" alt="" />
        <div class="flex flex-col p-2 gap-2">
          <h3 class="text-2xl font-bold">${name}</h3>
          <p class="text-base font-semibold text-gray-600">${desc}</p>
          <div class="flex justify-between text-center">
            <h2 class="text-xl font-bold">$68</h2>
            <div class="flex justify-between gap-2 text-center">
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
              <div id="${id}">
                ${search.item === undefined ? 0 : search.item}
              </div>
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
          </div>
        </div>
      </div>
        `
    }).join(""))
}
generateShop()

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

    localStorage.setItem("data", JSON.stringify(basket))

}
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    calculation()
}

let calculation = () => {
    let cartIcon = document.getElementById("cartNumber")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation()