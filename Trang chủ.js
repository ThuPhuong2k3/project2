const btn = document.querySelectorAll("button")
// console.log(btn)     //Dùng để kiểm tra xem đã nhận đc chưa
btn.forEach(function(button,index){     //Hàm forEach trả về cho cta một cái list dữ liệu và các index(stt của nó)
    button.addEventListener("click",function(event){{
        var btnItem = event.target   //Khi click đúng vào thì nó sẽ chọn phần tử đấy
        var product = btnItem.parentElement
        var productImg = product.querySelector("img").src  //Lấy link ảnh
        var productName = product.querySelector(".product-name").innerText
        var productPrice = product.querySelector(".product-price span").innerText
        // console.log(productPrice)
        addCart(productImg,productName,productPrice)
    }})
})
//Tạo function để thực thi
function addCart(productImg,productName,productPrice){
    var addtr = document.createElement("tr")        //Tạo element
    var cartItem = document.querySelectorAll("tbody tr")
    for(var i=0;i<cartItem.length;i++){
        var productT = document.querySelectorAll(".title-productName")
        if(productT[i].innerHTML == productName){
            alert("Sản phẩm của bạn đã có trong giỏ hàng") // Hiển thị 1 hộp thoại thông báo
            return
        }   
    }
    var trcontent = '<tr><td class="table-row1"><img class="table-img" src="'+productImg+'" alt="ảnh"><span class="title-productName">'+productName+'</span></td><td><span class="Prices">'+productPrice+'</span><u>đ</u></td><td><input class="table-input" type="number" value="1" min="1"></td><td style="cursor: pointer;"><span class="Delete">Xóa</span></td></tr>'
    addtr.innerHTML = trcontent
    var cardtable = document.querySelector("tbody")
    cardtable.append(addtr)
    carttotal()
    deleteCart()
    // addCheckout(productImg, productName, productPrice)
}


// ---------------------------Tổng giá tiền-----------------------------
function carttotal(){// teen hamf
    //Danh sachs cacs cau lech teen ham
    var cartItem = document.querySelectorAll("tbody tr")
    var totalC = 0
    // console.log(cartItem.length)
    for(var i=0;i<cartItem.length;i++){     //Lệnh khởi tạo--Thực hiện duy nhất một lần và dùng đểkhởi tạo biến đếm ; điều kiện--điều kiện vòng lặp; lệnh tăng--thay đổi biến đếm trong vòng lặp
        // console.log(i)
        var inputValue = cartItem[i].querySelector("input").value
        // console.log(inputValue)
        var productPrice = cartItem[i].querySelector(".Prices").innerHTML
        // console.log(productPrice)
        totalA = inputValue*productPrice*1000
        // console.log(totalB)
        totalC = totalC + totalA
        // console.log(totalC)
    }
    var carttotalA = document.querySelector(".price-total span")
    carttotalA.innerHTML = totalC.toLocaleString('de-DE')
    inputchange()
    updateCartCount()
}

// ----------------------Xóa sp----------------------
function deleteCart(){
    var cartItem = document.querySelectorAll("tbody tr")
    for(var i=0;i<cartItem.length;i++){
        var productT = document.querySelectorAll(".Delete")
        productT[i].addEventListener("click",function(event){   //Bắt sư kiện
            var cartDelete = event.target
            var cartItemDelete = cartDelete.parentElement.parentElement
            cartItemDelete.remove()
            carttotal()
            // console.log(cartItemDelete)
        })
    }
}

function inputchange(){
    var cartItem = document.querySelectorAll("tbody tr")
    for(var i=0;i<cartItem.length;i++){
        var inputValue = cartItem[i].querySelector("input")
        inputValue.addEventListener("change", function(){
            carttotal()
        })
    }
}

/*---------THAY ĐỔI SỐ LƯỢNG SẢN PHẨM HIỂN THỊ Ở GIỎ HÀNG-----------*/
function updateCartCount() {
    var cartCountElement = document.querySelector(".quantityCart");
    var cartItem = document.querySelectorAll("tbody tr");
    var totalCount = 0;
    cartItem.forEach(function (item) {
        var quantityInput = item.querySelector("input");
        var quantity = parseInt(quantityInput.value);
        totalCount += quantity;
    });
    cartCountElement.innerText = totalCount;
}



// ----------------------Bắt sự kiện cho x-----------------------
const cartbtn = document.querySelector(".fa-xmark")
const cartshow = document.querySelector(".btncart")
cartshow.addEventListener("click",function(){
    // console.log(cartshow)
    document.querySelector(".cart").style.right = "0"
})

cartbtn.addEventListener("click",function(){
    // console.log(cartshow)
    document.querySelector(".cart").style.right = "-100%"
})

//Thay thế chèn nd thông qua class hc id
//jv là 1 ngôn ngữ kịch bản