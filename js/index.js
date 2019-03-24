
let categoryElement = document.getElementById("category-list");//Kategoriler buranın altında listelecek

var category =  new CategoryComponent(categoryElement);;
var basket = new BasketComponent();
var basketDialog = new Dialog({id:"basket-dialog"})


/**
 * @summary method : Önyüzden (Button Click,OnChange vs..) gibi etkileşime geçilecek kısım
 * 
 * @method OnLoad       - Sayfa Açıldığında çalışır
 * @method AddBasket    - Sepete Yeni Ürün Eklemeye yarar
 * @method UpdateBasket - Sepetteki Ürünün sayısıyla ilgili değişikliği yansıtır
 * @method DeleteBasket - Sepetteki Ürünü siler
 * @method ShowPopup    - Sepeti Popup'ını açar
 * @method ClosePopup   - Sepet Popup'ını kapatır
 * @method Search       - Arama Yapmak için kullanılır (Product DisplayName ve Descriptiona Göre Arar)
 */


var method = {
    OnLoad: () => {
        //Dosyadan verileri okur
        Helper.loadJSON("store/menuData.json", (response) => {
            let categories = response.d.ResultSet;
            Helper.LocalSet("categories", categories)
        })
    },
    AddBasket: (_productId) => {
        var countInput = document.querySelectorAll("input[productid='" + _productId + "']")[0];
        var selectedProduct = {
            productId: _productId,
            count: parseInt(countInput.value)
        }
        basket.Add(selectedProduct)
    },
    UpdateBasket: (_type, _productId) => {

        if (_type == "+")
            basket.Upper(_productId);
        else
            basket.Lower(_productId)


    },
    DeleteBasket: (_productId) => {
        basket.Delete(_productId)
    },
    Search: (item) => {
        category.Search(item.value)
    },
    ShowPopup: () => basketDialog.Show()
    ,
    ClosePopup: () => basketDialog.Close()
}


//Onload Methodu
method.OnLoad();



