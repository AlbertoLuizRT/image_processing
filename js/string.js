function StringBit(string) {
    if (string.length < 8) {
        str = "";
        for (let i = string.length; i < 8; i++) {
            str = str + "0";
        }
        string = str + string;
    }
    this.value = string

    this.bitSlicingLayer = (index) => {
        if (this.value.charAt(index) === "1") {
            this.value = "11111111";
        } else {
            this.value = "00000000";
        }
    }
}