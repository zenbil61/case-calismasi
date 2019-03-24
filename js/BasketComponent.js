class BasketComponent {
    constructor() {
        //this.UpdateBasket([]);
        this.ReRender();
    }

    // Sepetimizi Günceller
    UpdateBasket(_selecteds) {
        Helper.LocalSet("SelectedProducts", _selecteds)
    }
    //Sepetteki Her Değişiklik yapıldığında burası çalışır ve önyüzde etki ettiği her yeri günceller
    ReRender() {

        var basketList = document.getElementById("basket-list");//sep
        basketList.innerHTML = "";

        let selecteds = this.GetSelectedProducts();
        var totalAmount = 0.00;

        selecteds.map((item) => {
            var product = this.GetProduct(item.productId)
            totalAmount += (parseFloat(item.count) * parseFloat(product.ListPrice))

            basketList.appendChild(new BasketItemComponent(product, item.count))

        })

        //Tutarları Güncelleme
        var amountsBox = document.getElementsByClassName("amount");
        for (var i = 0; i < amountsBox.length; i++) {
            amountsBox[i].innerText = totalAmount;
        }

    }
    //Sepete Yeni Ürün Ekler
    Add(_item) {
        let selecteds = this.GetSelectedProducts();

        let isCheck = false;

        selecteds.map((item) => {
            if (item.productId == _item.productId) {
                item.count += parseInt(_item.count);
                isCheck = true;
            }
        })

        if (!isCheck) selecteds.push(_item)

        this.UpdateBasket(selecteds);
        this.ReRender();
    }
    //Sepetten Ürün Siler
    Delete(_productId) {
        let selecteds = this.GetSelectedProducts();

        for (var i = 0; i < selecteds.length; i++) {
            var item = selecteds[i];

            if (_productId == item.productId) {
                selecteds.splice(i, 1);
                break;
            }
        }


        this.UpdateBasket(selecteds);
        this.ReRender();
    }
    //Sepetteki ürün sayısını arttırır
    Upper(_productId) {
        let selecteds = this.GetSelectedProducts();

        for (let item of selecteds) {
            if (item.productId == _productId) {
                item.count++
                break;
            }
        }
        Helper.LocalSet("SelectedProducts", selecteds);
        this.ReRender();
    }
    //Sepetteki Ürün Sayısını azaltır
    Lower(_productId) {
        let selecteds = this.GetSelectedProducts();

        for (let item of selecteds) {
            if (item.productId == _productId) {
                if (item.count > 1) {
                    item.count--
                    break;
                }

            }
        }
        Helper.LocalSet("SelectedProducts", selecteds);
        this.ReRender();
    }
    //Sepetteki ürün id ve sayılarını döndürür
    GetSelectedProducts() {
        return Helper.LocalGet("SelectedProducts");
    }
    //productid verilerek menuData.json içerisindeki ürünü bulur ve döndürür
    GetProduct(_productId) {
        var isCheck = false;
        var product = null;
        var categories = Helper.LocalGet("categories")

        for (let catItem of categories) {

            for (let pItem of catItem.Products) {
                if (pItem.ProductId == _productId) {
                    product = pItem;
                    isCheck = true;
                    break;
                }
            }
            if (isCheck) break;
        }

        return product;

    }
}

/**
 * @class BasketItem - Sepetteki Seçilen Ürünlerin HTML elementini döndürür
 */
class BasketItemComponent {

    constructor(_product, _count) {
        let parentElement = this.CreateParent(_product.ProductId);

        parentElement.appendChild(this.CreateLeft(_product, _count))
        parentElement.appendChild(this.CreateImage("yemek.Jpeg"))
        parentElement.appendChild(this.CreateCenter(_product.DisplayName, _product.Description))
        parentElement.appendChild(this.CreateRight(_product.ListPrice, _count))

        return parentElement;
    }

    CreateParent(_productid) {
        let content = document.createElement("div");
        content.className = "basket";

        return content;
    }
    CreateLeft(_product, _count) {
        let left = document.createElement("div");
        left.className = "left";

        let deleteButton = document.createElement("delete");
        deleteButton.className = "btn-delete";
        deleteButton.innerText = "sil";
        deleteButton.setAttribute("onclick", "method.DeleteBasket('" + _product.ProductId + "')")

        let countInput = document.createElement("input");
        countInput.className = "count-input";
        countInput.setAttribute("type", "text");
        countInput.setAttribute("productid", _product.ProductId);
        countInput.value = _count
        countInput.readOnly = true;

        let addButton = document.createElement("button");
        addButton.className = "btn-add";
        addButton.innerText = "+"
        addButton.setAttribute("onclick", "method.UpdateBasket('+','" + _product.ProductId + "')")

        let removeButton = document.createElement("button");
        removeButton.className = "btn-remove";
        removeButton.innerText = "-"
        removeButton.setAttribute("onclick", "method.UpdateBasket('-','" + _product.ProductId + "')")

        left.appendChild(deleteButton)
        left.appendChild(countInput)
        left.appendChild(addButton)
        left.appendChild(removeButton)



        return left;

    }
    CreateImage(_path) {
        var image = document.createElement("img");
        image.className = "image"
        image.src = _path;

        return image;
    }
    CreateCenter(_title, _description) {
        let center = document.createElement("div");
        center.className = "center";
        center.innerText = _title;

        let description = document.createElement("div")
        description.innerText = _description;
        description.className = "description"

        center.appendChild(description);
        return center;
    }
    CreateRight(_price, _count) {
        let right = document.createElement("div");
        right.className = "right";
        right.innerText = _price + " x " + _count + " = " + (parseFloat(_price) * parseFloat(_count)) + " TL";
        return right;
    }
}
