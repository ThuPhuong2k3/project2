//load dữ liệu thống kê=================
//lượt truy cập
var numaccess =Number(localStorage.getItem('sum-access') );
$('#sumaccess').html(numaccess);
//đơn gần đây
function LoadDatadonRecent() {
    let list_order_his = JSON.parse(localStorage.getItem('order-history')) || [];
    let str = "";
    let i=0;
    let j = list_order_his.length - 1;
    for (let x =0; x < j;x++) {
        str += `
            <tr>
                <td>`+ list_order_his[j].madon +`</td>
                <td>`+ list_order_his[j].tenkh_ten + `</td>
                <td>`+ list_order_his[j].tongtien + `</td>
                <td>`+ list_order_his[j].trangthai + `</td>
            </tr>
        `;
        j--;
    }
    // document.getElementById("listdonhang").innerHTML = str;
    $('#listdonRecent').html(str);
}
LoadDatadonRecent();
// Load dữ liệu sản phẩm
function LoadDatasp() {
    let list = JSON.parse(localStorage.getItem('Product')) || [];
    var str = "";
    var sl = 0;
    list.sort();
    for (let x of list) {
        sl++;
        str += `
            <tr>
                <td>`+ x.masanpham +`</td>
                <td>`+ x.loaisp + `</td>
                <td>`+ x.tensanpham + `</td>
                <td>`+ x.slsp + `</td>
                <td>`+ x.giaban + `</td>
                <td>
                <ion-icon name="create-outline" title="Sửa" onclick="Suasp(`+ x.masanpham +`)"></ion-icon>
                <ion-icon name="trash-outline" title="Xóa" onclick="Xoasp(`+ x.masanpham +`)"></ion-icon>
                </td>
            </tr>
        `;
    }
    document.getElementById("listProduct").innerHTML = str;
    $('#tongsosp').html(sl);
}
LoadDatasp();

//Load dữ liệu khách hàng
function LoadDatakh() {
    var listkh = JSON.parse(localStorage.getItem('Customer')) || [];
    var str = "";
    var sl = 0;
    listkh.sort();
    for (let x of listkh) {
        sl++;
        str += `
            <tr>
                <td>`+ x.makh + `</td>
                <td>`+ x.tenkh_ho +` `+ x.tenkh_ten +`</td>
                <td>`+ x.sdtkh + `</td>
                <td>`+ x.emailkh + `</td>
                <td>`+ x.diachikh + `</td>
                <td>
                    <ion-icon name="trash-outline" title="Xóa" onclick="Xoakh(`+ x.makh +`)"></ion-icon>
                </td>
            </tr>
        `;
    }
    document.getElementById("listCustomer").innerHTML = str;
    $('#tongsokh').html(sl);
}
LoadDatakh();
//Load dữ liệu đơn hàng
function LoadDatadon() {
    var list_order = JSON.parse(localStorage.getItem('order')) || [];
    let str = "";
    let sl = 0;
    // list.sort();
    for (let x of list_order) {
        sl++;
        str += `
            <tr>
                <td>`+ x.madon +`</td>
                <td>`+ x.tenkh_ten + `</td>
                <td>`+ x.sdtkh + `</td>
                <td>`+ x.diachikh + `</td>
                <td>`+ x.tongtien + `</td>
                <td>
                <ion-icon name="close-outline" title="Gửi hàng" onclick="Huyhang(`+ x.madon +`)"></ion-icon>
                <ion-icon name="send-outline" title="Gửi hàng" onclick="Guihang(`+ x.madon +`)"></ion-icon>
                </td>
            </tr>
        `;
    }
    // document.getElementById("listdonhang").innerHTML = str;
    $('#listdonhang').html(str);
    $('#tongsodon').html(sl);
}
LoadDatadon();
//Load dữ liệu lịch sử đơn
function LoadDatalsdon() {
    var list_order_his = JSON.parse(localStorage.getItem('order-history')) || [];
    let str = "";
    let sl = 0;
    let tongtien = 0;
    let tongsp = 0;
    // list.sort();
    for (let x of list_order_his) {
        sl++;
        tongtien+= x.tongtien;
        tongsp+= x.soluongsp;
        str += `
            <tr>
                <td>`+ x.madon +`</td>
                <td>`+ x.makh + `</td>
                <td>`+ x.tongtien + `</td>
            </tr>
        `;
    }
    // document.getElementById("listlsdonhang").innerHTML = str;
    $('#listlsdonhang').html(str);
    $('#tonglsdon').html(sl);
    $('#spdaban').html(tongsp);
    $('#doanhthu').html(tongtien);
}
LoadDatalsdon();
//Quản lý sản phẩm======================
function Themsp() {
    let list = JSON.parse(localStorage.getItem('Product')) || [];
    var masanpham = document.getElementById("masp").value;
    var tensanpham = document.getElementById("tensp").value;
    var anhsp = document.getElementById("imgproduct").value;
    var slsp = document.getElementById("soluongsp").value;
    var giaban = document.getElementById("giaban").value;
    var loaisp = document.getElementById("loaisp").value;
    var number = /^[0-9]+$/;

    if (masanpham == null || masanpham == "") {
        var d = new Date();
        masanpham = Number(d);
    }
    else if (!masanpham.match(number) || masanpham.length != 5) {
        alert("Mã sản phẩm phải là kiểu số và có độ dài là 5 ký tự! Vui lòng nhập lại!");
        return false;
    }

    if (loaisp == "choose") {
        alert("Vui lòng chọn loại sản phẩm!");
        return false;
    }
    else if (tensanpham == null || tensanpham == "") {
        alert("Tên sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (slsp == null || slsp == "") {
        alert("Số lượng sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    } else if (slsp < 0) {
        alert("Số lượng sản phẩm phải lớn hơn hoặc bằng 0! Vui lòng nhập lại!");
        return false;
    }
    else if (giaban == null || giaban == "") {
        alert("Giá bán sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    } else if (giaban <= 0) {
        alert("Giá bán sản phẩm phải lớn hơn 0! Vui lòng nhập lại!");
        return false;
    }
    else {
        for (var x of list) {
            if (x.masanpham == masanpham) {
                alert("Mã sản phẩm đã tồn tại! Vui lòng nhập lại!")
                return false;
            }
        }
    }

    console.log("AddProduct");
    if (list == null) list = [];
    var product = {
        "loaisp": loaisp,
        "masanpham": masanpham,
        "tensanpham": tensanpham,
        "anhsp": anhsp,
        "slsp": slsp,
        "giaban": giaban
    };
    list.push(product);
    localStorage.setItem("Product", JSON.stringify(list));
    alert("Đã thêm thành công!");
    LoadDatasp();
    // location.reload();
}



function Nhapmoi() {
    document.getElementById('loaisp').value = 'choose';
    document.getElementById('masp').value = '';
    document.getElementById('tensp').value = '';
    document.getElementById('imgproduct').value = '';
    document.getElementById('soluongsp').value = '';
    document.getElementById('giaban').value = '';
}


function Xoasp(masanpham) {
    let list = JSON.parse(localStorage.getItem('Product')) || [];
    if (confirm("Bạn chắc chắn muốn xóa!")) {
        var index = list.findIndex(x => x.masanpham == masanpham);
        if (index >= 0) {
            list.splice(index, 1);
            // alert('debug');
        }
        LoadDatasp();
        localStorage.setItem('Product', JSON.stringify(list));
        // alert('Xóa thành công');
    }
}
function Suasp(masanpham) {
    let list = JSON.parse(localStorage.getItem('Product')) || [];
    for (x of list) {
        if (x.masanpham == masanpham) {
            document.getElementById('masp').value = x.masanpham;
            document.getElementById('tensp').value = x.tensanpham;
            document.getElementById('imgproduct').value = x.anhsp;
            document.getElementById('soluongsp').value = x.slsp;
            document.getElementById('giaban').value = x.giaban;
            document.getElementById('loaisp').value = x.loaisp;
        }
    }
}

function Capnhatsp() {
    let list = JSON.parse(localStorage.getItem('Product')) || [];
    var masanpham = document.getElementById("masp").value;
    var tensanpham = document.getElementById("tensp").value;
    var anhsp = document.getElementById("imgproduct").value;
    var slsp = document.getElementById("soluongsp").value;
    var giaban = document.getElementById("giaban").value;
    var loaisp = document.getElementById("loaisp").value;
    var number = /^[0-9]+$/;
    var ok = true;

    if (loaisp == "choose") {
        alert("Vui lòng chọn loại sản phẩm!");
        return false;
    }
    else if (tensanpham == null || tensanpham == "") {
        alert("Tên sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (slsp == null || slsp == "") {
        alert("Số lượng sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    } else if (slsp < 0) {
        alert("Số lượng sản phẩm phải lớn hơn hoặc bằng 0! Vui lòng nhập lại!");
        return false;
    }
    else if (giaban == null || giaban == "") {
        alert("Giá bán sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    } else if (giaban <= 0) {
        alert("Giá bán sản phẩm phải lớn hơn 0! Vui lòng nhập lại!");
        return false;
    }

    for (x of list) {
        if (x.masanpham == masanpham) {
            x.loaisp = loaisp;
            x.masanpham = masanpham;
            x.tensanpham = tensanpham;
            x.anhsp = anhsp;
            x.slsp = slsp;
            x.giaban = giaban;
            ok = false;
            break;
        }
    }

    if (ok == false) {
        alert("Cập nhật thông tin thành công!");
        localStorage.setItem("Product", JSON.stringify(list));
        LoadDatasp();
    }
    else {
        alert("Cập nhật thông tin thất bại!");
    }
}
//Quản lý khách hàng========================
function Themkh() {
    var listkh = JSON.parse(localStorage.getItem('Customer')) || [];
    var makh = document.getElementById("makh").value;
    var tenkh_ho = document.getElementById("tenkh_ho").value;
    var tenkh_ten = document.getElementById("tenkh_ten").value;
    var sdtkh = document.getElementById("sdtkh").value;
    var emailkh = document.getElementById("emailkh").value;
    var diachikh = document.getElementById("diachikh").value;
    var mkkh = document.getElementById("mkkh").value;
    var number = /^[0-9]+$/;
    var atposition = emailkh.indexOf("@");
    var dotposition = emailkh.lastIndexOf(".");

    if (makh == null || makh == "") {
        var d = new Date();
        makh = Number(d);
    }
    else if (!makh.match(number) || makh.length != 13) {
        alert("Mã khách hàng phải là kiểu số và có độ dài là 13 ký tự! Vui lòng nhập lại!");
        return false;
    }

    if (tenkh_ho == null || tenkh_ho == "") {
        alert("Tên khách hàng không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (tenkh_ten == null || tenkh_ten == "") {
        alert("Tên khách hàng không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (sdtkh == null || sdtkh == "") {
        alert("Số điện thoại khách hàng không được để trống! Vui lòng nhập lại!");
        return false;
    } else if (!sdtkh.match(number) || sdtkh.length != 10) {
        alert("Số điện thoại khách hàng phải là kiểu số và có độ dài là 10 ký tự! Vui lòng nhập lại!");
        return false;
    }
    else if (emailkh != "" && emailkh != null && (atposition < 1 || dotposition < (atposition + 2) || (dotposition + 2) >= emailkh.length)) {
        alert("Email khách hàng không hợp lệ! Vui lòng nhập lại!");
        return false;
    }
    else if (diachikh == null || diachikh == "") {
        alert("Địa chỉ khách hàng không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else {
        for (var x of listkh) {
            if (x.makh == makh) {
                alert("Mã khách hàng đã tồn tại! Vui lòng nhập lại!")
                return false;
            }
        }
    }

    console.log("AddCustomer");
    if (listkh == null) listkh = [];
    var customer = {
        "makh": makh,
        "tenkh_ho": tenkh_ho,
        "tenkh_ten": tenkh_ten,
        "sdtkh": sdtkh,
        "emailkh": emailkh,
        "diachikh": diachikh,
        "mkkh": mkkh
    };
    listkh.push(customer);
    localStorage.setItem("Customer", JSON.stringify(listkh));
    alert("Đã thêm thành công!");
    LoadDatakh();
}

function Xoakh(makh) {
    var listkh = JSON.parse(localStorage.getItem('Customer')) || [];
    if (confirm("Bạn chắc chắn muốn xóa!")) {
        var index = listkh.findIndex(x => x.makh == makh);
        if (index >= 0) {
            listkh.splice(index, 1);
        }
        LoadDatakh();
        localStorage.setItem('Customer', JSON.stringify(listkh));
    }
}
function NhapMoikh() {
    document.getElementById('makh').value = '';
    document.getElementById('tenkh_ten').value = '';
    document.getElementById('tenkh_ho').value = '';
    document.getElementById('sdtkh').value = '';
    document.getElementById('emailkh').value = '';
    document.getElementById('diachikh').value = '';
    document.getElementById('mkkh').value = '';
}

//Quản lý đơn hàng


function Guihang(madon) {

    var list_order = JSON.parse(localStorage.getItem('order')) || [];
    let index = list_order.findIndex(x => x.madon == madon);
    
    list_order[index].trangthai = "Đã gửi";

    var list_order_his = JSON.parse(localStorage.getItem('order-history')) || [];
    
    list_order_his.push(list_order[index]);
    localStorage.setItem('order-history', JSON.stringify(list_order_his));
    
    if (index >= 0) {
        list_order.splice(index, 1);
    }
    
    localStorage.setItem('order', JSON.stringify(list_order));
    alert("Gửi thành công");
    LoadDatadon();
    LoadDatalsdon();
    // window.location.reload();
}
function Huyhang(madon) {
    var list_order = JSON.parse(localStorage.getItem('order')) || [];
    if (confirm("Bạn chắc chắn muốn hủy đơn ?")) {
        var index = list_order.findIndex(x => x.madon == madon);
        if (index >= 0) {
            list_order.splice(index, 1);
        }
        localStorage.setItem('order', JSON.stringify(list_order));
        LoadDatadon();
    }
}


//bắt sk cho Ảnh
let img = document.getElementById('file-img');
let input = document.getElementById('input');
input.onchange = (e) => {
    if(input.files[0])
        img.src = URL.createObjectURL(input.files[0]);
};

