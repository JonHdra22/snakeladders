//lib.js:
export class ImageLib{
    
    constructor(canvas_id){
        this.canvas_handler = document.querySelector(`#${canvas_id}`);
        this.context = this.canvas_handler.getContext("2d");
        this.image_data = this.context.getImageData(0,0,this.canvas_handler.width, this.canvas_handler.height)
    }

    draw(){
        this.context.putImageData(this.image_data,0,0);
    }

    create_dot(x,y,color){
        const index  = (Math.round(x) + Math.round(y) * this.canvas_handler.width)*4;
        this.image_data.data[index]=color.r;
        this.image_data.data[index+1]=color.g;     
        this.image_data.data[index+2]=color.b;
        this.image_data.data[index+3]=255;
    }

    create_line(x0,y0,x1,y1,color){
        const dy = y1-y0;
        const dx = x1-x0;
        const m = (dy/dx);
        if(Math.abs(dx) >= Math.abs(dy)){
            if (x1>x0){// if garis dari kiri ke kanan
                for (let x=x0;x<=x1;x++){
                    let y = (y0+m*(x-x0))
                    this.create_dot(Math.round(x),Math.round(y),color);
                }
                    
            }else {// else garis dari kanan ke kiri
                for (let x=x0;x>=x1;x--){
                    let y = (y0+m*(x-x0))
                    this.create_dot(Math.round(x),Math.round(y),color);
                }
            }
        }else{   
            if(y1>y0){
                for (let y = y0; y <= y1; y++) {
                    let x = x0+(y-y0)/m; 
                    this.create_dot(Math.round(x),Math.round(y),color); 
                }
            }else{
                for (let y = y0; y >= y1; y--) {
                    let x = x0+(y-y0)/m; 
                    this.create_dot(Math.round(x),Math.round(y),color); 
                }
            }    
        }
    
    }

    create_circle(xc, yc, radius, color){
        // milih dari x , y
        // jalan dari xc-radius sampai dengan xc + radius
        // kita akan tentukan y nya
        // kita gambar di x,y

        for ( let x = xc-radius; x< xc+radius;x++){
            let y = yc + Math.sqrt( Math.pow(radius,2) - Math.pow((x-xc),2)); //akar dari r2 - (x-xc)2
            this.create_dot(x,y,color)

            let y1 = yc - Math.sqrt( Math.pow(radius,2) - Math.pow((x-xc),2)); //akar dari r2 - (x-xc)2
            this.create_dot(x,y1,color)
            console.log(this.create_circle,"gambar lingkaran")
        }

        for ( let x = xc-radius; x< xc+radius;x++){
            let y = yc + Math.sqrt( Math.pow(radius,2) - Math.pow((x-xc),2)); //akar dari r2 - (x-xc)2
            this.create_dot(y,x,color)

            let y1 = yc - Math.sqrt( Math.pow(radius,2) - Math.pow((x-xc),2)); //akar dari r2 - (x-xc)2
            this.create_dot(y1,x,color)
            console.log(this.create_circle,"gambar lingkaran")
        }
    }

    create_circle_polar(xc, yc, radius, color){
        for ( let theta = 0; theta< Math.PI*2; theta += 0.001 ){
            let x= xc + radius* Math.cos(theta);
            let y= yc + radius* Math.sin(theta);
            console.log(color)
            this.create_dot(x,y,color)
        }
    }
    
    create_circle_polar_warna(xc, yc, radius, color){
        for ( let theta = 0; theta< Math.PI*2; theta += 0.005 ){
            let x= xc + radius* Math.cos(theta);
            let y= yc + radius* Math.sin(theta);

            this.create_line(xc, yc,x,y,color)
        }
    }
    create_elips_polar(xc, yc, radiusX,radiusY, color){
        for ( let theta = 0; theta< Math.PI*2; theta += 0.01 ){
            let x= xc + radiusX* Math.cos(theta);
            let y= yc + radiusY* Math.sin(theta);

            this.create_dot(x,y,color)
        }
    }

    create_spiral(xc, yc, radius,iterJarak, color){
        for ( let theta = 0; theta< Math.PI*6; theta += 0.001 ){
            let r = radius+ (iterJarak*theta);
            let x= xc + r* Math.cos(theta);
            let y= yc + r* Math.sin(theta);

            this.create_dot(Math.ceil(x),Math.ceil(y),color);
        }
    }

    create_lingkaranKecil(xc,yc,radius,color){
        for ( let theta = -(Math.PI/2); theta< Math.PI*2-(Math.PI/2)-Math.PI/24; theta += 2*Math.PI/12 ){//menggunakan radian agar bisa 360/12 jadi dapat 2 titik
            let x= xc + radius* Math.cos(theta);
            let y= yc + radius* Math.sin(theta);
            this.create_dot(x,y,color);
            this.create_circle_polar(x, y, 12, {r:0, g:0, b:0})
  
        }
    }

    create_jam(jam){
        let xc = 250;
        let yc = 250;
        let radius = 150;
        let indexLingkaran=0;
        let color = {r:255, g:0, b:0};
        console.log("jam di function jam",jam);
        for ( let theta = -(Math.PI/2); theta< Math.PI*2-(Math.PI/2)-Math.PI/24; theta += 2*Math.PI/12 ){//menggunakan radian agar bisa 360/12 jadi dapat 2 titik
            let x= xc + radius* Math.cos(theta);
            let y= yc + radius* Math.sin(theta);
            this.create_dot(x,y,color);
           

            if(jam==indexLingkaran){
                this.create_circle_polar(x, y, 20, {r:255, g:0, b:0})
                indexLingkaran+=1;
                console.log("jam di function jamdcasdafs",jam);
            }
            else{
                this.create_circle_polar(x, y, 20, {r:0, g:0, b:0})
                indexLingkaran+=1;
                console.log("jam di function jam",jam);
            }
                
        }
    }

    create_menit(menit){
        let xc = 250;
        let yc = 250;
        let radius = 100;
        let indexLingkaran=0;
        let color = {r:0, g:0, b:0};
        console.log("menit di function menit",menit);
        for ( let theta = -(Math.PI/2); theta< Math.PI*2-(Math.PI/2)-Math.PI/24; theta += 2*Math.PI/12 ){//menggunakan radian agar bisa 360/12 jadi dapat 2 titik
            let x= xc + radius* Math.cos(theta);
            let y= yc + radius* Math.sin(theta);
            this.create_dot(x,y,color);
            

            if(menit==indexLingkaran){
                this.create_circle_polar(x, y,12, {r:0, g:255, b:0})
                indexLingkaran += 1;
            }
            else{
                this.create_circle_polar(x, y,12, {r:0, g:0, b:0})
                indexLingkaran += 1;
            }
            
        }
    }

    hapus(){
        let newImageData = this.context.createImageData(this.canvas_handler.width, this.canvas_handler.height);
        this.image_data = newImageData;
    }

    drawWaktu(jam,menit)
    {

        
        
        console.log("menit=",menit)

        this.create_jam(jam);
        this.create_menit(menit);
        
    }

    polyLine(titik,color){
        console.log("tes0")
    
        for (let i=0; i< titik.length -1 ;i++){
            this.create_line(titik[i].x,titik[i].y,titik[i+1].x,titik[i+1].y,color)
            console.log("polyline")
        }
    
    }
    
    polygon(titik,color){
        this.polyLine(titik,color)
        this.create_line(titik[titik.length-1].x,titik[titik.length-1].y,titik[0].x,titik[0].y,color)
        console.log("polygon")
        console.log(titik)
    }
    polygon_color(titik,color){
        this.polyLine(titik,color)
        this.create_line(titik[titik.length-1].x,titik[titik.length-1].y,titik[0].x,titik[0].y,color)
        let center=this.centroid(titik);
        var index_skrg=4*(center.x + center.y * this.canvas_handler.width);
        var r1 = this.image_data.data[index_skrg];
        var g1 = this.image_data.data[index_skrg+1];
        var b1 = this.image_data.data[index_skrg+2];
        this.floodFillStack(center.x,center.y,{r:r1,g:g1,b:b1},color)
        console.log("polygon")
        console.log(titik)
    }


    floodFillStack(x0,y0,toFLood,color){
        // cara kerja algoritma floodfill adalah sebagai berikut
        // kita pilih titik x,y
        // kita cek apakah kita akan warna lalu kita proses titik tetangganya


        
        var tumpukan = [];

        tumpukan.push({x:x0,y:y0});

        while(tumpukan.length>0){
            //saya ambil satu buah titik dari tumpukan 
            //saya cek titik tersebut bisa diwarna atau gak
            // kalo bisa warna lalu masukan dalam tumpukan titik sekitarnya
            var titik_skrg=tumpukan.pop();
            var index_skrg=4*(titik_skrg.x + titik_skrg.y * this.canvas_handler.width);

            var r1 = this.image_data.data[index_skrg];
            var g1 = this.image_data.data[index_skrg+1];
            var b1 = this.image_data.data[index_skrg+2];
        

            if((r1 == toFLood.r) && (g1 == toFLood.g) && (b1 == toFLood.b) &&
            !(toFLood.r == color.r && toFLood.g == color.g && toFLood.b == color.b))
            {

                // kalau warnanya ok buat diganti
                this.image_data.data[index_skrg]= color.r;
                this.image_data.data[index_skrg+1]=color.g;
                this.image_data.data[index_skrg+2]=color.b;
                this.image_data.data[index_skrg+3]=255;
                
                
                tumpukan.push({x:titik_skrg.x+1,y:titik_skrg.y })
                tumpukan.push({x:titik_skrg.x-1,y:titik_skrg.y })
                tumpukan.push({x:titik_skrg.x,y:titik_skrg.y+1 })
                tumpukan.push({x:titik_skrg.x,y:titik_skrg.y-1 })        
            }
        }
    }
    randomColor() {
        return {r:Math.floor(Math.random()*255),g:Math.floor(Math.random()*255),b:Math.floor(Math.random()*255)}; 
    }

    translate(point,Tx,Ty){
        return{
            x:point.x + Tx,
            y:point.y + Ty
        }
    }  

    penskalaan(point,Sx,Sy){
        return{
            x:point.x * Sx,
            y:point.y * Sy
        }
    }
    
    rotasi(point,sudut){
        return{
            x:point.x * Math.cos(sudut) - point.y*Math.sin(sudut),
            y:point.x * Math.sin(sudut) + point.y*Math.cos(sudut)
        }
    }

    rotasi_fp(point,titik_pusatX,titik_pusatY,sudut){
        let p1 = this.translate(point,-titik_pusatX,-titik_pusatY);
        console.log(titik_pusatX,titik_pusatY)
        let p2 = this.rotasi(p1,sudut);
        let p3 = this.translate(p2,titik_pusatX,titik_pusatY);

        return p3;

    }

    skala_fp(point,titik_putarX,titik_putarY,Sx,Sy){
        let p1 = this.translate(point,-titik_putarX,-titik_putarY);
        console.log(titik_putarX,titik_putarY)
        let p2 = this.penskalaan(p1,Sx,Sy);
        let p3 = this.translate(p2,titik_putarX,titik_putarY);

        return p3;

    }

    rotasi_array(point_array,titik_pusatX,titik_pusatY,sudut){
        for (let i=0;i<point_array.length;i++){
            point_array[i]=this.rotasi_fp(point_array[i],titik_pusatX,titik_pusatY,sudut)
        }

        return point_array;
 
    }

    skala_array(point_array,titik_pusatX,titik_pusatY,Sx,Sy){
        for (let i=0;i<point_array.length;i++){
            point_array[i]=this.skala_fp(point_array[i],titik_pusatX,titik_pusatY,Sx,Sy)
        }

        return point_array;
   
    }

    translate_array(point_array,Tx,Ty){
        for (let i=0;i<point_array.length;i++){
            point_array[i]=this.translate(point_array[i],Tx,Ty)
        }
        
        return point_array;
    }

    drawAnimation(point_array){
        let temp = [];
        point_array.forEach((point,index)=>{
            temp.push(this.translate(point,1,0));
        });
        point_array=temp;
        this.hapus();
    
        this.polygon(point_array,{r:0, g:0, b:0});
        this.draw();
    
        requestAnimationFrame(this.drawAnimation(point_array));
    }
    
    deleteCanvas(){
        this.context.clearRect(0,0,this.canvas_handler.width,this.canvas_handler.height);
        this.image_data= this.context.getImageData(0,0,this.canvas_handler.width,this.canvas_handler.height);
    }

    centroid(point_array){
        // agar saat kita press q dan e berulang kali dan titik koordinat tetap maka kita bisa menggunakan rumus centroid
        // pada case saya tidak terjadi perubahan scale pada polygon
        // titik pusat adalah rata2 dari koordinat x dan y semua titik https://kalkulator.id/kalkulator-centroid/
        let sumX=0;
        let sumY=0;
        for(let i=0; i<point_array.length;i++) {
            sumX+=point_array[i].x;
            sumY+=point_array[i].y;
        }
        return {
            x: sumX/point_array.length,
            y: sumY/point_array.length
        };
    }

    createPolygonDynamic(sides){
        let savepolygon=[];
        let xc = 250;
        let yc = 250;
        let radius = Math.sin();
        for ( let theta = -(Math.PI/2); theta< Math.PI*2-(Math.PI/2)-Math.PI/24; theta += 2*Math.PI/sides ){//menggunakan radian agar bisa 360/12 jadi dapat 2 titik
            let x= xc + radius* Math.cos(theta);
            let y= yc + radius* Math.sin(theta);
            savepolygon.push({
                x:x,
                y:y,
            })
        }
        this.polygon(savepolygon,{r:0,g:0,b:255})
    }
    
        
}
    

    

    


