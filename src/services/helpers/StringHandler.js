class StringHandler {
  static validateInput(str) {
    if (typeof str !== "string")
      throw new Error("From hasAccent: input must be string");
  }

  static hasAccent(str) {
    this.validateInput(str);
    return /[áàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵíìỉĩị]/gi.test(
      str
    );
  }

  static removeAccents(str) {
    this.validateInput(str);

    let t = str;
    t = t.replace(/[áàảãạâấầẩẫậăắằẳẵặ]/g, "a");
    t = t.replace(/[ÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬ]/g, "A");

    t = t.replace(/[đ]/g, "d");
    t = t.replace(/[Đ]/g, "D");

    t = t.replace(/[éèẻẽẹêếềểễệ]/g, "e");
    t = t.replace(/[ÉÈẺẼẸÊẾỀỂỄỆ]/g, "E");

    t = t.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, "o");
    t = t.replace(/[ÓÒỎÕỌƠỚỜỞỠỢÔỐỒỔỖỘ]/g, "O");

    t = t.replace(/[úùủũụưứừửữự]/g, "u");
    t = t.replace(/[ÚÙỦŨỤƯỨỪỬỮỰ]/g, "U");

    t = t.replace(/[ýỳỷỹỵ]/g, "y");
    t = t.replace(/[ÝỲỶỸỴ]/g, "Y");

    t = t.replace(/[íìỉĩị]/g, "i");
    t = t.replace(/[ÍÌỈĨỊ]/g, "I");

    return t;
  }

  static removeDuplicatingSpaces(str) {
    this.validateInput(str);

    return str
      .split(" ")
      .filter((item) => item)
      .join(" ");
  }

  static capitalizeFirstWords(str) {
    this.validateInput(str);

    let t = this.removeDuplicatingSpaces(str);
    t = t
      .split(" ")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
    return t;
  }

  static getFileExtension(str) {
    this.validateInput(str);

    if (str.endsWith(".")) return "";
    if (str.lastIndexOf(".") === -1) return "";
    return str.slice(str.lastIndexOf("."));
  }

  static createEndpointUrl(str) {
    this.validateInput(str);

    let t = str;
    t = t.toLowerCase();
    t = this.removeDuplicatingSpaces(t);
    t = this.removeAccents(t);
    t = t.replace(/ /g, "-");
    return t;
  }
}

export default StringHandler;
