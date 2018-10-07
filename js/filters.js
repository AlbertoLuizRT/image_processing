function PhotoShop() {

    this.getPreview = () => {
        return this._preview;
    }

    this.set = (preview) => {
        this._preview = preview;
        hist.set(preview);
    }

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
        ctxt = canvas.getContext('2d');
        ctxt.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctxt.getImageData(0, 0, preview.width, preview.height);


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
        ctxt.putImageData(imgData, 0, 0);

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
        ctxt = canvas.getContext('2d');
        ctxt.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctxt.getImageData(0, 0, preview.width, preview.height);


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
        ctxt.putImageData(imgData, 0, 0);

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
        ctxt = canvas.getContext('2d');
        ctxt.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctxt.getImageData(0, 0, preview.width, preview.height);


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
        ctxt.putImageData(imgData, 0, 0);

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
        ctxt = canvas.getContext('2d');
        ctxt.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctxt.getImageData(0, 0, preview.width, preview.height);


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
        ctxt.putImageData(imgData, 0, 0);

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
        ctxt = canvas.getContext('2d');
        ctxt.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctxt.getImageData(0, 0, preview.width, preview.height);


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
        ctxt.putImageData(imgData, 0, 0);
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
        ctxt = canvas.getContext('2d');
        ctxt.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctxt.getImageData(0, 0, preview.width, preview.height);


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
        ctxt.putImageData(imgData, 0, 0);
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
        ctxt = canvas.getContext('2d');
        ctxt.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
        var imgData = ctxt.getImageData(0, 0, preview.width, preview.height);


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
        ctxt.putImageData(imgData, 0, 0);
        callback(imgData);

    };

    this.midpoint = (xy) => {
        photo.restorationMin(xy, function (imgMin) {
            photo.restorationMax(xy, function (imgMax) {
                preview = photo.getPreview();
                ctxt = canvas.getContext('2d');
                ctxt.drawImage(photo.getPreview(), 0, 0, preview.width, preview.height);
                var imgData = ctxt.getImageData(0, 0, preview.width, preview.height);
                for (var i = 1; i < preview.height - 1; i++) {
                    for (var j = 1; j < preview.width - 1; j++) {
                        var pos = ((i * preview.width) + j) * 4;
                        imgData.data[pos] = (0.5) * (imgMin.data[pos] + imgMax.data[pos]);
                        imgData.data[pos + 1] = (0.5) * (imgMin.data[pos + 1] + imgMax.data[pos + 1]);
                        imgData.data[pos + 2] = (0.5) * (imgMin.data[pos + 2] + imgMax.data[pos + 2]);
                    }
                }
                console.log('Done with Mid Point');
                ctxt.putImageData(imgData, 0, 0);
            });
        });
    };

    this.mapToZeroUm = (cor) => {
        let dec_cor = cor/256;
        return dec_cor;
    }

    this.hsv = (rgb_values) =>{
        if(rgb_values){
            if (rgb_values.length >= 5) {
             //(10,10,10)
                var rr = parseInt(rgb_values.split(',')[0], 10)
                var gg = parseInt(rgb_values.split(',')[1].split(',')[0], 10);
                var bb = parseInt(rgb_values.split(',')[2], 10);

                

                let R = photo.mapToZeroUm(rr);
                let G = photo.mapToZeroUm(gg);
                let B = photo.mapToZeroUm(bb);

                console.log(R, G, B);

                let MAX = Math.max(R,G,B);
                let MIN = Math.min(R,G,B);

                if(MAX == R && G >= B){
                    var H = 60 * (G - B)/(MAX - MIN) + 0 || 0;
                }

                else if(MAX == R && G < B){
                    var H = 60 * (G - B)/(MAX - MIN) + 360 || 0;
                }

                else if(MAX == G){
                    var H = 60 * (B - R)/(MAX - MIN) + 120 || 0;
                }

                else if(MAX == B){
                    var H = 60 * (R - G)/(MAX - MIN) + 240 || 0;
                }
                       
                var S = (MAX - MIN)/MAX;

                var V = MAX;

                let setvalues = ["(" +" H: " + H + " "," S: "+ S + " ", " V: " + V + ")"];
                document.getElementById('showNEWvalues').innerText = setvalues;
                document.getElementById('btn-hsv').style.backgroundColor = "rgb(" + rr + "," + gg + "," + bb + ")";
                console.log("HSV done");

            }
        }
    
    }

    this.cmyk = (rgb_values) =>{
        if(rgb_values){
            if (rgb_values.length >= 5) {
             //(10,10,10)
                var rr = parseInt(rgb_values.split(',')[0], 10)
                var gg = parseInt(rgb_values.split(',')[1].split(',')[0], 10);
                var bb = parseInt(rgb_values.split(',')[2], 10);

                

                let R = photo.mapToZeroUm(rr);
                let G = photo.mapToZeroUm(gg);
                let B = photo.mapToZeroUm(bb);

                console.log(R, G, B);

                let MAX = Math.max(R,G,B);
                let MIN = Math.min(R,G,B);

                var K = 1 - MAX;
                       
                var C = (1-R-K)/(1-K);

                var M = (1-G-K)/(1-K);

                var Y = (1-B-K)/(1-K);

                let setvalues = ["(" +" K: " + K + " "," C: "+ C + " ", " M: " + M, " Y: " + Y + ")"];
                document.getElementById('showNEWvalues').innerText = setvalues;

                document.getElementById('btn-cmyk').style.backgroundColor = "rgb(" + rr + "," + gg + "," + bb + ")";
                console.log("CMYK done");

            }
        }

    } 

}

let photo = new PhotoShop();