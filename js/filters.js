function PhotoShop() {

    this.getPreview = () => {
        return this._preview;
    };

    this.set = (preview) => {
        this._preview = preview;
        hist.set(preview);
    };

    this.getPreviewChroma = () => {
        return this._chroma;
    };

    this.setChroma = (chromaPreview) => {
        this._chroma = chromaPreview;
    };

    this.setHaar = (matrix) => {
        this.haar_matrix = matrix;
    }

    this.getHaar = () => {
        return this.haar_matrix;
    }

    this.distance = (a, b) => {
        let k = Math.pow((a[0] - b[0]), 2);
        let i = Math.pow((a[1] - b[1]), 2);
        let z = Math.pow((a[2] - b[2]), 2);
        return Math.sqrt(k + i + z);
    };

    this.convolution = (matrix) => {

        if (matrix) {

            if (matrix === "mediana") {
                this.mediana();

            } else if (matrix === "nitidezhighboost") {
                this.nitidezhighboost();

            } else {
                if (matrix === "identidade") {
                    var a = b = c = d = f = g = h = i = 0;
                    var e = 1;
                }

                if (matrix === "media") {
                    var a = b = c = d = e = f = g = h = i = 1 / 9;
                }

                if (matrix === "mediaponderada") {
                    var a = b = c = d = f = g = h = i = 1 / 10;
                    var e = 1 / 5;
                }

                if (matrix === "laplaciano") {
                    var a = c = g = i = 0;
                    var b = d = f = h = -1;
                    var e = 4;
                }

                if (matrix === "laplacianodiagonal") {
                    var a = b = c = d = f = g = h = i = -1;
                    var e = 8;
                }


                if (matrix === "topsobel") {
                    var a = c = -1;
                    var b = -2;
                    var d = e = f = 0;
                    var g = i = 1;
                    var h = 2;
                }

                if (matrix === "bottomsobel") {
                    var a = c = 1;
                    var b = 2;
                    var d = e = f = 0;
                    var g = i = -1;
                    var h = -2;
                }

                if (matrix === "leftsobel") {
                    var a = g = 1;
                    var b = e = h = 0;
                    var d = 2;
                    var c = i = -1;
                    var f = -2;
                }

                if (matrix === "rightsobel") {
                    var a = g = -1;
                    var b = e = h = 0;
                    var d = -2;
                    var c = i = 1;
                    var f = 2;
                }


                if (matrix.length >= 23) {

                    var a = parseInt(matrix.split(',')[0].split('(')[1], 10);//(a,b),(a,b)
                    var b = parseInt(matrix.split(',')[1].split(',')[0], 10);
                    var c = parseInt(matrix.split(',')[2].split(')')[0], 10);

                    var d = parseInt(matrix.split(',')[3].split('(')[1], 10);
                    var e = parseInt(matrix.split(',')[4].split(',')[0], 10);
                    var f = parseInt(matrix.split(',')[5].split(')')[0], 10);

                    var g = parseInt(matrix.split(',')[6].split('(')[1], 10);
                    var h = parseInt(matrix.split(',')[7].split(',')[0], 10);
                    var i = parseInt(matrix.split(',')[8].split(')')[0], 10);
                    console.log(a, b, c, d, e, f, g, h, i);

                }


                let setvalues = ["(" + a.toFixed(2), b.toFixed(2), c.toFixed(2) + ")",
                    "(" + d.toFixed(2), e.toFixed(2), f.toFixed(2) + ")",
                    "(" + g.toFixed(2), h.toFixed(2), i.toFixed(2) + ")"];
                document.getElementById('showvaluesofmatrix').innerText = setvalues;


                preview = photo.getPreview();
                ctx = canvas.getContext('2d');
                ctx.drawImage(preview, 0, 0, preview.width, preview.height);
                let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
                let imageWidth = preview.width;
                let imageHeight = preview.height;


                let original = new Array();

                for (var y = 0; y < imageHeight; y++) {
                    // loop through each column
                    for (var x = 0; x < imageWidth; x++) {
                        original[((imageWidth * y) + x) * 4] = imgData.data[((imageWidth * y) + x) * 4];
                        original[((imageWidth * y) + x) * 4 + 1] = imgData.data[((imageWidth * y) + x) * 4 + 1];
                        original[((imageWidth * y) + x) * 4 + 2] = imgData.data[((imageWidth * y) + x) * 4 + 2];
                        original[((imageWidth * y) + x) * 4 + 3] = imgData.data[((imageWidth * y) + x) * 4 + 3];

                    }
                }


                for (var y = 0; y < imageHeight; y++) {

                    // loop through each column
                    for (var x = 0; x < imageWidth; x++) {
                        //red
                        let aar = original[((imageWidth * (y - 1)) + (x - 1)) * 4] * a || 0;
                        let bbr = original[((imageWidth * (y - 1)) + x) * 4] * b || 0;
                        let ccr = original[((imageWidth * (y - 1)) + (x + 1)) * 4] * c || 0;
                        let ddr = original[((imageWidth * y) + (x - 1)) * 4] * d || 0;
                        let eer = original[((imageWidth * y) + x) * 4] * e || 0;
                        let ffr = original[((imageWidth * y) + (x + 1)) * 4] * f || 0;
                        let ggr = original[((imageWidth * (y + 1)) + (x - 1)) * 4] * g || 0;
                        let hhr = original[((imageWidth * (y + 1)) + x) * 4] * h || 0;
                        let iir = original[((imageWidth * (y + 1)) + (x + 1)) * 4] * i || 0;

                        //green
                        let aag = original[((imageWidth * (y - 1)) + (x - 1)) * 4 + 1] * a || 0;
                        let bbg = original[((imageWidth * (y - 1)) + x) * 4 + 1] * b || 0;
                        let ccg = original[((imageWidth * (y - 1)) + (x + 1)) * 4 + 1] * c || 0;
                        let ddg = original[((imageWidth * y) + (x - 1)) * 4 + 1] * d || 0;
                        let eeg = original[((imageWidth * y) + x) * 4 + 1] * e || 0;
                        let ffg = original[((imageWidth * y) + (x + 1)) * 4 + 1] * f || 0;
                        let ggg = original[((imageWidth * (y + 1)) + (x - 1)) * 4 + 1] * g || 0;
                        let hhg = original[((imageWidth * (y + 1)) + x) * 4 + 1] * h || 0;
                        let iig = original[((imageWidth * (y + 1)) + (x + 1)) * 4 + 1] * i || 0;

                        //blue
                        let aab = original[((imageWidth * (y - 1)) + (x - 1)) * 4 + 2] * a || 0;
                        let bbb = original[((imageWidth * (y - 1)) + x) * 4 + 2] * b || 0;
                        let ccb = original[((imageWidth * (y - 1)) + (x + 1)) * 4 + 2] * c || 0;
                        let ddb = original[((imageWidth * y) + (x - 1)) * 4 + 2] * d || 0;
                        let eeb = original[((imageWidth * y) + x) * 4 + 2] * e || 0;
                        let ffb = original[((imageWidth * y) + (x + 1)) * 4 + 2] * f || 0;
                        let ggb = original[((imageWidth * (y + 1)) + (x - 1)) * 4 + 2] * g || 0;
                        let hhb = original[((imageWidth * (y + 1)) + x) * 4 + 2] * h || 0;
                        let iib = original[((imageWidth * (y + 1)) + (x + 1)) * 4 + 2] * i || 0;


                        let somar = (aar + bbr + ccr + ddr + eer + ffr + ggr + hhr + iir);
                        let somag = (aag + bbg + ccg + ddg + eeg + ffg + ggg + hhg + iig);
                        let somab = (aab + bbb + ccb + ddb + eeb + ffb + ggb + hhb + iib);
                        if (somar < 0) {
                            somar = 0;
                        }
                        if (somag < 0) {
                            somag = 0;
                        }
                        if (somab < 0) {
                            somab = 0;
                        }

                        //red
                        imgData.data[((imageWidth * y) + x) * 4] = somar;
                        //green
                        imgData.data[((imageWidth * y) + x) * 4 + 1] = somag;
                        //blue
                        imgData.data[((imageWidth * y) + x) * 4 + 2] = somab;
                        //imgData.data[((imageWidth * y) + x)*4+3] =255;*/

                    }
                }

                ctx.putImageData(imgData, 0, 0);
            }
        }
    }

    this.nitidezhighboost = () => {
        document.getElementById('showvaluesofmatrix').innerText = "";

        var a = b = c = d = e = f = g = h = i = 1 / 9;

        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        let imageWidth = preview.width;
        let imageHeight = preview.height;


        let original = new Array();

        for (var y = 0; y < imageHeight; y++) {
            // loop through each column
            for (var x = 0; x < imageWidth; x++) {
                original[((imageWidth * y) + x) * 4] = imgData.data[((imageWidth * y) + x) * 4];
                original[((imageWidth * y) + x) * 4 + 1] = imgData.data[((imageWidth * y) + x) * 4 + 1];
                original[((imageWidth * y) + x) * 4 + 2] = imgData.data[((imageWidth * y) + x) * 4 + 2];
                original[((imageWidth * y) + x) * 4 + 3] = imgData.data[((imageWidth * y) + x) * 4 + 3];

            }
        }

        for (var y = 0; y < imageHeight; y++) {

            // loop through each column
            for (var x = 0; x < imageWidth; x++) {
                //red
                let aar = original[((imageWidth * (y - 1)) + (x - 1)) * 4] * a || 0;
                let bbr = original[((imageWidth * (y - 1)) + x) * 4] * b || 0;
                let ccr = original[((imageWidth * (y - 1)) + (x + 1)) * 4] * c || 0;
                let ddr = original[((imageWidth * y) + (x - 1)) * 4] * d || 0;
                let eer = original[((imageWidth * y) + x) * 4] * e || 0;
                let ffr = original[((imageWidth * y) + (x + 1)) * 4] * f || 0;
                let ggr = original[((imageWidth * (y + 1)) + (x - 1)) * 4] * g || 0;
                let hhr = original[((imageWidth * (y + 1)) + x) * 4] * h || 0;
                let iir = original[((imageWidth * (y + 1)) + (x + 1)) * 4] * i || 0;

                //green
                let aag = original[((imageWidth * (y - 1)) + (x - 1)) * 4 + 1] * a || 0;
                let bbg = original[((imageWidth * (y - 1)) + x) * 4 + 1] * b || 0;
                let ccg = original[((imageWidth * (y - 1)) + (x + 1)) * 4 + 1] * c || 0;
                let ddg = original[((imageWidth * y) + (x - 1)) * 4 + 1] * d || 0;
                let eeg = original[((imageWidth * y) + x) * 4 + 1] * e || 0;
                let ffg = original[((imageWidth * y) + (x + 1)) * 4 + 1] * f || 0;
                let ggg = original[((imageWidth * (y + 1)) + (x - 1)) * 4 + 1] * g || 0;
                let hhg = original[((imageWidth * (y + 1)) + x) * 4 + 1] * h || 0;
                let iig = original[((imageWidth * (y + 1)) + (x + 1)) * 4 + 1] * i || 0;

                //blue
                let aab = original[((imageWidth * (y - 1)) + (x - 1)) * 4 + 2] * a || 0;
                let bbb = original[((imageWidth * (y - 1)) + x) * 4 + 2] * b || 0;
                let ccb = original[((imageWidth * (y - 1)) + (x + 1)) * 4 + 2] * c || 0;
                let ddb = original[((imageWidth * y) + (x - 1)) * 4 + 2] * d || 0;
                let eeb = original[((imageWidth * y) + x) * 4 + 2] * e || 0;
                let ffb = original[((imageWidth * y) + (x + 1)) * 4 + 2] * f || 0;
                let ggb = original[((imageWidth * (y + 1)) + (x - 1)) * 4 + 2] * g || 0;
                let hhb = original[((imageWidth * (y + 1)) + x) * 4 + 2] * h || 0;
                let iib = original[((imageWidth * (y + 1)) + (x + 1)) * 4 + 2] * i || 0;

                let imgBorradar = (aar + bbr + ccr + ddr + eer + ffr + ggr + hhr + iir);
                let imgBorradag = (aag + bbg + ccg + ddg + eeg + ffg + ggg + hhg + iig);
                let imgBorradab = (aab + bbb + ccb + ddb + eeb + ffb + ggb + hhb + iib);
                if (imgBorradar < 0) {
                    somar = 0;
                }
                if (imgBorradag < 0) {
                    somag = 0;
                }
                if (imgBorradab < 0) {
                    somab = 0;
                }

                let mascarar = original[((imageWidth * y) + x) * 4] - imgBorradar;
                let mascarag = original[((imageWidth * y) + x) * 4 + 1] - imgBorradag;
                let mascarab = original[((imageWidth * y) + x) * 4 + 2] - imgBorradab;

                let k = 4;
                //red      
                imgData.data[((imageWidth * y) + x) * 4] = original[((imageWidth * y) + x) * 4] + k * mascarar;
                //green
                imgData.data[((imageWidth * y) + x) * 4 + 1] = original[((imageWidth * y) + x) * 4 + 1] + k * mascarag;
                //blue
                imgData.data[((imageWidth * y) + x) * 4 + 2] = original[((imageWidth * y) + x) * 4 + 2] + k * mascarab;
                //imgData.data[((imageWidth * y) + x)*4+3] =255;*/

            }
        }

        ctx.putImageData(imgData, 0, 0);

    }

    this.mediana = () => {
        document.getElementById('showvaluesofmatrix').innerText = "";

        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        let imageWidth = preview.width;
        let imageHeight = preview.height;


        let original = new Array();

        for (var y = 0; y < imageHeight; y++) {
            // loop through each column
            for (var x = 0; x < imageWidth; x++) {
                original[((imageWidth * y) + x) * 4] = imgData.data[((imageWidth * y) + x) * 4];
                original[((imageWidth * y) + x) * 4 + 1] = imgData.data[((imageWidth * y) + x) * 4 + 1];
                original[((imageWidth * y) + x) * 4 + 2] = imgData.data[((imageWidth * y) + x) * 4 + 2];
                original[((imageWidth * y) + x) * 4 + 3] = imgData.data[((imageWidth * y) + x) * 4 + 3];

            }
        }


        for (var y = 0; y < imageHeight; y++) {

            // loop through each column
            for (var x = 0; x < imageWidth; x++) {
                //red
                let aar = original[((imageWidth * (y - 1)) + (x - 1)) * 4] || 0;
                let bbr = original[((imageWidth * (y - 1)) + x) * 4] || 0;
                let ccr = original[((imageWidth * (y - 1)) + (x + 1)) * 4] || 0;
                let ddr = original[((imageWidth * y) + (x - 1)) * 4] || 0;
                let eer = original[((imageWidth * y) + x) * 4] || 0;
                let ffr = original[((imageWidth * y) + (x + 1)) * 4] || 0;
                let ggr = original[((imageWidth * (y + 1)) + (x - 1)) * 4] || 0;
                let hhr = original[((imageWidth * (y + 1)) + x) * 4] || 0;
                let iir = original[((imageWidth * (y + 1)) + (x + 1)) * 4] || 0;

                //green
                let aag = original[((imageWidth * (y - 1)) + (x - 1)) * 4 + 1] || 0;
                let bbg = original[((imageWidth * (y - 1)) + x) * 4 + 1] || 0;
                let ccg = original[((imageWidth * (y - 1)) + (x + 1)) * 4 + 1] || 0;
                let ddg = original[((imageWidth * y) + (x - 1)) * 4 + 1] || 0;
                let eeg = original[((imageWidth * y) + x) * 4 + 1] || 0;
                let ffg = original[((imageWidth * y) + (x + 1)) * 4 + 1] || 0;
                let ggg = original[((imageWidth * (y + 1)) + (x - 1)) * 4 + 1] || 0;
                let hhg = original[((imageWidth * (y + 1)) + x) * 4 + 1] || 0;
                let iig = original[((imageWidth * (y + 1)) + (x + 1)) * 4 + 1] || 0;

                //blue
                let aab = original[((imageWidth * (y - 1)) + (x - 1)) * 4 + 2] || 0;
                let bbb = original[((imageWidth * (y - 1)) + x) * 4 + 2] || 0;
                let ccb = original[((imageWidth * (y - 1)) + (x + 1)) * 4 + 2] || 0;
                let ddb = original[((imageWidth * y) + (x - 1)) * 4 + 2] || 0;
                let eeb = original[((imageWidth * y) + x) * 4 + 2] || 0;
                let ffb = original[((imageWidth * y) + (x + 1)) * 4 + 2] || 0;
                let ggb = original[((imageWidth * (y + 1)) + (x - 1)) * 4 + 2] || 0;
                let hhb = original[((imageWidth * (y + 1)) + x) * 4 + 2] || 0;
                let iib = original[((imageWidth * (y + 1)) + (x + 1)) * 4 + 2] || 0;


                let somar = math.median(aar, bbr, ccr, ddr, eer, ffr, ggr, hhr, iir);
                let somag = math.median(aag, bbg, ccg, ddg, eeg, ffg, ggg, hhg, iig);
                let somab = math.median(aab, bbb, ccb, ddb, eeb, ffb, ggb, hhb, iib);

                //red
                imgData.data[((imageWidth * y) + x) * 4] = somar;
                //green
                imgData.data[((imageWidth * y) + x) * 4 + 1] = somag;
                //blue
                imgData.data[((imageWidth * y) + x) * 4 + 2] = somab;
                //imgData.data[((imageWidth * y) + x)*4+3] =255;*/

            }

        }

        ctx.putImageData(imgData, 0, 0);
        console.log("mediana aplicada");
    }

    this.negative = () => {
        preview = photo.getPreview();

        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        console.log(imgData);
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
                let a = parseInt(points.split(',')[0].split('(')[1], 10);//(a,b),(a,b)
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

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    this.aritmeticMean = (xy) => {
        n = parseInt(xy.split(',')[0].split('(')[1])
        m = parseInt(xy.split(',')[1].split(')')[0])
        factor = 1 / (n * m)
        var matrix = [];
        for (var i = 0; i < n; i++) {
            matrix[i] = [];
            for (var j = 0; j < m; j++) {
                matrix[i][j] = 1;
            }
        }
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);


        var auxData = new Array(imgData.data.length);
        for (var i = 0; i < preview.height; i++) {
            for (var j = 0; j < preview.width; j++) {
                var intensity = 0;
                for (var x = 0; x < n; x++) {
                    for (var y = 0; y < m; y++) {
                        var relativePos = (((i + x) * preview.width) + (j + y)) * 4;
                        if (relativePos > 0 && relativePos < imgData.data.length) {
                            var average = parseInt((imgData.data[relativePos] + imgData.data[relativePos + 1] + imgData.data[relativePos + 2]) / 3);
                            intensity += average * matrix[x][y];
                        } else {
                            average = 175
                            intensity += average * matrix[x][y];
                        }
                    }
                }
                intensity = intensity * factor;
                var pos = ((i * preview.width) + j) * 4;
                auxData[pos] = intensity;
                auxData[pos + 1] = intensity;
                auxData[pos + 2] = intensity;
                auxData[pos + 3] = imgData.data[pos + 3];
            }
        }

        for (var i = 1; i < preview.height - 1; i++) {
            for (var j = 1; j < preview.width - 1; j++) {
                var pos = ((i * preview.width) + j) * 4;
                imgData.data[pos] = auxData[pos];
                imgData.data[pos + 1] = auxData[pos + 1];
                imgData.data[pos + 2] = auxData[pos + 2];
            }
        }
        console.log('Done with Art Mean');
        ctx.putImageData(imgData, 0, 0);

    };

    this.geometricMean = (xy) => {
        n = parseInt(xy.split(',')[0].split('(')[1])
        m = parseInt(xy.split(',')[1].split(')')[0])
        var matrix = [];
        for (var i = 0; i < n; i++) {
            matrix[i] = [];
            for (var j = 0; j < m; j++) {
                matrix[i][j] = 1;
            }
        }
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);


        var auxData = new Array(imgData.data.length);
        for (var i = 0; i < preview.height; i++) {
            for (var j = 0; j < preview.width; j++) {
                var intensity = 1;
                factor = 1 / (n * m);
                nn = n;
                nm = m;
                for (var x = 0; x < n; x++) {
                    for (var y = 0; y < m; y++) {
                        var relativePos = (((i + x) * preview.width) + (j + y)) * 4;
                        if (relativePos > 0 && relativePos < imgData.data.length) {
                            var average = parseInt((imgData.data[relativePos] + imgData.data[relativePos + 1] + imgData.data[relativePos + 2]) / 3);
                            intensity *= average * matrix[x][y];
                        } else {
                            average = 175
                            intensity *= average * matrix[x][y];
                        }

                    }
                }
                if (!isNaN(intensity) && intensity > 0 && isNumeric(intensity)) {
                    var pos = ((i * preview.width) + j) * 4;
                    intensity = Math.pow(intensity, factor);
                    auxData[pos] = intensity;
                    auxData[pos + 1] = intensity;
                    auxData[pos + 2] = intensity;
                    auxData[pos + 3] = imgData.data[pos + 3];
                }
            }
        }

        for (var i = 0; i < preview.height; i++) {
            for (var j = 0; j < preview.width; j++) {
                var pos = ((i * preview.width) + j) * 4;
                imgData.data[pos] = auxData[pos];
                imgData.data[pos + 1] = auxData[pos + 1];
                imgData.data[pos + 2] = auxData[pos + 2];
            }
        }
        console.log('Done with Geo Mean');
        ctx.putImageData(imgData, 0, 0);

    };

    this.harmonic = (xy) => {
        n = parseInt(xy.split(',')[0].split('(')[1])
        m = parseInt(xy.split(',')[1].split(')')[0])
        factor = (n * m)
        var matrix = [];
        for (var i = 0; i < n; i++) {
            matrix[i] = [];
            for (var j = 0; j < m; j++) {
                matrix[i][j] = 1;
            }
        }
        nn = Math.round(Math.sqrt(n));
        nm = Math.round(Math.sqrt(m));
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);


        var auxData = new Array(imgData.data.length);
        for (var i = 0; i < preview.height; i++) {
            for (var j = 0; j < preview.width; j++) {
                var intensity = 0;
                for (var x = 0; x < n; x++) {
                    for (var y = 0; y < m; y++) {
                        var relativePos = (((i + x) * preview.width) + (j + y)) * 4;
                        if (relativePos > 0 && relativePos < imgData.data.length) {
                            var average = parseInt((imgData.data[relativePos] + imgData.data[relativePos + 1] + imgData.data[relativePos + 2]) / 3);
                            intensity += 1 / (average * matrix[x][y]);
                        } else {
                            average = 175
                            intensity += 1 / (average * matrix[x][y]);
                        }
                    }
                }
                intensity = factor / intensity;
                var pos = ((i * preview.width) + j) * 4;
                auxData[pos] = intensity;
                auxData[pos + 1] = intensity;
                auxData[pos + 2] = intensity;
                auxData[pos + 3] = imgData.data[pos + 3];
            }
        }

        for (var i = 1; i < preview.height - 1; i++) {
            for (var j = 1; j < preview.width - 1; j++) {
                var pos = ((i * preview.width) + j) * 4;
                imgData.data[pos] = auxData[pos];
                imgData.data[pos + 1] = auxData[pos + 1];
                imgData.data[pos + 2] = auxData[pos + 2];
            }
        }
        console.log('Done with Harmonic');
        ctx.putImageData(imgData, 0, 0);

    };

    this.counterHarmonic = (xy, q) => {
        n = parseInt(xy.split(',')[0].split('(')[1])
        m = parseInt(xy.split(',')[1].split(')')[0])
        q = parseInt(q)
        var matrix = [];
        for (var i = 0; i < n; i++) {
            matrix[i] = [];
            for (var j = 0; j < m; j++) {
                matrix[i][j] = 1;
            }
        }
        nn = Math.round(Math.sqrt(n));
        nm = Math.round(Math.sqrt(m));
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);


        var auxData = new Array(imgData.data.length);
        for (var i = 0; i < preview.height; i++) {
            for (var j = 0; j < preview.width; j++) {
                var intensityTwo = 0;
                var intensityThree = 0;
                for (var x = 0; x < n; x++) {
                    for (var y = 0; y < m; y++) {
                        var relativePos = (((i + x) * preview.width) + (j + y)) * 4;
                        if (relativePos > 0 && relativePos < imgData.data.length) {
                            var average = parseInt((imgData.data[relativePos] + imgData.data[relativePos + 1] + imgData.data[relativePos + 2]) / 3);
                            elementQ = Math.pow(average, q);
                            intensityThree += elementQ;
                            intensityTwo += average * elementQ;
                        } else {
                            average = 175;
                            elementQ = Math.pow(average, q);
                            intensityThree += elementQ;
                            intensityTwo += average * elementQ;
                        }
                    }
                }
                intensityOne = (intensityTwo / intensityThree);
                var pos = ((i * preview.width) + j) * 4;
                auxData[pos] = intensityOne;
                auxData[pos + 1] = intensityOne;
                auxData[pos + 2] = intensityOne;
                auxData[pos + 3] = imgData.data[pos + 3];
            }
        }

        for (var i = 1; i < preview.height - 1; i++) {
            for (var j = 1; j < preview.width - 1; j++) {
                var pos = ((i * preview.width) + j) * 4;
                imgData.data[pos] = auxData[pos];
                imgData.data[pos + 1] = auxData[pos + 1];
                imgData.data[pos + 2] = auxData[pos + 2];
            }
        }
        console.log('Done with Counter Harmonic');
        ctx.putImageData(imgData, 0, 0);

    };

    this.restorationMedian = (xy) => {
        n = parseInt(xy.split(',')[0].split('(')[1])
        m = parseInt(xy.split(',')[1].split(')')[0])
        factor = 1 / (n * m)
        var matrix = [];
        for (var i = 0; i < n; i++) {
            matrix[i] = [];
            for (var j = 0; j < m; j++) {
                matrix[i][j] = 1;
            }
        }
        nn = Math.round(Math.sqrt(n));
        nm = Math.round(Math.sqrt(m));
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);


        var auxData = new Array(imgData.data.length);
        for (var i = 0; i < preview.height; i++) {
            for (var j = 0; j < preview.width; j++) {
                var intensity = 0;
                for (var x = 0; x < n; x++) {
                    for (var y = 0; y < m; y++) {
                        var relativePos = (((i + x) * preview.width) + (j + y)) * 4;
                        if (relativePos > 0 && relativePos < imgData.data.length) {
                            var average = parseInt((imgData.data[relativePos] + imgData.data[relativePos + 1] + imgData.data[relativePos + 2]) / 3);
                            intensity += average * matrix[x][y];
                        } else {
                            var average = 175;
                            intensity += average * matrix[x][y];
                        }
                    }
                }
                intensity = intensity / (n * m)
                var pos = ((i * preview.width) + j) * 4;
                auxData[pos] = intensity;
                auxData[pos + 1] = intensity;
                auxData[pos + 2] = intensity;
                auxData[pos + 3] = imgData.data[pos + 3];
            }
        }

        for (var i = 1; i < preview.height - 1; i++) {
            for (var j = 1; j < preview.width - 1; j++) {
                var pos = ((i * preview.width) + j) * 4;
                imgData.data[pos] = auxData[pos];
                imgData.data[pos + 1] = auxData[pos + 1];
                imgData.data[pos + 2] = auxData[pos + 2];
            }
        }
        console.log('Done with Median');
        ctx.putImageData(imgData, 0, 0);
    };

    this.restorationMax = (xy, callback) => {
        n = parseInt(xy.split(',')[0].split('(')[1])
        m = parseInt(xy.split(',')[1].split(')')[0])
        factor = 1 / (n * m)
        var matrix = [];
        for (var i = 0; i < n; i++) {
            matrix[i] = [];
            for (var j = 0; j < m; j++) {
                matrix[i][j] = 1;
            }
        }
        nn = Math.round(Math.sqrt(n));
        nm = Math.round(Math.sqrt(m));
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);


        var auxData = new Array(imgData.data.length);
        for (var i = 0; i < preview.height; i++) {
            for (var j = 0; j < preview.width; j++) {
                var intensity = 0;
                var arrayintensity = [];
                for (var x = 0; x < n; x++) {
                    for (var y = 0; y < m; y++) {
                        var relativePos = (((i + x) * preview.width) + (j + y)) * 4;
                        if (relativePos > 0 && relativePos < imgData.data.length) {
                            var average = parseInt((imgData.data[relativePos] + imgData.data[relativePos + 1] + imgData.data[relativePos + 2]) / 3);
                            arrayintensity.push(average * matrix[x][y]);
                        } else {
                            var average = 175;
                            arrayintensity.push(average * matrix[x][y]);

                        }
                    }
                }
                intensity = arrayintensity.max();
                var pos = ((i * preview.width) + j) * 4;
                auxData[pos] = intensity;
                auxData[pos + 1] = intensity;
                auxData[pos + 2] = intensity;
                auxData[pos + 3] = imgData.data[pos + 3];
            }
        }

        for (var i = 1; i < preview.height - 1; i++) {
            for (var j = 1; j < preview.width - 1; j++) {
                var pos = ((i * preview.width) + j) * 4;
                imgData.data[pos] = auxData[pos];
                imgData.data[pos + 1] = auxData[pos + 1];
                imgData.data[pos + 2] = auxData[pos + 2];
            }
        }
        console.log('Done with Max');
        ctx.putImageData(imgData, 0, 0);
        callback(imgData);
    };

    this.restorationMin = (xy, callback) => {
        n = parseInt(xy.split(',')[0].split('(')[1])
        m = parseInt(xy.split(',')[1].split(')')[0])
        factor = 1 / (n * m)
        var matrix = [];
        for (var i = 0; i < n; i++) {
            matrix[i] = [];
            for (var j = 0; j < m; j++) {
                matrix[i][j] = 1;
            }
        }
        nn = Math.round(Math.sqrt(n));
        nm = Math.round(Math.sqrt(m));
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);


        var auxData = new Array(imgData.data.length);
        for (var i = 0; i < preview.height; i++) {
            for (var j = 0; j < preview.width; j++) {
                var intensity = 0;
                var arrayintensity = [];
                for (var x = 0; x < n; x++) {
                    for (var y = 0; y < m; y++) {
                        var relativePos = (((i + x) * preview.width) + (j + y)) * 4;
                        if (relativePos > 0 && relativePos < imgData.data.length) {
                            var average = parseInt((imgData.data[relativePos] + imgData.data[relativePos + 1] + imgData.data[relativePos + 2]) / 3);
                            arrayintensity.push(average * matrix[x][y]);
                        } else {
                            var average = 175;
                            arrayintensity.push(average * matrix[x][y]);

                        }
                    }
                }
                intensity = arrayintensity.min();
                var pos = ((i * preview.width) + j) * 4;
                auxData[pos] = intensity;
                auxData[pos + 1] = intensity;
                auxData[pos + 2] = intensity;
                auxData[pos + 3] = imgData.data[pos + 3];
            }
        }

        for (var i = 1; i < preview.height - 1; i++) {
            for (var j = 1; j < preview.width - 1; j++) {
                var pos = ((i * preview.width) + j) * 4;
                imgData.data[pos] = auxData[pos];
                imgData.data[pos + 1] = auxData[pos + 1];
                imgData.data[pos + 2] = auxData[pos + 2];
            }
        }
        console.log('Done with Min');
        ctx.putImageData(imgData, 0, 0);
        callback(imgData);

    };

    this.midpoint = (xy) => {
        photo.restorationMin(xy, function (imgMin) {
            photo.restorationMax(xy, function (imgMax) {
                preview = photo.getPreview();
                ctx = canvas.getContext('2d');
                ctx.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
                var imgData = ctx.getImageData(0, 0, preview.width, preview.height);
                for (var i = 1; i < preview.height - 1; i++) {
                    for (var j = 1; j < preview.width - 1; j++) {
                        var pos = ((i * preview.width) + j) * 4;
                        imgData.data[pos] = (0.5) * (imgMin.data[pos] + imgMax.data[pos]);
                        imgData.data[pos + 1] = (0.5) * (imgMin.data[pos + 1] + imgMax.data[pos + 1]);
                        imgData.data[pos + 2] = (0.5) * (imgMin.data[pos + 2] + imgMax.data[pos + 2]);
                    }
                }
                console.log('Done with Mid Point');
                ctx.putImageData(imgData, 0, 0);
            });
        });
    };

    this.mapToZeroUm = (cor) => {
        let dec_cor = cor / 255;
        return dec_cor;
    }

    this.rgbToOthers = (rgb_values) => {
        if (rgb_values) {
            if (rgb_values.length >= 5) {
                //(10,10,10)
                var rr = parseInt(rgb_values.split(',')[0], 10)
                var gg = parseInt(rgb_values.split(',')[1].split(',')[0], 10);
                var bb = parseInt(rgb_values.split(',')[2], 10);

                let R = photo.mapToZeroUm(rr);
                let G = photo.mapToZeroUm(gg);
                let B = photo.mapToZeroUm(bb);

                let MAX = Math.max(R, G, B);
                let MIN = Math.min(R, G, B);
                console.log(MAX, MIN);

                if (MAX == R && G >= B) {
                    var H = 60 * (G - B) / (MAX - MIN) + 0 || 0;
                }

                else if (MAX == R && G < B) {
                    var H = 60 * (G - B) / (MAX - MIN) + 360 || 0;
                }

                else if (MAX == G) {
                    var H = 60 * (B - R) / (MAX - MIN) + 120 || 0;
                }

                else if (MAX == B) {
                    var H = 60 * (R - G) / (MAX - MIN) + 240 || 0;
                }

                if (MAX == 0) {
                    var S = 0
                } else {
                    var S = (MAX - MIN) / MAX
                }

                var V = MAX;

                var K = 1 - MAX || 0;
                var C = (1 - R - K) / (1 - K) || 0;
                var M = (1 - G - K) / (1 - K) || 0;
                var Y = (1 - B - K) / (1 - K) || 0;

                //let setvalues = ["(" +" H: " + H + " "," S: "+ S + " ", " V: " + V + ")"];
                document.getElementById("h_value").value = H;
                document.getElementById("s_value").value = (S * 100).toFixed(2);
                document.getElementById("v_value").value = (V * 100).toFixed(2);

                document.getElementById("c_value").value = (C * 100).toFixed(2);
                document.getElementById("m_value").value = (M * 100).toFixed(2);
                document.getElementById("y_value").value = (Y * 100).toFixed(2);
                document.getElementById("k_value").value = (K * 100).toFixed(2);
                //document.getElementById('showNEWvalues').innerText = setvalues;
                document.getElementById('btn-rgb').style.backgroundColor = "rgb(" + rr + "," + gg + "," + bb + ")";
                document.getElementById('btn-hsv').style.backgroundColor = "rgb(" + rr + "," + gg + "," + bb + ")";
                document.getElementById('btn-cmyk').style.backgroundColor = "rgb(" + rr + "," + gg + "," + bb + ")";

            }
        }

    }

    this.hsvToOthers = (H, S, V) => {
        if (H && S && V) {

            //var hh = H*Math.PI/180;
            var ss = S / 100;
            var vv = V / 100;

            var cc = vv * ss;
            var xx = cc * (1 - Math.abs((H / 60) % 2 - 1));
            var m = vv - cc;

            if (0 <= H && H < 60) {
                var Ri = cc;
                var Gi = xx;
                var Bi = 0;
            } else if (60 <= H && H < 120) {
                var Ri = xx;
                var Gi = cc;
                var Bi = 0;
            } else if (120 <= H && H < 180) {
                var Ri = 0;
                var Gi = cc;
                var Bi = xx;
            } else if (180 <= H && H < 240) {
                var Ri = 0;
                var Gi = xx;
                var Bi = cc;
            } else if (240 <= H && H < 300) {
                var Ri = 0;
                var Gi = xx;
                var Bi = cc;
            } else if (300 <= H && H <= 360) {
                var Ri = cc;
                var Gi = 0;
                var Bi = xx;
            }
            console.log(Ri, Gi, Bi);
            var R = Math.max(0, Math.min(1, Ri + m));
            var G = Math.max(0, Math.min(1, Gi + m));
            var B = Math.max(0, Math.min(1, Bi + m));
            console.log(R, G, B);
            var RR = Math.max(R * 255, 0);
            var GG = Math.max(G * 255, 0);
            var BB = Math.max(B * 255, 0);
            console.log(RR, GG, BB);

            let MAX = Math.max(R, G, B);
            let MIN = Math.min(R, G, B);

            var K = 1 - MAX;

            var C = (1 - R - K) / (1 - K) || 0;

            var M = (1 - G - K) / (1 - K) || 0;

            var Y = (1 - B - K) / (1 - K) || 0;


            document.getElementById("rgb_values").value = RR.toFixed(2)
                + "," + GG.toFixed(2)
                + "," + BB.toFixed(2);

            document.getElementById("c_value").value = (C * 100).toFixed(2);
            document.getElementById("m_value").value = (M * 100).toFixed(2);
            document.getElementById("y_value").value = (Y * 100).toFixed(2);
            document.getElementById("k_value").value = (K * 100).toFixed(2);

            document.getElementById('btn-rgb').style.backgroundColor = "rgb(" + RR + "," + GG + "," + BB + ")";
            document.getElementById('btn-hsv').style.backgroundColor = "rgb(" + RR + "," + GG + "," + BB + ")";
            document.getElementById('btn-cmyk').style.backgroundColor = "rgb(" + RR + "," + GG + "," + BB + ")";

        }

    }

    this.cmykToOthers = (C, M, Y, K) => {
        if (C && M && Y && K) {
            let rr = (1 - C / 100) * (1 - K / 100);
            let gg = (1 - M / 100) * (1 - K / 100);
            let bb = (1 - Y / 100) * (1 - K / 100);

            console.log(rr, gg, bb)

            let R = rr;
            let G = gg;
            let B = bb;

            let MAX = Math.max(R, G, B);
            let MIN = Math.min(R, G, B);


            if (MAX == R && G >= B) {
                var H = 60 * (G - B) / (MAX - MIN) + 0 || 0;
            }

            else if (MAX == R && G < B) {
                var H = 60 * (G - B) / (MAX - MIN) + 360 || 0;
            }

            else if (MAX == G) {
                var H = 60 * (B - R) / (MAX - MIN) + 120 || 0;
            }

            else if (MAX == B) {
                var H = 60 * (R - G) / (MAX - MIN) + 240 || 0;
            }

            if (MAX == 0) {
                var S = 0
            } else {
                var S = (MAX - MIN) / MAX
            }

            var V = MAX;
            let RR = R * 255;
            let GG = G * 255;
            let BB = B * 255;


            document.getElementById("h_value").value = H;
            document.getElementById("s_value").value = (S * 100).toFixed(2);
            document.getElementById("v_value").value = (V * 100).toFixed(2);

            document.getElementById("rgb_values").value = RR + "," + GG + "," + BB;
            //document.getElementById('showNEWvalues').innerText = setvalues;
            document.getElementById('btn-rgb').style.backgroundColor = "rgb(" + RR + "," + GG + "," + BB + ")";
            document.getElementById('btn-hsv').style.backgroundColor = "rgb(" + RR + "," + GG + "," + BB + ")";
            document.getElementById('btn-cmyk').style.backgroundColor = "rgb(" + RR + "," + GG + "," + BB + ")";
        }
    }

    this.sepia = () => {
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            let tr = 0.393 * (imgData.data[i]) + 0.769 * (imgData.data[i + 1]) + 0.189 * (imgData.data[i + 2])
            let tg = 0.349 * (imgData.data[i]) + 0.686 * (imgData.data[i + 1]) + 0.168 * (imgData.data[i + 2])
            let tb = 0.272 * (imgData.data[i]) + 0.534 * (imgData.data[i + 1]) + 0.131 * (imgData.data[i + 2])

            if (tr > 255) {
                r = 255
            }
            else {
                r = tr
            }
            if (tg > 255) {
                g = 255
            } else {
                g = tg
            }
            if (tb > 255) {
                b = 255
            } else {
                b = tb
            }
            imgData.data[i] = r;
            imgData.data[i + 1] = g;
            imgData.data[i + 2] = b;
        }
        ctx.putImageData(imgData, 0, 0);
    }

    this.brightness = (brightFactor) => {
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        for (var i = 0; i < imgData.data.length; i += 4) {
            var b = [brightFactor * imgData.data[i], brightFactor * imgData.data[i + 1], brightFactor * imgData.data[i + 2]];

            imgData.data[i] = b[0];
            imgData.data[i + 1] = b[1];
            imgData.data[i + 2] = b[2];

        }
        ctx.putImageData(imgData, 0, 0);
    }

    this.chromaKey = (color, tr, radius) => {
        if (tr == "") {
            tr = 1;
        }
        tr = parseFloat(tr);

        let c = [parseInt(color.split(',')[0].split('(')[1], 10),
            parseInt(color.split(',')[1].split(',')[0], 10),
            parseInt(color.split(',')[2].split(')')[0], 10)];

        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);


        photoBack = photo.getPreviewChroma();
        let canvasOriBack = document.getElementById("canvasOriBack");
        canvasOriBack.width = photoBack.width;
        canvasOriBack.height = photoBack.height;
        ctxOriBack = canvasOriBack.getContext('2d');
        ctxOriBack.drawImage(photo.getPreviewChroma(), 0, 0, canvasOriBack.width, canvasOriBack.height);
        let photoBackingData = ctxOriBack.getImageData(0, 0, preview.width, preview.height);


        for (let i = 0; i < imgData.data.length; i += 4) {
            let b = [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]];

            if (photo.distance(c, b) <= radius) {
                imgData.data[i] = photoBackingData.data[i];
                imgData.data[i + 1] = photoBackingData.data[i + 1];
                imgData.data[i + 2] = photoBackingData.data[i + 2];
            } else {
                imgData.data[i] = tr * imgData.data[i] + (1 - tr) * photoBackingData.data[i];
                imgData.data[i + 1] = tr * imgData.data[i + 1] + (1 - tr) * photoBackingData.data[i + 1];
                imgData.data[i + 2] = tr * imgData.data[i + 1] + (1 - tr) * photoBackingData.data[i + 2];
            }
        }
        ctx.putImageData(imgData, 0, 0);
    }

    this.previewFile = () => {
        let previewOriBack = document.getElementById('imgOriBack');
        image = document.getElementById('backphoto').files[0];
        let readerOriBack = new FileReader();

        readerOriBack.onloadend = function () {
            previewOriBack = document.createElement('img');
            previewOriBack.src = readerOriBack.result;
            previewOriBack.onload = function () {
                var canvasOriBack = document.getElementById("canvasOriBack");
                preview = photo.getPreview();
                previewOriBack.width = preview.width;
                previewOriBack.height = preview.height;
                canvasOriBack.width = previewOriBack.width;
                canvasOriBack.height = previewOriBack.height;
                ctx = canvasOriBack.getContext('2d');
                ctx.drawImage(previewOriBack, 0, 0, canvasOriBack.width, canvasOriBack.height);
                photo.setChroma(previewOriBack);
            }
        }

        if (image) {
            readerOriBack.readAsDataURL(image); //reads the data as a URL
        } else {
            previewOriBack.src = "";
        }
    }

    this.previewFileSub = () => {
        let previewOriBack = document.getElementById('imgOriBack');
        image = document.getElementById('subphoto').files[0];
        let readerOriBack = new FileReader();

        readerOriBack.onloadend = function () {
            previewOriBack = document.createElement('img');
            previewOriBack.src = readerOriBack.result;
            previewOriBack.onload = function () {
                var canvasOriBack = document.getElementById("canvasOriBack");
                preview = photo.getPreview();
                previewOriBack.width = preview.width;
                previewOriBack.height = preview.height;
                canvasOriBack.width = previewOriBack.width;
                canvasOriBack.height = previewOriBack.height;
                ctx = canvasOriBack.getContext('2d');
                ctx.drawImage(previewOriBack, 0, 0, canvasOriBack.width, canvasOriBack.height);
                photo.setChroma(previewOriBack);
            }
        }

        if (image) {
            readerOriBack.readAsDataURL(image); //reads the data as a URL
        } else {
            previewOriBack.src = "";
        }
    }

    this.subtractImages = () => {
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);


        photoBack = photo.getPreviewChroma();
        let canvasOriBack = document.getElementById("canvasOriBack");
        canvasOriBack.width = photoBack.width;
        canvasOriBack.height = photoBack.height;
        ctxOriBack = canvasOriBack.getContext('2d');
        ctxOriBack.drawImage(photo.getPreviewChroma(), 0, 0, canvasOriBack.width, canvasOriBack.height);
        let photoBackingData = ctxOriBack.getImageData(0, 0, preview.width, preview.height);

        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = imgData.data[i] - photoBackingData.data[i];
            imgData.data[i + 1] = imgData.data[i + 1] - photoBackingData.data[i + 1];
            imgData.data[i + 2] = imgData.data[i + 2] - photoBackingData.data[i + 2];
        }

        ctx.putImageData(imgData, 0, 0);
    }

    this.threshold = (threshold) => {
        threshold = parseFloat(threshold)

        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);

        for (let i = 0; i < imgData.data.length; i += 1) {
            if (imgData.data[i] >= threshold) {
                imgData.data[i] = 255
            }
            else {
                imgData.data[i] = 0
            }
        }

        ctx.putImageData(imgData, 0, 0);

        return imgData;
    }

    this.transformH = (vec) => {
        let result = [];
        for (var i = 0; i < vec.length / 2; i++) {
            result[i] = (vec[i * 2] + vec[(i * 2) + 1]) / 2;
            result[i + (vec.length / 2)] = vec[i * 2] - result[i];
        }
        return result;
    }

    this.transformBack = function (vec) {
        let result = [];
        for (var i = 0; i < vec.length / 2; i++) {
            result[i * 2] = vec[i] + vec[i + (vec.length / 2)];
            result[(i * 2) + 1] = vec[i] - vec[i + (vec.length / 2)];
        }
        return result;
    }

    this.haarLevelTrans = (haar_matrix, dim) => {
        let hM = haar_matrix.slice()

        for (let i = 0; i < dim; i++) {
            let lineR = photo.transformH(photo.getLineColor(hM, i, 0, dim))
            let lineG = photo.transformH(photo.getLineColor(hM, i, 1, dim))
            let lineB = photo.transformH(photo.getLineColor(hM, i, 2, dim))
            for (let j = 0; j < dim; j++) {
                hM[i][j][0] = lineR[j]
                hM[i][j][1] = lineG[j]
                hM[i][j][2] = lineB[j]
            }
        }

        for (let i = 0; i < dim; i++) {
            let colR = photo.transformH(photo.getColumnColor(hM, i, 0, dim))
            let colG = photo.transformH(photo.getColumnColor(hM, i, 1, dim))
            let colB = photo.transformH(photo.getColumnColor(hM, i, 2, dim))
            for (let j = 0; j < dim; j++) {
                hM[j][i][0] = colR[j]
                hM[j][i][1] = colG[j]
                hM[j][i][2] = colB[j]
            }
        }

        return hM
    }


    this.haarTrans = (level) => {
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);

        if (Math.pow(2, level) > preview.width) {
            console.log("Erro: muitos niveis")
        } else {
            let haar_matrix = photo.toMatrix(imgData.data, preview.height, preview.width)
            for (let i = 0; i < level; i++) {
                let dim = preview.height / Math.pow(2, i)
                let tr_matrix = photo.haarLevelTrans(haar_matrix, dim)
                for (let x = 0; x < dim; x++) {
                    for (let y = 0; y < dim; y++) {
                        for (let k = 0; k < 3; k++) {
                            haar_matrix[x][y][k] = tr_matrix[x][y][k]
                        }
                    }
                }
            }
            this.setHaar(haar_matrix);

            let A = photo.toArray(haar_matrix, preview.height, preview.width)
            for (let i = 0; i < A.length; i++) {
                imgData.data[i] = A[i]
            }
            ctx.putImageData(imgData, 0, 0);
        }
    }

    this.haarTransBack = (level, actual) => {
        actual = actual - 1
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);

        let haar_matrix = photo.toMatrix(imgData.data, preview.height, preview.width);

        for (let i = actual; i >= level; i--) {
            let dim = preview.height / Math.pow(2, i)
            let bk_matrix = photo.haarBackLevel(haar_matrix, dim)
            for (let x = 0; x < dim; x++) {
                for (let y = 0; y < dim; y++) {
                    for (let k = 0; k < 3; k++) {
                        haar_matrix[x][y][k] = bk_matrix[x][y][k]
                    }
                }
            }
        }

        let A = photo.toArray(haar_matrix, preview.height, preview.width)
        for (let i = 0; i < A.length; i++) {
            imgData.data[i] = A[i]
        }

        ctx.putImageData(imgData, 0, 0);
    }

    this.haarBackLevel = (haar_matrix, dim) => {
        let hM = haar_matrix.slice()

        for (let i = 0; i < dim; i++) {
            let colR = photo.transformBack(photo.getColumnColor(hM, i, 0, dim))
            let colG = photo.transformBack(photo.getColumnColor(hM, i, 1, dim))
            let colB = photo.transformBack(photo.getColumnColor(hM, i, 2, dim))
            for (let j = 0; j < dim; j++) {
                hM[j][i][0] = colR[j]
                hM[j][i][1] = colG[j]
                hM[j][i][2] = colB[j]
            }
        }

        for (let i = 0; i < dim; i++) {
            let lineR = photo.transformBack(photo.getLineColor(hM, i, 0, dim))
            let lineG = photo.transformBack(photo.getLineColor(hM, i, 1, dim))
            let lineB = photo.transformBack(photo.getLineColor(hM, i, 2, dim))
            for (let j = 0; j < dim; j++) {
                hM[i][j][0] = lineR[j]
                hM[i][j][1] = lineG[j]
                hM[i][j][2] = lineB[j]
            }
        }

        return hM;
    }

    this.toMatrix = (array, height, width) => {
        let haar_matrix = new Array(height)
        for (let i = 0; i < height; i++) {
            haar_matrix[i] = new Array(width)
            for (let j = 0; j < width; j++) {
                haar_matrix[i][j] = new Array(4)
                let pos = ((i * width) + j) * 4
                for (let k = 0; k < 4; k++) {
                    haar_matrix[i][j][k] = array[pos + k]
                }
            }
        }
        return haar_matrix
    }

    this.toArray = (haar_matrix, height, width) => {
        let A = new Array(height * width * 4)
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                let pos = ((i * width) + j) * 4
                for (let k = 0; k < 4; k++) {
                    A[pos + k] = haar_matrix[i][j][k]
                }
            }
        }
        return A
    }

    this.getLineColor = (haar_matrix, index, color, dim) => {
        let L = []
        for (var i = 0; i < dim; i++) {
            L[i] = haar_matrix[index][i][color]
        }
        return L
    }

    this.getColumnColor = (haar_matrix, index, color, dim) => {
        let C = []
        for (var i = 0; i < dim; i++) {
            C[i] = haar_matrix[i][index][color]
        }
        return C
    }

    this.calculateEnergy = (matrix) => {
        let quad = matrix.length / 2;

        let sumq1 = 0;
        let sumq2 = 0;
        let sumq3 = 0;
        let sumq4 = 0;
        let q1;
        let q2;
        let q3;
        let q4;

        for (var h = 0; h < quad; h++) {
            for (var w = 0; w < quad; w++) {
                for (let k = 0; k < 3; k++) {
                    q1[h][w][k] = matrix[h][w][k];
                    sumq1 += Math.abs(matrix[h][w][k] - 127)
                }
            }
        }

        for (var h = quad, i = 0; h < matrix.length; h++, i++) {
            for (var w = 0; w < quad; w++) {
                for (let k = 0; k < 3; k++) {
                    q2[i][w][k] = matrix[h][w][k];
                    sumq2 += Math.abs(matrix[h][w][k] - 127);
                }
            }
        }

        for (var h = 0; h < quad; h++) {
            for (var w = quad, j = 0; w < matrix.length; w++, j++) {
                for (let k = 0; k < 3; k++) {
                    q3[h][j][k] = matrix[h][w][k];
                    sumq3 += Math.abs(matrix[h][w][k] - 127);
                }
            }
        }

        for (var h = quad, i = 0; h < matrix.length; h++, i++) {
            for (var w = quad, j = 0; w < matrix.length; w++, j++) {
                for (let k = 0; k < 3; k++) {
                    q4[i][j][k] = matrix[h][w][k];
                    sumq4 += Math.abs(matrix[h][w][k] - 127);
                }
            }
        }

        return sumq1, q1, sumq2, q2, sumq3, q3, sumq4, q4;

    }

    this.haarEnergyDecompostition = () => {
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);

        let haar_matrix = photo.toMatrix(imgData.data, preview.height, preview.width)

        let tr_matrix = photo.haarLevelTrans(haar_matrix, preview.height)
        for (let x = 0; x < preview.height; x++) {
            for (let y = 0; y < preview.height; y++) {
                for (let k = 0; k < 3; k++) {
                    haar_matrix[x][y][k] = tr_matrix[x][y][k]
                }
            }
        }

        // Initial Haar matrix done, must check energy for each quadrant's energy (recursively)


    }

    this.fileHuffman = function () {
        file = document.getElementById("huffman").files[0];
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = function () {
            console.log('loading done');
            file = (reader.result);
            uint = new Uint8Array(file);
            var image = Huffman.parseUint8arrayToData(uint);

            preview = document.createElement('img');
            preview.width = image.width;
            preview.height = image.height;

            canvas.width = preview.width;
            canvas.height = preview.height;
            ctx = canvas.getContext('2d');
            ctx.drawImage(preview, canvas.width, 0, canvas.width, canvas.height);
            var imgData = ctx.getImageData(0, 0, preview.width, preview.height);

            var huffmanR = Huffman.Tree.decodeTree(JSON.parse(image.huffmanRTree));
            var huffmanG = Huffman.Tree.decodeTree(JSON.parse(image.huffmanGTree));
            var huffmanB = Huffman.Tree.decodeTree(JSON.parse(image.huffmanBTree));
            var huffmanRdecode = huffmanR.decode(image.huffmanREncode);
            var huffmanGdecode = huffmanG.decode(image.huffmanGEncode);
            var huffmanBdecode = huffmanB.decode(image.huffmanBEncode);


            for (var i = 0, j = 0; i < imgData.data.length; i += 4, j += 1) {
                imgData.data[i] = huffmanRdecode[j];
                imgData.data[i + 1] = huffmanGdecode[j];
                imgData.data[i + 2] = huffmanBdecode[j];
                imgData.data[i + 3] = 255;
            }
            console.log('decoding done');
            ctx.putImageData(imgData, 0, 0);
            preview = document.createElement('img');
            preview.src = canvas.toDataURL();
            photo.set(preview);
        }

    }
    this.huffman = function () {
        preview = this.getPreview();

        ctx = canvas.getContext('2d');
        //ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        var r = [];
        var g = [];
        var b = [];
        for (var i = 0, j = 0; i < imgData.data.length; i += 4, j += 1) {
            r[j] = (imgData.data[i]);
            g[j] = (imgData.data[i + 1]);
            b[j] = (imgData.data[i + 2]);
        }
        var huffmanR = Huffman.treeFromImage(r);
        var huffmanG = Huffman.treeFromImage(g);
        var huffmanB = Huffman.treeFromImage(b);
        var huffmanRencode = huffmanR.encode(r);
        var huffmanGencode = huffmanG.encode(g);
        var huffmanBencode = huffmanB.encode(b);
        var huffmanRTreeEncode = huffmanR.encodeTree();
        var huffmanGTreeEncode = huffmanG.encodeTree();
        var huffmanBTreeEncode = huffmanB.encodeTree();
        var file = Huffman.parseDataToUint8array(preview.width,
            preview.height,
            huffmanRTreeEncode,
            huffmanGTreeEncode,
            huffmanBTreeEncode,
            huffmanRencode,
            huffmanGencode,
            huffmanBencode);

        var data = new Blob([file]);
        var a2 = document.getElementById("a2");
        a2.href = URL.createObjectURL(data);

        ctx.putImageData(imgData, 0, 0);
    }

    this.lzw = function () {
        preview = this.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);

        var r = [];
        var g = [];
        var b = [];
        for (var i = 0, j = 0; i < imgData.data.length; i += 4, j += 1) {
            r[j] = (imgData.data[i]);
            g[j] = (imgData.data[i + 1]);
            b[j] = (imgData.data[i + 2]);
        }

        r_seq = this.lzw_encode(r)
        g_seq = this.lzw_encode(g)
        b_seq = this.lzw_encode(b)
        var string = "";
        for (i in r_seq) {
            string += String(i)
        }
        for (i in g_seq) {
            string += String(i)
        }
        for (i in b_seq) {
            string += String(i)
        }
        var uint = new Uint8Array(string.length);
        var index = 0;
        for (i in string) {
            uint[index] = i.charCodeAt(0);
            index++;
        }
        var file = uint;
        var data = new Blob([file]);
        var r4 = document.getElementById("r4");
        r4.href = URL.createObjectURL(data);
        console.log("Done")

        ctx.putImageData(imgData, 0, 0);
    }
    this.run_length = function () {
        preview = this.getPreview();
        ctx = canvas.getContext('2d');
        //ctx.drawImage(this.getPreview(), 0, 0,preview.width, preview.height );
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        var r = [];
        var g = [];
        var b = [];
        for (var i = 0, j = 0; i < imgData.data.length; i += 4, j += 1) {
            r[j] = (imgData.data[i]);
            g[j] = (imgData.data[i + 1]);
            b[j] = (imgData.data[i + 2]);
        }
        var run_lengthR = run.encode(r);
        var run_lengthG = run.encode(g);
        var run_lengthB = run.encode(b);
        var lengthR = String(run_lengthR.length);
        var lengthG = String(run_lengthG.length);
        var lengthB = String(run_lengthB.length);

        var uint = new Uint8Array(lengthR.length +
            lengthG.length +
            lengthB.length +
            (2 * run_lengthR.length) + (2 * run_lengthG.length) + (2 * run_lengthB.length));
        var indexuint = 0;
        uint[indexuint] = lengthR.length;//.charCodeAt(j);
        indexuint++;
        uint[indexuint] = lengthG.length;//.charCodeAt(j);
        indexuint++;
        uint[indexuint] = lengthB.length;//.charCodeAt(j);
        indexuint++;
        for (let j = 0; j < lengthR.length; j++) {
            uint[indexuint] = lengthR[j];//.charCodeAt(j);
            indexuint++;
        }
        for (let j = 0; j < lengthG.length; j++) {
            uint[indexuint] = lengthG[j];//.charCodeAt(j);
            indexuint++;
        }
        for (let j = 0; j < lengthB.length; j++) {
            uint[indexuint] = lengthB[j];//.charCodeAt(j);
            indexuint++;
        }

        for (let j = 0; j < run_lengthR.length; j++) {
            uint[indexuint] = run_lengthR[j][0];//.charCodeAt(j);
            indexuint++;
            uint[indexuint] = run_lengthR[j][1];//.charCodeAt(j);
            indexuint++;
        }
        for (let j = 0; j < run_lengthG.length; j++) {
            uint[indexuint] = run_lengthG[j][0];//.charCodeAt(j);
            indexuint++;
            uint[indexuint] = run_lengthG[j][1];//.charCodeAt(j);
            indexuint++;
        }
        for (let j = 0; j < run_lengthB.length; j++) {
            uint[indexuint] = run_lengthB[j][0];//.charCodeAt(j);
            indexuint++;
            uint[indexuint] = run_lengthB[j][1];//.charCodeAt(j);
            indexuint++;
        }

        uint[indexuint] = String(preview.width).length;//.charCodeAt(j);
        indexuint++;
        uint[indexuint] = String(preview.height).length;//.charCodeAt(j);
        indexuint++;
        for (let j = 0; j < String(preview.width).length; j++) {
            uint[indexuint] = String(preview.width)[j];//.charCodeAt(j);
            indexuint++;
        }
        for (let j = 0; j < String(preview.height).length; j++) {
            uint[indexuint] = String(preview.height)[j];//.charCodeAt(j);
            indexuint++;
        }
        var file = uint;

        var data = new Blob([file]);
        var r2 = document.getElementById("r2");
        r2.href = URL.createObjectURL(data);
        ctx.putImageData(imgData, 0, 0);
    }


    this.fileRun_Length = function () {
        file = document.getElementById("run_length").files[0]; //sames as here
        var reader = new FileReader();
        reader.readAsArrayBuffer(file); //reads the data as a txt
        reader.onloadend = function () {

            file = (reader.result);
            uint = new Uint8Array(file);
            var indexuint = 0;
            var lenR = uint[indexuint];
            indexuint++;
            var lenG = uint[indexuint];
            indexuint++;
            var lenB = uint[indexuint];
            var lengthR = "";
            var lengthG = "";
            var lengthB = "";
            for (let j = 0; j < parseInt(lenR); j++) {
                lengthR += uint[indexuint];
                indexuint++;
            }
            for (let j = 0; j < parseInt(lenG); j++) {
                lengthG += uint[indexuint];
                indexuint++;
            }
            for (let j = 0; j < parseInt(lenB); j++) {
                lengthB += uint[indexuint];
                indexuint++;
            }
            var r_encode = [];
            var g_encode = [];
            var b_encode = [];
            for (let j = 0; j < parseInt(lengthR); j++) {
                let value = [];
                value.push(uint[indexuint]);
                indexuint++;
                value.push(uint[indexuint]);
                indexuint++;
                r_encode.push(value);
            }
            for (let j = 0; j < parseInt(lengthG); j++) {
                let value = [];
                value.push(uint[indexuint]);
                indexuint++;
                value.push(uint[indexuint]);
                indexuint++;
                g_encode.push(value);
            }
            for (let j = 0; j < parseInt(lengthB); j++) {
                let value = [];
                value.push(uint[indexuint]);
                indexuint++;
                value.push(uint[indexuint]);
                indexuint++;
                b_encode.push(value);
            }

            var r = run.decode(r_encode);
            var g = run.decode(g_encode);
            var b = run.decode(b_encode);


            var image = {};
            var lenWidth = uint[indexuint];//.charCodeAt(j);
            indexuint++;
            var lenHeight = uint[indexuint];//.charCodeAt(j);
            indexuint++;
            var width = "";
            var height = "";
            for (let j = 0; j < parseInt(lenWidth); j++) {
                width += uint[indexuint]
                indexuint++;
            }
            for (let j = 0; j < parseInt(lenHeight); j++) {
                height += uint[indexuint]
                indexuint++;
            }
            image.width = parseInt(width)
            image.height = parseInt(height)


            preview = document.createElement('img');
            preview.width = image.width;
            preview.height = image.height;

            canvas.width = preview.width;
            canvas.height = preview.height;
            ctx = canvas.getContext('2d');
            ctx.drawImage(preview, canvas.width, 0, canvas.width, canvas.height);
            var imgData = ctx.getImageData(0, 0, preview.width, preview.height);


            for (var i = 0, j = 0; i < imgData.data.length; i += 4, j += 1) {
                imgData.data[i] = r[j];
                imgData.data[i + 1] = g[j];
                imgData.data[i + 2] = b[j];
                imgData.data[i + 3] = 255;
            }
            console.log('done');
            ctx.putImageData(imgData, 0, 0);
        }

    }

    this.lzw_encode = function (data) {
        //data é um vetor
        //usando imagens o dict deve ser iniciado com os valores 0 .. 255
        let dict = [];
        for (let i = 0; i < 256; i++) {
            stringfied = i.toString()
            if (stringfied.length == 1)
                stringfied = "00" + stringfied
            if (stringfied.length == 2)
                stringfied = "0" + stringfied
            dict[i] = stringfied
        }
        let word = ""
        let next_id = 256
        let seq = new Array()
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].toString();
        }

        // var objdict = Object.values(dict);
        for (let i = 0; i < data.length; i++) {
            let next_char = data[i]

            if (next_char.length == 1)
                next_char = "00" + next_char
            if (next_char.length == 2)
                next_char = "0" + next_char

            if (dict.indexOf(word + next_char) >= 0) {
                word += next_char
            } else {
                seq.push(dict.indexOf(word))
                dict[next_id++] = word + next_char
                word = next_char
            }
        }
        seq.push(dict.indexOf(word))
        console.log(seq.length)
        console.log('done');
        return seq
    }


    this.lzw_decode = function (data) {
        //let data = [3, 1, 4, 6, 5, 8, 3]
        let dict = {}
        for (let i = 0; i < 256; i++) {
            stringfied = i.toString()
            if (stringfied.length == 1)
                stringfied = "00" + stringfied
            if (stringfied.length == 2)
                stringfied = "0" + stringfied
            dict[i] = stringfied
        }

        let seq = new Array()
        let next_code = data[0]
        seq.push(dict[next_code])
        let code = ""
        let next_id = 256
        for (let i = 1; i < data.length; i++) {
            code = next_code
            next_code = data[i]

            if (dict[next_code]) {
                seq.push(dict[next_code])
                let word = dict[code]
                let next_char = (dict[next_code]).substring(0, 3)
                dict[next_id++] = word + next_char
            } else {
                let word = dict[code]
                let next_char = (dict[code]).substring(0, 3)
                seq.push(word + next_char)
                dict[next_id++] = word + next_char
            }
        }

        let sequencia = new Array()
        for (let i = 0; i < seq.length; i++) {
            for (let j = 0; j < seq[i].length; j += 3) {
                sequencia.push(parseInt(seq[i].substring(j, j + 3)))
            }
        }

        return sequencia
    }

    this.huffman_run_length = function () {
        preview = this.getPreview();
        ctx = canvas.getContext('2d');
        //ctx.drawImage(this.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);

        var r = [];
        var g = [];
        var b = [];
        for (var i = 0, j = 0; i < imgData.data.length; i += 4, j += 1) {
            r[j] = (imgData.data[i]);
            g[j] = (imgData.data[i + 1]);
            b[j] = (imgData.data[i + 2]);
        }

        r_run = run.encode(r);
        g_run = run.encode(g);
        b_run = run.encode(b);

        console.log(r.length)
        console.log(r_run.length)
        console.log(g.length)
        console.log(g_run.length)
        console.log(b.length)
        console.log(b_run.length)

        var huffmanR = Huffman.treeFromImage(r_run);
        var huffmanG = Huffman.treeFromImage(g_run);
        var huffmanB = Huffman.treeFromImage(b_run);
        var huffmanRencode = huffmanR.encode(r_run);
        var huffmanGencode = huffmanG.encode(g_run);
        var huffmanBencode = huffmanB.encode(b_run);
        var huffmanRTreeEncode = huffmanR.encodeTree();
        var huffmanGTreeEncode = huffmanG.encodeTree();
        var huffmanBTreeEncode = huffmanB.encodeTree();
        var file = Huffman.parseDataToUint8array(preview.width,
            preview.height,
            huffmanRTreeEncode,
            huffmanGTreeEncode,
            huffmanBTreeEncode,
            huffmanRencode,
            huffmanGencode,
            huffmanBencode);

        var data = new Blob([file]);
        var r3 = document.getElementById("r3");
        r3.href = URL.createObjectURL(data);
        console.log("Done")
        ctx.putImageData(imgData, 0, 0);
    }

    this.huffman_lzw = function () {
        preview = this.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);

        var r = [];
        var g = [];
        var b = [];
        for (var i = 0, j = 0; i < imgData.data.length; i += 4, j += 1) {
            r[j] = (imgData.data[i]);
            g[j] = (imgData.data[i + 1]);
            b[j] = (imgData.data[i + 2]);
        }

        r_seq = this.lzw_encode(r)
        g_seq = this.lzw_encode(g)
        b_seq = this.lzw_encode(b)


        var huffmanR = Huffman.treeFromImage(r_seq);
        var huffmanG = Huffman.treeFromImage(g_seq);
        var huffmanB = Huffman.treeFromImage(b_seq);
        var huffmanRencode = huffmanR.encode(r_seq);
        var huffmanGencode = huffmanG.encode(g_seq);
        var huffmanBencode = huffmanB.encode(b_seq);
        var huffmanRTreeEncode = huffmanR.encodeTree();
        var huffmanGTreeEncode = huffmanG.encodeTree();
        var huffmanBTreeEncode = huffmanB.encodeTree();

        var file = Huffman.parseDataToUint8array(preview.width,
            preview.height,
            huffmanRTreeEncode,
            huffmanGTreeEncode,
            huffmanBTreeEncode,
            huffmanRencode,
            huffmanGencode,
            huffmanBencode);


        var data = new Blob([file]);
        var a3 = document.getElementById("a3");
        a3.href = URL.createObjectURL(data);
        console.log("Done")

        ctx.putImageData(imgData, 0, 0);
    };

    this.fileHuffmanLzw = function () {
        file = document.getElementById("huffmanlzw").files[0]; //sames as here
        var reader = new FileReader();
        reader.readAsArrayBuffer(file); //reads the data as a txt
        reader.onloadend = function () {

            file = (reader.result);
            uint = new Uint8Array(file);
            var image = Huffman.parseUint8arrayToData(uint);


            preview = document.createElement('img');
            preview.width = image.width;
            preview.height = image.height;

            canvas.width = preview.width;
            canvas.height = preview.height;
            ctx = canvas.getContext('2d');
            ctx.drawImage(preview, canvas.width, 0, canvas.width, canvas.height);
            var imgData = ctx.getImageData(0, 0, preview.width, preview.height);

            var huffmanR = Huffman.Tree.decodeTree(JSON.parse(image.huffmanRTree));
            var huffmanG = Huffman.Tree.decodeTree(JSON.parse(image.huffmanGTree));
            var huffmanB = Huffman.Tree.decodeTree(JSON.parse(image.huffmanBTree));
            var huffmanRdecode = huffmanR.decode(image.huffmanREncode);
            var huffmanGdecode = huffmanG.decode(image.huffmanGEncode);
            var huffmanBdecode = huffmanB.decode(image.huffmanBEncode);

            var lzwRdecode = this.lzw_decode(huffmanRdecode)
            var lzwGdecode = this.lzw_decode(huffmanGdecode)
            var lzwBdecode = this.lzw_decode(huffmanBdecode)


            for (var i = 0, j = 0; i < imgData.data.length; i += 4, j += 1) {
                imgData.data[i] = lzwRdecode[j];
                imgData.data[i + 1] = lzwGdecode[j];
                imgData.data[i + 2] = lzwBdecode[j];
                imgData.data[i + 3] = 255;
            }
            console.log('done');
            ctx.putImageData(imgData, 0, 0);
        }
    };

    this.dilation = function (level, radius) {
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        if (level == "") {
            level = 1;
        }

        var auxData = new Array(imgData.data.length);
        for (var i = 0; i < imgData.data.length; i += 4) {
            auxData[i] = imgData.data[i];
            auxData[i + 1] = imgData.data[i + 1];
            auxData[i + 2] = imgData.data[i + 2];
        }
        console.log(level)
        for (let k = 0; k < level; k++) {
            for (var i = 0; i < imgData.data.length; i += 4) {
                imgData.data[i] = auxData[i];
                imgData.data[i + 1] = auxData[i + 1];
                imgData.data[i + 2] = auxData[i + 2];
            }
            for (var i = 1; i < preview.height - 1; i++) {
                for (var j = 1; j < preview.width - 1; j++) {
                    var r = 0, g = 0, b = 0, value = 0;
                    for (var x = 0; x < radius * 2; x++) {
                        for (var y = 0; y < radius * 2; y++) {
                            var relativePos = (((i + x - radius) * preview.width) + (j + y - radius)) * 4;
                            if (r < imgData.data[relativePos] && g < imgData.data[relativePos + 1] && b < imgData.data[relativePos + 2]) {
                                r = imgData.data[relativePos]
                                g = imgData.data[relativePos + 1]
                                b = imgData.data[relativePos + 2]
                                value++;
                            }
                            if (x == 1 && y == 1) {
                                var relativePosChoose = relativePos;
                            }

                        }
                    }
                    if (value > 0) {
                        auxData[relativePosChoose] = r;
                        auxData[relativePosChoose + 1] = g;
                        auxData[relativePosChoose + 2] = b;
                    }

                }
            }
        }
        for (var i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = auxData[i];
            imgData.data[i + 1] = auxData[i + 1];
            imgData.data[i + 2] = auxData[i + 2];
        }

        console.log("Done");
        ctx.putImageData(imgData, 0, 0);
        return imgData;
    };

    this.erosion = function (level, radius) {
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        if (level == "") {
            level = 1;
        }
        var auxData = new Array(imgData.data.length);
        for (var i = 0; i < imgData.data.length; i += 4) {
            auxData[i] = imgData.data[i];
            auxData[i + 1] = imgData.data[i + 1];
            auxData[i + 2] = imgData.data[i + 2];
        }
        console.log(level);
        for (let k = 0; k < level; k++) {
            for (var i = 0; i < imgData.data.length; i += 4) {
                imgData.data[i] = auxData[i];
                imgData.data[i + 1] = auxData[i + 1];
                imgData.data[i + 2] = auxData[i + 2];
            }
            for (var i = 1; i < preview.height - 1; i++) {
                for (var j = 1; j < preview.width - 1; j++) {
                    var r = 255, g = 255, b = 255, value = 0;
                    for (var x = 0; x < radius * 2; x++) {
                        for (var y = 0; y < radius * 2; y++) {
                            var relativePos = (((i + x - radius) * preview.width) + (j + y - radius)) * 4;
                            if (r > imgData.data[relativePos] && g > imgData.data[relativePos + 1] && b > imgData.data[relativePos + 2]) {
                                r = imgData.data[relativePos]
                                g = imgData.data[relativePos + 1]
                                b = imgData.data[relativePos + 2]
                                value++;
                            }
                            if (x == 1 && y == 1) {
                                var relativePosChoose = relativePos;

                            }
                        }
                    }
                    if (value > 0) {
                        auxData[relativePosChoose] = r;
                        auxData[relativePosChoose + 1] = g;
                        auxData[relativePosChoose + 2] = b;
                    }

                }
            }

        }
        for (var i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = auxData[i];
            imgData.data[i + 1] = auxData[i + 1];
            imgData.data[i + 2] = auxData[i + 2];
        }

        console.log("Done");
        ctx.putImageData(imgData, 0, 0);
        return imgData;
    };

    this.mgradient = function (gradient, radius) {
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        var imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        var dilation = photo.dilation(gradient, radius);
        var erosion = photo.erosion(gradient, radius);
        for (var i = 0; i < imgData.data.length; i++) {
            if (dilation.data[i] != erosion.data[i]) {
                imgData.data[i] = dilation.data[i] - erosion.data[i];
            }

        }
        ctx.putImageData(imgData, 0, 0);
    }

    this.derivative_mn2 = function (threshold) {
        photo.threshold(threshold);
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = photo.threshold(threshold);

        for (var i = 0; i < imgData.data.length; i++) {
            if (i === 0) {
                imgData.data[i] = imgData.data[i+1] - imgData.data[i]
            }
            if (i === imgData.data.length - 1) {
                imgData.data[i] = imgData.data[i] - imgData[i-1]
            }
            else {
                imgData.data[i] = (imgData.data[i+1] - imgData.data[i-1])/2
            }
        }

        ctx.putImageData(imgData, 0, 0);
    }

    this.derivativeColor_mn2 = function () {
        preview = photo.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);

        for (var i = 0; i < imgData.data.length; i += 4) {
            if (i === 0) {
                imgData.data[i] = imgData.data[i+4] - imgData.data[i]
                imgData.data[i+1] = imgData.data[i+5] - imgData.data[i]
                imgData.data[i+2] = imgData.data[i+6] - imgData.data[i]
            }
            if (i === imgData.data.length - 1) {
                imgData.data[i] = imgData.data[i] - imgData[i-4]
                imgData.data[i +1] = imgData.data[i] - imgData[i-5]
                imgData.data[i+2] = imgData.data[i] - imgData[i-6]
            }
            else {
                imgData.data[i] = (imgData.data[i+4] - imgData.data[i-4])/2
                imgData.data[i+1] = (imgData.data[i+5] - imgData.data[i-5])/2
                imgData.data[i+2] = (imgData.data[i+6] - imgData.data[i-6])/2
            }

        }

        ctx.putImageData(imgData, 0, 0);
    }
}

let photo = new PhotoShop();