function PhotoShop() {

    this.getPreview = () => {
        return this._preview;
    }

    this.set = (preview) => {
        this._preview = preview;
        hist.set(preview);
    }

    this.convolution = (matrix) =>{
        if (matrix) {
            if(matrix === "mediana"){
                this.mediana();
                
            }else{
            
                if(matrix === "media"){
                    var a = b = c = d = e = f = g=h=i = 1/9;
                    console.log(a,b,c,d,e,f,g,h,i);
                }

                if(matrix === "mediaponderada"){
                    var a = b = c = d = f = g=h=i = 1/10;
                    var e = 1/5;
                    console.log(a,b,c,d,e,f,g,h,i);
                }

                if(matrix === "laplacianodiagonal"){
                    var a = b = c = d = f = g=h=i = -1;
                    var e = 8;
                    console.log(a,b,c,d,e,f,g,h,i);
                }

                if(matrix === "laplaciano"){
                    var a = b = c = d = f = g=h=i = 1;
                    var e = -8;
                    console.log(a,b,c,d,e,f,g,h,i);
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
                    console.log(a,b,c,d,e,f,g,h,i);
                    
                    }
                    
                    preview = photo.getPreview();
                    ctx = canvas.getContext('2d');
                    ctx.drawImage(preview, 0, 0, preview.width, preview.height);
                    let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
                    let imageWidth = preview.width;
                    let imageHeight = preview.height;


                    let original = new Array();

                    for(var y = 0; y < imageHeight; y++) {
                      // loop through each column
                        for(var x = 0; x < imageWidth; x++) {
                            original[((imageWidth * y) + x)*4] = imgData.data[((imageWidth * y) + x)*4];
                            original[((imageWidth * y) + x)*4+1] = imgData.data[((imageWidth * y) + x)*4+1];
                            original[((imageWidth * y) + x)*4+2] = imgData.data[((imageWidth * y) + x)*4+2];
                            original[((imageWidth * y) + x)*4+3] = imgData.data[((imageWidth * y) + x)*4+3];

                        }
                    }
                    
     
                    for(var y = 0; y < imageHeight; y++) {
                        
                      // loop through each column
                        for(var x = 0; x < imageWidth; x++) {
                            //red
                            let aar = original[((imageWidth * (y-1)) + (x-1)) *4]*a|| 0;
                            let bbr = original[((imageWidth * (y-1)) +   x)   *4]*b|| 0;
                            let ccr = original[((imageWidth * (y-1)) + (x+1)) *4]*c|| 0;
                            let ddr = original[((imageWidth * y)     + (x-1)) *4]*d|| 0;
                            let eer = original[((imageWidth * y)     + x)     *4]*e|| 0;
                            let ffr = original[((imageWidth * y)     + (x+1)) *4]*f|| 0;
                            let ggr = original[((imageWidth * (y+1)) + (x-1)) *4]*g|| 0;
                            let hhr = original[((imageWidth * (y+1)) + x)     *4]*h|| 0;
                            let iir = original[((imageWidth * (y+1)) + (x+1)) *4]*i|| 0;

                            //green
                            let aag = original[((imageWidth * (y-1)) + (x-1)) *4+1]*a|| 0;
                            let bbg = original[((imageWidth * (y-1)) +   x)   *4+1]*b|| 0;
                            let ccg = original[((imageWidth * (y-1)) + (x+1)) *4+1]*c|| 0;
                            let ddg = original[((imageWidth * y)     + (x-1)) *4+1]*d|| 0;
                            let eeg = original[((imageWidth * y)     +   x)   *4+1]*e|| 0;
                            let ffg = original[((imageWidth * y)     + (x+1)) *4+1]*f|| 0;
                            let ggg = original[((imageWidth * (y+1)) + (x-1)) *4+1]*g|| 0;
                            let hhg = original[((imageWidth * (y+1)) +   x)   *4+1]*h|| 0;
                            let iig = original[((imageWidth * (y+1)) + (x+1)) *4+1]*i|| 0;

                            //blue
                            let aab = original[((imageWidth * (y-1)) + (x-1)) *4+2]*a|| 0;
                            let bbb = original[((imageWidth * (y-1)) +   x)   *4+2]*b|| 0;
                            let ccb = original[((imageWidth * (y-1)) + (x+1)) *4+2]*c|| 0;
                            let ddb = original[((imageWidth * y)     + (x-1)) *4+2]*d|| 0;
                            let eeb = original[((imageWidth * y)     +   x)   *4+2]*e|| 0;
                            let ffb = original[((imageWidth * y)     + (x+1)) *4+2]*f|| 0;
                            let ggb = original[((imageWidth * (y+1)) + (x-1)) *4+2]*g|| 0;
                            let hhb = original[((imageWidth * (y+1)) +   x)   *4+2]*h|| 0;
                            let iib = original[((imageWidth * (y+1)) + (x+1)) *4+2]*i|| 0;
                            


                            let somar = (aar+bbr+ccr+ddr+eer+ffr+ggr+hhr+iir);
                            let somag = (aag+bbg+ccg+ddg+eeg+ffg+ggg+hhg+iig);
                            let somab = (aab+bbb+ccb+ddb+eeb+ffb+ggb+hhb+iib);
                            if(somar < 0){somar = 0;}
                            if(somag < 0){somag = 0;}
                            if(somab < 0){somab = 0;}

                            //red
                            imgData.data[((imageWidth * y) + x)*4 ] =somar;    
                            //green
                            imgData.data[((imageWidth * y) + x)*4+1] =somag;
                            //blue
                            imgData.data[((imageWidth * y) + x)*4+2] =somab;
                            //imgData.data[((imageWidth * y) + x)*4+3] =255;*/

                        }
                    }

                ctx.putImageData(imgData, 0, 0);
            }    
        } 
    }

    this.mediana = () =>{
        preview = photo.getPreview();
                ctx = canvas.getContext('2d');
                ctx.drawImage(preview, 0, 0, preview.width, preview.height);
                let imgData = ctx.getImageData(0, 0, preview.width, preview.height);
                let imageWidth = preview.width;
                let imageHeight = preview.height;


                let original = new Array();

                for(var y = 0; y < imageHeight; y++) {
                  // loop through each column
                    for(var x = 0; x < imageWidth; x++) {
                        original[((imageWidth * y) + x)*4] = imgData.data[((imageWidth * y) + x)*4];
                        original[((imageWidth * y) + x)*4+1] = imgData.data[((imageWidth * y) + x)*4+1];
                        original[((imageWidth * y) + x)*4+2] = imgData.data[((imageWidth * y) + x)*4+2];
                        original[((imageWidth * y) + x)*4+3] = imgData.data[((imageWidth * y) + x)*4+3];

                    }   
                }
                
 
                for(var y = 0; y < imageHeight; y++) {
                    
                  // loop through each column
                    for(var x = 0; x < imageWidth; x++) {
                        //red
                        let aar = original[((imageWidth * (y-1)) + (x-1)) *4]|| 0;
                        let bbr = original[((imageWidth * (y-1)) +   x)   *4]|| 0;
                        let ccr = original[((imageWidth * (y-1)) + (x+1)) *4]|| 0;
                        let ddr = original[((imageWidth * y)     + (x-1)) *4]|| 0;
                        let eer = original[((imageWidth * y)     + x)     *4]|| 0;
                        let ffr = original[((imageWidth * y)     + (x+1)) *4]|| 0;
                        let ggr = original[((imageWidth * (y+1)) + (x-1)) *4]|| 0;
                        let hhr = original[((imageWidth * (y+1)) + x)     *4]|| 0;
                        let iir = original[((imageWidth * (y+1)) + (x+1)) *4]|| 0;

                        //green
                        let aag = original[((imageWidth * (y-1)) + (x-1)) *4+1]|| 0;
                        let bbg = original[((imageWidth * (y-1)) +   x)   *4+1]|| 0;
                        let ccg = original[((imageWidth * (y-1)) + (x+1)) *4+1]|| 0;
                        let ddg = original[((imageWidth * y)     + (x-1)) *4+1]|| 0;
                        let eeg = original[((imageWidth * y)     +   x)   *4+1]|| 0;
                        let ffg = original[((imageWidth * y)     + (x+1)) *4+1]|| 0;
                        let ggg = original[((imageWidth * (y+1)) + (x-1)) *4+1]|| 0;
                        let hhg = original[((imageWidth * (y+1)) +   x)   *4+1]|| 0;
                        let iig = original[((imageWidth * (y+1)) + (x+1)) *4+1]|| 0;

                        //blue
                        let aab = original[((imageWidth * (y-1)) + (x-1)) *4+2]|| 0;
                        let bbb = original[((imageWidth * (y-1)) +   x)   *4+2]|| 0;
                        let ccb = original[((imageWidth * (y-1)) + (x+1)) *4+2]|| 0;
                        let ddb = original[((imageWidth * y)     + (x-1)) *4+2]|| 0;
                        let eeb = original[((imageWidth * y)     +   x)   *4+2]|| 0;
                        let ffb = original[((imageWidth * y)     + (x+1)) *4+2]|| 0;
                        let ggb = original[((imageWidth * (y+1)) + (x-1)) *4+2]|| 0;
                        let hhb = original[((imageWidth * (y+1)) +   x)   *4+2]|| 0;
                        let iib = original[((imageWidth * (y+1)) + (x+1)) *4+2]|| 0;
                        

                        let somar = math.median(aar,bbr,ccr,ddr,eer,ffr,ggr,hhr,iir);
                        let somag = math.median(aag,bbg,ccg,ddg,eeg,ffg,ggg,hhg,iig);
                        let somab = math.median(aab,bbb,ccb,ddb,eeb,ffb,ggb,hhb,iib);
                        
                        //red
                        imgData.data[((imageWidth * y) + x)*4 ] =somar;    
                        //green
                        imgData.data[((imageWidth * y) + x)*4+1] =somag;
                        //blue
                        imgData.data[((imageWidth * y) + x)*4+2] =somab;
                        //imgData.data[((imageWidth * y) + x)*4+3] =255;*/

                    }

                }
                
                ctx.putImageData(imgData, 0, 0); 
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
}


let photo = new PhotoShop();