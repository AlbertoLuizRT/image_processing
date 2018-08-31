function Histogram() {

    this.getPreview = () => {
        return this._preview;
    }

    this.set = (preview) => {
        this._preview = preview;
    }

    this.makeHistogram = (imgData, div) => {
        let g = [];
        for (let i = 0; i < imgData.data.length; i += 1) {
            g[i] = imgData.data[i];
        }
        let traceG = {
            x: g,
            type: "histogram",
            name: "gray scale",
            opacity: 0.5,
            marker: {
                color: 'gray scale',
            }
        }
        let data = [traceG];
        let layout = {barmode: "overlay",
        width: 500,
        height: 400};
        Plotly.newPlot(div, data, layout);
    }

    this.histogram = () => {
        let aa = document.getElementById("histogramDiv");
        
        preview = hist.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(hist.getPreview(), 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        hist.makeHistogram(imgData, "histogramDiv");


        if (aa.style.display !== 'none') {
            aa.style.display = 'none';
        }
        else {
            aa.style.display = 'block';
        }
    }

    this.calculateMin = (min, cdf) => {
        for (let i = 1; i < cdf.length; i++) {
            if (min === 0 && cdf[i] > 0)
                min = cdf[i];
            cdf[i] = cdf[i] + cdf[i - 1];
        }
        return min;
    }

    this.cumulativeDistribution = (imgData, cdf) => {
        for (let i = 0; i < imgData.data.length; i += 4) {
            average = parseInt((imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3);
            cdf[average] += 1;
        }
        return hist.calculateMin(cdf[0], cdf);
    }

    this.histogramGlobalEq = () => {
        let bb = document.getElementById("histEquaDiv");    

        preview = hist.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(hist.getPreview(), 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
        let cdf = new Array(255).fill(0);
        let min = hist.cumulativeDistribution(imgData, cdf);

        for (let i = 0; i < imgData.data.length; i += 4) {
            average = parseInt((imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3);
            let intensity = (cdf[average] - min) * 255 / ((imgData.data.length / 4) - 1);
            intensity = parseInt(intensity);
            imgData.data[i] = intensity;
            imgData.data[i + 1] = intensity;
            imgData.data[i + 2] = intensity;
        }
        ctx.putImageData(imgData, 0, 0);
        hist.makeHistogram(imgData, "histEquaDiv");

        if (bb.style.display !== 'none') {
            bb.style.display = 'none';
        }
        else {
            bb.style.display = 'block';
        }
    }

    this.localEqualization = (x, y, matrix) => {


        let auxMatrix = new Array(3);
        for (let i = 0; i < 3; i++) {
            auxMatrix[i] = new Array(3);
        }
        let count = new Map();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let intensity = 0;
                if (x + i - 1 > 0 && x + i - 1 < preview.height - 1 && y + j - 1 > 0 && y + j - 1 < preview.width - 1)
                    intensity = matrix[x + i - 1][y + j - 1];
                auxMatrix[i][j] = intensity;
                if (count.has(intensity))
                    count.set(intensity, count.get(intensity) + 1);
                else
                    count.set(intensity, 1);
            }
        }

        let keys = Array.from(count.keys());
        keys.sort();
        let mapDistrib = new Map();
        mapDistrib.set(keys[0], count.get(keys[0]));
        for (let i = 1; i < keys.length; i++) {
            mapDistrib.set(keys[i], count.get(keys[i]) + mapDistrib.get(keys[i - 1]));
        }

        let average = auxMatrix[1][1];
        let intensity = (mapDistrib.get(average) - count.get(keys[0])) * 255 / 9;
        matrix[x][y] = parseInt(intensity);
    }

    this.histogramLocalEq = function () {
        let cc = document.getElementById("histLocalEquaDiv"); 

        preview = hist.getPreview();
        ctx = canvas.getContext('2d');
        ctx.drawImage(hist.getPreview(), 0, 0, preview.width, preview.height);
        let imgData = ctx.getImageData(0, 0, preview.width, preview.height);

        let intensityMatrix = new Array(preview.height);
        for (let i = 0; i < intensityMatrix.length; i++) {
            intensityMatrix[i] = new Array(preview.width);
        }

        for (let x = 0; x < preview.height; x++) {
            for (let y = 0; y < preview.width; y++) {
                let pos = ((x * preview.width) + y) * 4;
                intensityMatrix[x][y] = parseInt((imgData.data[pos] + imgData.data[pos + 1] + imgData.data[pos + 2]) / 3);
            }
        }

        for (let x = 0; x < preview.height - 1; x++) {
            for (let y = 0; y < preview.width - 1; y++) {
                hist.localEqualization(x, y, intensityMatrix);
                let pos = ((x * preview.width) + y) * 4;
                imgData.data[pos] = intensityMatrix[x][y];
                imgData.data[pos + 1] = intensityMatrix[x][y];
                imgData.data[pos + 2] = intensityMatrix[x][y];
            }
        }
        ctx.putImageData(imgData, 0, 0);
        hist.makeHistogram(imgData, "histLocalEquaDiv");

        if (cc.style.display !== 'none') {
            cc.style.display = 'none';
        }
        else {
            cc.style.display = 'block';
        }
    }


}

let hist = new Histogram();