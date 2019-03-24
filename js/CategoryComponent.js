
//Kategori Yönetiminin Yapıldığı Component 
class CategoryComponent {

    constructor(_element) {
        this.element = _element;
        this.ReRender(this.GetCategories());
    }

    //menuData.jsondan okunan kategori ve ürün bilgilerini getirir
    GetCategories() {
        return Helper.LocalGet("categories")
    }

    //ürünler içerisinde Ürünün DisplayName ve Description alanına göre arama yapar
    Search(_key) {
        let result = { DisplayName: "Arama Sonuçları..", Products: [] }
        let categories = this.GetCategories();
        if (_key.length > 0) {
            categories.map((item) => {
                item.Products.map((productItem) => {
                    if (productItem.DisplayName.toLowerCase().indexOf(_key.toLowerCase()) != -1)
                        result.Products.push(productItem)
                    else if (productItem.Description.toLowerCase().indexOf(_key.toLowerCase()) != -1)
                        result.Products.push(productItem)

                })
            })
            this.ReRender([result]);
        }
        else {
            this.ReRender(categories)
        }
    }

    //Kategori Listesi verilir ve verilen listeye göre değişiklikleri ön yüze yansı
    ReRender(_categories) {
        this.element.innerHTML = "";

        _categories.map((item) =>
            this.element.appendChild(new CategoryItemComponent(item)))
    }
}




//Kategorileri Oluşturan component - Bu Kategoriler içerisinde ürünler olacaktır
class CategoryItemComponent {

    constructor(_category) {

        let parentElement = this.CreateParent();
        parentElement.appendChild(this.CreateTitle(_category.DisplayName))

        let productList = this.CreateProductList();
        _category.Products.map((item) =>
            productList.appendChild(new ProductItemComponent(item)))

        parentElement.appendChild(productList)

        return parentElement;
    }

    CreateParent = () => {
        let categoryElement = document.createElement("div");
        categoryElement.className = "category"
        return categoryElement;
    }
    CreateTitle = (_item) => {
        let categoryTitle = document.createElement("h4")
        categoryTitle.textContent = _item
        return categoryTitle;
    }
    CreateProductList = () => {
        let productListElement = document.createElement("div");
        productListElement.className = "product-list"
        return productListElement;
    }


}

//Kategoriler içindeki Ürünü oluşturan Component
class ProductItemComponent {
    constructor(_item) {
        let parentElement = this.CreateParent();

        parentElement.appendChild(this.CreateLeft(_item))
        parentElement.appendChild(this.CreateCenter(_item))
        parentElement.appendChild(this.CreateRight(_item))

        return parentElement
    }
    //Parent Elementi oluşturur
    CreateParent() {

        let productElement = document.createElement("div");
        productElement.className = "product"

        return productElement;
    }
    //Adet input ve Sepete Ekle butonlarını oluşturur
    CreateLeft(_item) {

        let left = document.createElement("div");
        left.className = "product-left";

        let addButton = document.createElement("button");
        addButton.textContent = "+"
        addButton.className = "btn-add"
        addButton.setAttribute("productId", _item.ProductId);
        addButton.setAttribute("onclick", "method.AddBasket('" + _item.ProductId + "')")

        let countInput = document.createElement("input");
        countInput.textContent = "+"
        countInput.className = "count-input"
        countInput.value = "1"
        countInput.setAttribute("productId", _item.ProductId);

        left.appendChild(countInput)
        left.appendChild(addButton)

        return left;
    }
    //Ürün Adı ve Açıklamasını oluşturur
    CreateCenter(_item) {

        let center = document.createElement("div");
        center.className = "product-center";

        let name = document.createElement("div");
        name.className = "name";
        name.innerText = _item.DisplayName;

        let descriptipn = document.createElement("div")
        descriptipn.className = "description"
        descriptipn.innerText = _item.Description

        center.appendChild(name)
        center.appendChild(descriptipn)

        return center;
    }
    //Ürün Fiyatını oluşturur
    CreateRight(_item) {

        //Right Created
        let right = document.createElement("div");
        right.className = "product-right";

        let price = document.createElement("div");
        price.className = "price";
        price.innerText = _item.ListPrice

        right.appendChild(price)

        return right
    }

}