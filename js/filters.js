function PhotoShop() {

    this.getPreview = () => {
        return this._preview;
    }

    this.set = (preview) => {
        this._preview = preview;
        hist.set(preview);
    }

    this.negative = () => {
        preview = photo.getPreview();

        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255 - imgData.data[i];
            imgData.data[i + 1] = 255 - imgData.data[i + 1];
            imgData.data[i + 2] = 255 - imgData.data[i + 2];
        }
        ctx.putImageData(imgData, 0, 0);
    }

    this.logTransformation = (constant) => {
        if (!constant) {
            //with c=46, 46*ln(255+1) = 255
            constant = 46;
        }
        preview = photo.getPreview();

        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        for (let i = 0; i < imgData.data.length; i += 1) {
            imgData.data[i] = constant * (Math.log(imgData.data[i] + 1));
        }

        ctx.putImageData(imgData, 0, 0);
    }

    this.gamma = (constant, gamma) => {
        if (!constant) {
            constant = 1;
        }
        preview = photo.getPreview();

        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        for (let i = 0; i < imgData.data.length; i += 1) {
            imgData.data[i] = constant * (Math.pow(imgData.data[i] / 255, gamma)) * 255;
        }

        ctx.putImageData(imgData, 0, 0);

    }

    this.layer = (layer) => {
        layer = layer - 1
        layer = 7 - layer
        preview = photo.getPreview();

        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        for (let i = 0; i < imgData.data.length; i += 1) {
            let listBin = "";

            listBin = new StringBit(imgData.data[i].toString(2));
            listBin.bitSlicingLayer(layer)
            num = parseInt(listBin.value, 2);
            imgData.data[i] = num;

        }
        ctx.putImageData(imgData, 0, 0);
    }

    this.piecewise = (points) => {
        if (points) {
            if (points.length >= 10) {
                let a = parseInt(points.split(',')[0].split('(')[1], 10);
                let b = parseInt(points.split(',')[1].split(')')[0], 10);
                let c = parseInt(points.split(',')[2].split('(')[1], 10);
                let d = parseInt(points.split(',')[3].split(')')[0], 10);
                if (a >= 0 && a <= 255 && b >= 0 && b <= 255 && c >= 0 && c <= 255 && d >= 0 && d <= 255 && a <= c) {
                    preview = photo.getPreview();

                    ctx = canvas.getContext('2d');
                    ctx.drawImage(preview, 0, 0, preview.width, preview.height);
                    let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
                    for (let i = 0; i < imgData.data.length; i += 1) {
                        pixelIntensity = imgData.data[i];

                        intensity = 0;
                        if (pixelIntensity <= a) { // is on the first segment of the graph
                            m = (0 - b) / (0 - a);
                            intensity = m * pixelIntensity;
                        }
                        else if (pixelIntensity > a && pixelIntensity <= c) { // is on the second segment of the graph
                            m = (b - d) / (a - c);
                            intensity = (m * (pixelIntensity - a)) + b;
                        }
                        else { // is on the third segment of the graph
                            m = (d - 255) / (c - 255);
                            intensity = (m * (pixelIntensity - c)) + d;
                        }

                        imgData.data[i] = intensity;

                    }

                    ctx.putImageData(imgData, 0, 0);

                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}


let photo = new PhotoShop();