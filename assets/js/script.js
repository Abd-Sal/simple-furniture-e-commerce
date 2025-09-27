window.addEventListener('DOMContentLoaded', function(){
    var swiper = new Swiper(".head-swiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
        navigation: {
            nextEl: ".swiper-head-custom-next",
            prevEl: ".swiper-head-custom-prev",
        },
        breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 50,
        },
        },
    });
    var swiper2 = new Swiper(".myMobile", {
        slidesPerView: 1.4,
        spaceBetween: 10,
        pagination: {
            type: "progressbar",
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    
    Fancybox.bind('[data-fancybox="gallery"]', {
    // Your custom options for a specific gallery
    });
    
    AOS.init();

    let closeBtn = this.document.getElementById('close');
    closeBtn.addEventListener('click', function(){
        let top_head = document.getElementById('top-head')
        let swiper_customization = document.querySelectorAll('.swiper-customization img')
        top_head.classList.add('close-top');
        swiper_customization.forEach(function(item){
            item.classList.add('extend-swiper_customization')
        })
        console.log('inject')
    })

    let search_btn = this.document.getElementById('search-btn')
    let search_field = this.document.getElementById('search-field')
    search_btn.addEventListener('click', function(){
        window.open(`shop.html?search=${search_field.value}`, '_blank')
    })

    //Start Up Call Functions
    updateCartCountInUI();
    fillOffcanvesCartWithProducts();
    injectTotalAmountInCart();
    cartButtons();
    removeProductFromCartUI();

    if (window.location.pathname.includes('index.html') || 
        window.location.href.includes('index.html')){
        CallProductsAPI('http://localhost:5000/api/products');
    }else if(this.window.location.href.includes('shop.html?search=') ||
            this.window.location.href.includes('shop.html')){
        caaSearchProductAPI();
    }
    



    //functions
    function cartButtons(){
        removeProductFromCartUI();
        decreamentInCartButton();
        increamentInCartButton();
    }

    function removeProductFromCartUI(){
        let remove_btns = document.querySelectorAll(`.remove-from-cart`)
        remove_btns.forEach((item)=>{
            if(!item){
                return;
            }
            item.addEventListener('click', function(){
                let id = item.id.split('_')[0]
                let product_card_in_cart = document.getElementById(`${id}-product-card-in-cart`)
                removeFromCart(id);
                product_card_in_cart.remove();
                updateCartCountInUI();
                injectTotalAmountInCart();
            })
        })
    }

    function decreamentInCartButton(){
        let decrease_one_product = this.document.querySelectorAll('.decrease-one-product')
        decrease_one_product.forEach((item)=>{
            if(!item){
                return
            }
            item.addEventListener('click', function(){
                decreaseProductCountInCart(item.id)
                let product_count = document.getElementById(`${item.id}_product-count`)
                let count = parseInt(product_count.textContent.trim())
                if(count > 1){
                    count--;
                }else{
                    let product_card_in_cart = document.getElementById(`${item.id}-product-card-in-cart`)
                    product_card_in_cart.remove();
                }
                product_count.innerText = parseInt(product_count.innerText) - 1
            })
        })
    }

    function increamentInCartButton(){
        let increase_one_product = this.document.querySelectorAll('.increase-one-product')
        increase_one_product.forEach((item)=>{
            if(!item){
                return
            }
            item.addEventListener('click', function(){
                increaseProductCountInCart(item.id)
                let product_count = document.getElementById(`${item.id}_product-count`)
                product_count.innerText = parseInt(product_count.innerText) + 1
            })
        })
    }
    
    function getCartItemsJSON(){
        let itemCart = localStorage.getItem('cart');
        if(!itemCart){
            return
        }
        let productsJSON = [];
        itemCart = itemCart.split("::");
        itemCart.forEach((item)=>{
            if(item){        
                productsJSON.push(JSON.parse(item));
            }
        })
        return productsJSON;
    }

    function caaSearchProductAPI(){
        const urlParams = new URLSearchParams(window.location.search);
        let searchText = urlParams.get('search');
        if(!searchText)
            searchText = '';
        fetch(`http://localhost:5000/api/products?search=${searchText}`)
        .then((response)=>{
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Unexpected Error!')
            }
        })
        .then((body)=>{
            let shop_products_row = document.getElementById('shop-products-row')
            let allProducts = []
            body.forEach((item)=>{
                let {id, name, category, description,  images, price, discount } = item
                allProducts.push(`
                    <div class="col-lg-4 mb-4">
                        <div class="sec-5-product-card">
                            <div class="row">
                                <div class="col-12">
                                    <div class="top-card-sec-5 position-relative">
                                        <img src="${images[0].url}" alt="product">
                                        <button id="${id}" class="add-to-card btn position-absolute add-to-card-btn w-80">Add To Cart</button>
                                        <span class="new-label d-flex justify-content-center align-items-center position-absolute">New</span>
                                        <button class="btn favorite-btn d-flex justify-content-center align-items-center position-absolute">
                                            <i class="fa-solid fa-heart hide-love"></i>
                                            <i class="fa-regular fa-heart"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="bottom-card-sec-5 p-2 d-flex flex-column gap-2">
                                        <div class="rate d-flex justify-content-start align-items-center gap-2">
                                            <div class="star">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                </svg>
                                            </div>
                                            <div class="star">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                </svg>
                                            </div>
                                            <div class="star">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                </svg>
                                            </div>
                                            <div class="star">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                </svg>
                                            </div>
                                            <div class="star">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <h2 class="product-title">${name}</h2>
                                        <div class="prices d-flex justify-content-start align-items-center gap-4">
                                            <h2 class="main-price">$${(discount > 0 && discount <= 100) ? price - (price * discount) : price}</h2>
                                            <h2 class="price-after-discount">${(discount > 0) ? '$'+price : ''}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                );
            })
            shop_products_row.innerHTML = allProducts.join('');   //.slice(0, 4).join('');
        })
        .catch((e)=>{
            console.log(e.message);
        })
        .finally(()=>{
            //  we put this code in fincally cause when we put it in out: the id not set to button in html cause
            //  the api not in the call and this code work before the api call ended
            let addToCard = document.querySelectorAll(".add-to-card");
            addToCard.forEach((item)=>{
                item.addEventListener('click', ()=>{
                    if(checkIfProductInCart(item.id)){
                        increaseProductCountInCart(item.id);
                        fillOffcanvesCartWithProducts();
                        return;
                    }
                    fetch(`http://localhost:5000/api/products/${item.id}`)
                    .then((response)=>{
                        if(response.ok){
                            return response.json();
                        }else{
                            throw new Error("Faild response and not added to cart");
                        }
                    }).then((body)=>{
                        let productObject = {
                            product: JSON.stringify(body),
                            count: 1
                        };
                        let product = `${JSON.stringify(productObject)}::`;
                        let products = localStorage.getItem('cart')
                        let mergeProducts = `${products == null ? '' : products}${product}`;
                        localStorage.setItem('cart', mergeProducts)
                        updateAllCartContentInUI();
                        cartButtons();
                    }).catch((e)=>{
                        console.error(e.message);
                    }).finally();
                })
            })
        });
        
    }

    function CallProductsAPI(){
        this.fetch('http://localhost:5000/api/products')
        .then((response)=>{
            if(response.ok){
                return response.json();
            }else{
                throw new Error("something is wrong");
            }
        }).then((body)=>{
            let mobileSwiper = document.getElementById('mobile-swiper');
            let desktop = document.getElementById('desktop-products');
            let allProducts = []
            let desktopProducts = []
            body.forEach((item)=>{
                let {id, name, category, description,  images, price, discount } = item
                allProducts.push(`
                                <div class="swiper-slide">
                                    <div class="col-lg-3">
                                        <div class="sec-5-product-card">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="top-card-sec-5 position-relative">
                                                        <img src="${images[0].url}" alt="product">
                                                        <button id="${id}" class="add-to-card btn position-absolute add-to-card-btn w-80">Add To Cart</button>
                                                        <span class="new-label d-flex justify-content-center align-items-center position-absolute">New</span>
                                                        <button class="btn favorite-btn d-flex justify-content-center align-items-center position-absolute">
                                                            <i class="fa-solid fa-heart hide-love"></i>
                                                            <i class="fa-regular fa-heart"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="bottom-card-sec-5 p-2 d-flex flex-column gap-2">
                                                        <div class="rate d-flex justify-content-start align-items-center gap-2">
                                                            <div class="star">
                                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                                </svg>
                                                            </div>
                                                            <div class="star">
                                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                                </svg>
                                                            </div>
                                                            <div class="star">
                                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                                </svg>
                                                            </div>
                                                            <div class="star">
                                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                                </svg>
                                                            </div>
                                                            <div class="star">
                                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <h2 class="product-title">${name}</h2>
                                                        <div class="prices d-flex justify-content-start align-items-center gap-4">
                                                            <h2 class="main-price">$${(discount > 0 && discount <= 100) ? price - (price * discount) : price}</h2>
                                                            <h2 class="price-after-discount">${(discount > 0) ? '$'+price : ''}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                `)
                desktopProducts.push(`
                    <div class="col-lg-3 mb-4">
                        <div class="sec-5-product-card">
                            <div class="row">
                                <div class="col-12">
                                    <div class="top-card-sec-5 position-relative">
                                        <img src="${images[0].url}" alt="product">
                                        <button id="${id}" class="add-to-card btn position-absolute add-to-card-btn w-80">Add To Cart</button>
                                        <span class="new-label d-flex justify-content-center align-items-center position-absolute">New</span>
                                        <button class="btn favorite-btn d-flex justify-content-center align-items-center position-absolute">
                                            <i class="fa-solid fa-heart hide-love"></i>
                                            <i class="fa-regular fa-heart"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="bottom-card-sec-5 p-2 d-flex flex-column gap-2">
                                        <div class="rate d-flex justify-content-start align-items-center gap-2">
                                            <div class="star">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                </svg>
                                            </div>
                                            <div class="star">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                </svg>
                                            </div>
                                            <div class="star">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                </svg>
                                            </div>
                                            <div class="star">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                </svg>
                                            </div>
                                            <div class="star">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <h2 class="product-title">${name}</h2>
                                        <div class="prices d-flex justify-content-start align-items-center gap-4">
                                            <h2 class="main-price">$${(discount > 0 && discount <= 100) ? price - (price * discount) : price}</h2>
                                            <h2 class="price-after-discount">${(discount > 0) ? '$'+price : ''}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                );
            })
            mobileSwiper.innerHTML =  allProducts.join('');
            desktop.innerHTML = desktopProducts.join('');   //.slice(0, 4).join('');
        }).catch((e)=>{
            console.log(`${e.statusCode}: ${e.message}`)
        }).finally(()=>{
            //  we put this code in fincally cause when we put it in out: the id not set to button in html cause
            //  the api not in the call and this code work before the api call ended
            let addToCard = document.querySelectorAll(".add-to-card");
            addToCard.forEach((item)=>{
                item.addEventListener('click', ()=>{
                    if(checkIfProductInCart(item.id)){
                        increaseProductCountInCart(item.id);
                        fillOffcanvesCartWithProducts();
                        removeProductFromCartUI();
                        cartButtons();
                        return;
                    }
                    fetch(`http://localhost:5000/api/products/${item.id}`)
                    .then((response)=>{
                        if(response.ok){
                            return response.json();
                        }else{
                            throw new Error("Faild response and not added to cart");
                        }
                    }).then((body)=>{
                        let productObject = {
                            product: JSON.stringify(body),
                            count: 1
                        };
                        let product = `${JSON.stringify(productObject)}::`;
                        let products = localStorage.getItem('cart')
                        let mergeProducts = `${products == null ? '' : products}${product}`;
                        localStorage.setItem('cart', mergeProducts)
                        updateAllCartContentInUI();
                        cartButtons();
                        removeProductFromCartUI();
                    }).catch((e)=>{
                        console.error(e.message);
                    }).finally();
                })
            })
        });
    }

    function checkIfProductInCart(productID){
        let products = localStorage.getItem('cart');
        if(!productID || !products || !products.includes(`${productID}`)){
            return false
        }
        return true;
    }
    
    function increaseProductCountInCart(productID){
        if(!checkIfProductInCart(productID)){
            console.log('not found the product')
            return;
        }
        let cartContent = localStorage.getItem('cart');
        if(!cartContent){
            return;
        }
        cartContent = cartContent.split("::")
        let temp = [];
        let data = cartContent.forEach((item)=>{
            if(item){
                let productInCart = JSON.parse(item);
                let product = JSON.parse(productInCart.product)
                if(product.id == productID){
                    productInCart.count += 1;
                }
                let newItem = JSON.stringify(
                    {
                        product: JSON.stringify(product),
                        count: productInCart.count
                    }
                ) + '::';
                temp.push(newItem);
            }
        })
        localStorage.setItem('cart', temp.join(''));
        updateCartCountInUI();
        injectTotalAmountInCart();
    }    
    
    function decreaseProductCountInCart(productID){
        if(!checkIfProductInCart(productID)){
            console.log('not found the product')
            return;
        }
        let cartContent = localStorage.getItem('cart');
        if(!cartContent){
            return;
        }
        cartContent = cartContent.split("::")
        let temp = [];
        let data = cartContent.forEach((item)=>{
            if(item){
                let productInCart = JSON.parse(item);
                let product = JSON.parse(productInCart.product)
                if(product.id == productID && productInCart.count >= 1){
                    productInCart.count -= 1;
                }
                if(productInCart.count > 0){
                    let newItem = JSON.stringify(
                        {
                            product: JSON.stringify(product),
                            count: productInCart.count
                        }
                    ) + '::';
                    temp.push(newItem);
                }
            }
        })
        localStorage.setItem('cart', temp.join(''));
        updateCartCountInUI();
        injectTotalAmountInCart();
    }

    function removeFromCart(productID){
        let products = getCartItemsJSON();
        if(!products){
            return;
        }
        let temp = [];
        products.forEach((item)=>{
            if(!item){
                return;
            }
            let product = JSON.parse(item.product);
            let count = item.count;
            if(product.id != productID){
                let newItem = JSON.stringify({
                    product: JSON.stringify(product),
                    count: count
                }) + '::';
                temp.push(newItem);
            }
        })
        localStorage.setItem('cart', temp.join(''))
    }
    
    function getCountOfProductsInCart(){
        let productsArr = getCartItemsJSON();
        if(!productsArr){
            return 0;
        }

        let totalCount = 0;
        productsArr.forEach((item)=>{
            totalCount += item.count;
        })
        return totalCount;
    }

    function updateCartCountInUI(){
        let count_of_products_in_cart = document.getElementsByClassName('count-of-products-in-cart');
        for(let i = 0; i < count_of_products_in_cart.length; i++){
            count_of_products_in_cart[i].innerText = getCountOfProductsInCart()
        }
    }

    function fillOffcanvesCartWithProducts(){
        let products = getCartItemsJSON();
        if(!products){
            return
        }
        let cart_body_products = this.document.getElementById('cart-body-products');
        let allProducts = [];
        products.forEach((item) => {
            let product = JSON.parse(item.product)
            let count = JSON.parse(item.count);
            allProducts.push(`
                    <div id="${product.id}-product-card-in-cart" class="product-card-in-cart pt-1 pb-1">
                        <div class="row mb-3">
                            <div class="col-3 full-height">
                                <div class="product-img d-flex justify-content-center align-items-center">
                                    <img src="${product.images[0].url}" alt="product">
                                </div>
                            </div>
                            <div class="col-7 full-height">
                                <div class="middlie-sec-in-card d-flex flex-column justify-content-center align-items-start gap-3">
                                    <h2 class="product-title">${product.name}</h2>
                                    <span class="product-color">${product.images[0].color}</span>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button id="${product.id}" type="button" class="decrease-one-product btn btn-primary">-</button>
                                        <div id="${product.id}_product-count" type="button" class="btn btn-primary">${count}</div>
                                        <button id="${product.id}" type="button" class="increase-one-product btn btn-primary">+</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2 full-height">
                                <div class="last-sec-in-card d-flex flex-column justify-content-center align-items-center gap-3">
                                    <h2 class="product-price">$${product.discount > 0 ? (product.price - (product.price * product.discount)) : product.price}</h2>
                                    <button id="${product.id}_remove-from-cart" type="button" class="remove-from-cart btn-close" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                    </div>
            `)
        })
        cart_body_products.innerHTML = allProducts.join('');
        injectTotalAmountInCart();
    }

    function updateAllCartContentInUI(){
        updateCartCountInUI();
        fillOffcanvesCartWithProducts();
    }

    function calculateTotalAmountOfCartProducts(){
        let products = getCartItemsJSON()
        if(!products){
            return 0.00
        }
        let total = 0;
        products.forEach((item)=>{
            let product = JSON.parse(item.product);
            let count = parseFloat(1 * item.count);
            if(product.discount == 0){
                total += (parseFloat(product.price) * count); 
            }else{
                total += ((parseFloat(product.price) - (parseFloat(product.price) * parseFloat(product.discount))) * count);
            }
        })
        return parseFloat(total);
    }
    
    function injectTotalAmountInCart(){
        let total_amount = document.querySelectorAll('.total-amount')
        total_amount.forEach((item)=>{
            item.innerText = `$${calculateTotalAmountOfCartProducts()}`
        })
    }
})
