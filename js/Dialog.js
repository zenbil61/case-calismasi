
/**
 * @param data.id - Dialog Oluşturulurken verilen id html kısmındaki dialog id'si
 */
class Dialog {

  constructor(data) {
    this.id = data.id
    this.element = document.getElementById(this.id);
  }

  Show = () => {
    this.element.style.display = "inline";
  }

  Close = () => {
    this.element.style.display = "none";
  }

}

