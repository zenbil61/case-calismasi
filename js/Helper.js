

//Yardımcı Class
class Helper {

    //dosya yolu verilen json'ı okur
    static loadJSON = (filepath, __callback) => {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', filepath, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                __callback(JSON.parse(xobj.responseText));
            }
        };
        xobj.send(null);
    };
    //localde saklamak istediğimiz verileri yazar
    static LocalSet = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }
    //localdeki verileri okur
    static LocalGet = (key) => {
        return JSON.parse(localStorage.getItem(key))
    }
}