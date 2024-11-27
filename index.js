// 2272011 - Vico Rafelino
// 2272034 - Joni Hendrawan
// 2272045 - Jonathan Immanuel

import { ImageLib } from "./lib.js";
// import MatrixUtility from "./matrix.js";


let lib=new ImageLib("my_canvas");
// let m=MatrixUtility;
let papan=[];
let indexKotak=1;


function createPapan() {
    lib.floodFillStack(0, 0,{r:0,g:0,b:0},{r:255,g:255,b:255});
    let baris=6;
    let kolom=6;
    let ukurankotak=lib.canvas_handler.width/baris;

    for (let row=baris-1;row>=0;row--){//titik titik kotak
        for (let col=0;col<kolom; col++) {
            let x=col*ukurankotak;
            let y=row*ukurankotak;
            let kotak=[
                {x:Math.floor(x),y:Math.floor(y)},
                {x:Math.floor(x+ukurankotak),y:Math.floor(y)},
                {x:Math.floor(x+ukurankotak),y:Math.floor(y+ukurankotak)},
                {x:Math.floor(x),y:Math.floor(y+ukurankotak)}
            ];
            //buat kotak
            lib.polygon(kotak,{r:0,g:0,b:0});
            //hitung titik pusat setiap kotak
            let center=lib.centroid(kotak);
            let fillColor;
            //jika jumlah baris + kolom genap, maka biru tua
            if ((row+col)%2==0){//https://youtu.be/KuAsKRn9XD0?si=zVLAmIqyii-g6fMr
                fillColor={r:0,g:0,b:255};//biru tua
            }else{
                fillColor={r:135,g:206,b:235};//biru muda
            }
            lib.floodFillStack(center.x,center.y,{r:255,g:255,b:255},fillColor);
            papan.push({
                indexKotak:indexKotak,
                kotak:kotak,
                centerX:center.x,
                centerY:center.y,
                color:fillColor,
                row:row,
                col:col
            });
            indexKotak++;
            console.log(indexKotak)
        }
    }
    // lib.draw();
    
}


function createNomorPapan(){
    lib.context.font = "20px 'Exo'"; 
    lib.context.textAlign = "center";

    for (let i=0; i<papan.length;i++){
        if (i==0) {
            lib.context.fillText("Start",papan[i].centerX,papan[i].centerY);
        } else if (i==papan.length-1) {
            lib.context.fillText("Finish",papan[i].centerX,papan[i].centerY);
        } else {
            lib.context.fillText(papan[i].indexKotak.toString(), papan[i].centerX, papan[i].centerY);
        }
    }
}


let allKotakTeleport=[];
function createKotakTeleport(){
    let banyakKotakTeleport=5;
    
    for (let i=0; i<banyakKotakTeleport; i++){
        let kotakTeleportAwal;
        let kotakTeleportTujuan;
        let cekKotakTeleport=false;
        
        while(cekKotakTeleport==false){
            kotakTeleportAwal=Math.floor(Math.random() * 35);
            kotakTeleportTujuan=Math.floor(Math.random() * 35);
            //cek kotak awal harus lebih kecil dari tujuan
            if(kotakTeleportAwal > kotakTeleportTujuan ) {
                //tukanr nilai
                let temp=kotakTeleportAwal;
                kotakTeleportAwal=kotakTeleportTujuan;
                kotakTeleportTujuan=temp;
            }
            let kotakTerpakai=false;
            for(let j=0;j<allKotakTeleport.length;j++){   
                if((allKotakTeleport[j].indexTeleportAwal==kotakTeleportAwal || allKotakTeleport[j].indexTeleportAwal==kotakTeleportTujuan || allKotakTeleport[j].indexTeleportTujuan==kotakTeleportAwal || allKotakTeleport[j].indexTeleportTujuan==kotakTeleportTujuan)){
                    kotakTerpakai=true;
                    break;
                }    
            }
            
            if(kotakTerpakai==false && kotakTeleportAwal!=kotakTeleportTujuan){
                //buqt kotak teleport awal
                let titikTeleportAwal=[
                    {x:papan[kotakTeleportAwal].kotak[0].x,y:papan[kotakTeleportAwal].kotak[0].y},
                    {x:papan[kotakTeleportAwal].kotak[1].x,y:papan[kotakTeleportAwal].kotak[1].y},
                    {x:papan[kotakTeleportAwal].kotak[2].x,y:papan[kotakTeleportAwal].kotak[2].y},
                    {x:papan[kotakTeleportAwal].kotak[3].x,y:papan[kotakTeleportAwal].kotak[3].y}
                ];
                
                //buat kotak teleport tujuan
                let titikTeleportTujuan=[
                    {x:papan[kotakTeleportTujuan].kotak[0].x,y:papan[kotakTeleportTujuan].kotak[0].y},
                    {x:papan[kotakTeleportTujuan].kotak[1].x,y:papan[kotakTeleportTujuan].kotak[1].y},
                    {x:papan[kotakTeleportTujuan].kotak[2].x,y:papan[kotakTeleportTujuan].kotak[2].y},
                    {x:papan[kotakTeleportTujuan].kotak[3].x,y:papan[kotakTeleportTujuan].kotak[3].y}
                ];
                let centerAwal=lib.centroid(titikTeleportAwal)
                // let centerTujuan=lib.centroid(titikTeleportTujuan)
                //gambar kotaknya
                lib.polygon_color(titikTeleportAwal,{r:255,g:255,b:0});//kuning untuk awal
                lib.polygon_color(titikTeleportTujuan,{r:255,g:0,b:0});//merah untuk tujuan
                
                allKotakTeleport.push({
                    indexTeleportAwal:kotakTeleportAwal,
                    indexTeleportTujuan:kotakTeleportTujuan,
                    kumpulanTitikTeleportAwal:titikTeleportAwal,
                    kumpulanTitikTeleportTujuan:titikTeleportTujuan,
                    centerXawal:centerAwal.x,
                    centerYawal:centerAwal.y
                });
                
                cekKotakTeleport = true;//kotak sudah terbuat maka lanjut iterasi for selanjutnya
            }
        }
    }
    return allKotakTeleport;
}


let indexPlayer=0;
// let indexPlayer=36;
let savePolygon;
function player(){
    let radius=30;
    let color ={r:100,g:100,b:100}; 
    let xc = papan[indexPlayer].centerX;
    let yc = papan[indexPlayer].centerY;
    // let sides=3+Math.floor(Math.random()*8)
    let sides = 8;
    savePolygon=[]; 
    for (let theta = -(Math.PI/2); theta<Math.PI*2-(Math.PI/2); theta+=2*Math.PI/sides) {
        let x = xc + radius * Math.cos(theta);
        let y = yc + radius * Math.sin(theta);
        savePolygon.push({
            x:x, 
            y:y 
        });
    }
    lib.polygon_color(savePolygon,color)
}   


function movePlayer() {
    let num1,num2;
    function generateRandomMath() {
        let cek=false;
        while (!cek) {
            num1=Math.floor(Math.random()*6);
            num2=Math.floor(Math.random()*6);
            if (num1+num2<=6 && (num1+num2)!=0) {
                document.getElementById('num1').value=num1;
                document.getElementById('num2').value=num2;
                cek = !cek;
            }
        }
    }
    document.getElementById("generate-button").addEventListener("click", generateRandomMath);

    function drag(event){//sumber https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop
        event.dataTransfer.setData("text", event.target.id);
    }
    function allowDrop(event){//sumber https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop
        event.preventDefault();
    }

    let draggedNumber;
    function drop(event){//sumber https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop
        event.preventDefault();
        let draggedBoxId = event.dataTransfer.getData("text");
        draggedNumber = parseInt(document.getElementById(draggedBoxId).innerText);

        document.getElementById("answer-box").innerText=draggedNumber;
        let colorDelete;
        //menghapus polygon sebelumnya
        let playerInTeleport=false;

        for (let i=0;i<allKotakTeleport.length; i++) {
            if (allKotakTeleport[i].indexTeleportAwal==indexPlayer) {
                colorDelete={r:255,g:255,b:0}
                playerInTeleport = true;
                break; // break loop jika sudah ditemukan
            }else if(allKotakTeleport[i].indexTeleportTujuan == indexPlayer){
                colorDelete={r:255,g:0,b:0}
                playerInTeleport = true;
                break; 
            }
        }
        
        //jika jumlah baris + kolom genap, maka biru tua
        if (!playerInTeleport) {
            if ((papan[indexPlayer].row + papan[indexPlayer].col) % 2 == 0) {
                colorDelete = {r:0,g:0,b:255}; // Biru tua
            } else {
                colorDelete = {r:135,g:206,b:235}; // Biru muda
            }
        }
        lib.polygon_color(papan[indexPlayer].kotak,colorDelete)
        
        if (draggedNumber==num1+num2) {
            alert("Anda maju "+draggedNumber+" langkah");
            indexPlayer+=draggedNumber;
            // Batasi indexPlayer agar tidak melebihi panjang papan
            if (indexPlayer>=papan.length) {
                indexPlayer=papan.length-1;
            }
            for (let i = 0; i < allKotakTeleport.length; i++) {
                if (allKotakTeleport[i].indexTeleportTujuan==indexPlayer) {
                    alert("Anda menginjak kotak teleport pada kotak nomor "+(allKotakTeleport[i].indexTeleportTujuan+1) +" Kembali ke awal teleport.");
                    indexPlayer=allKotakTeleport[i].indexTeleportAwal;
                    break; //berhenti loop setelah menemukan kotak teleport
                }
            }
            if (indexPlayer==papan.length-1) {
                Swal.fire({ // Sumber : https://sweetalert2.github.io/#examples
                    title: "Selamat, anda menang",
                    text:'Pencet tombol "Start Game" untuk bermain kembali',
                });
            }
            player();
            lib.draw(); 
            createNomorPapan();
        }
    }

    document.getElementById("answer-box").addEventListener("drop", drop);
    document.getElementById("answer-box").addEventListener("dragover", allowDrop);

    const numberBoxes = document.querySelectorAll(".drop-box");// sumber chatgpt "Kenapa drop dan dragnya tidak jalan"
    numberBoxes.forEach(box => {
        box.setAttribute("draggable", "true");
        box.addEventListener("dragstart", drag);
    });
}



let textAnimationId; 

const texts=[
    {text:"Welcome",x:250, y:250,dx:2,dy:2,width:140,height:50,colr:"red"},
    {text:"Ular",x:300, y:200,dx:-3,dy:2,width:80,height:50,color:"blue"},
    {text:"Game",x:100, y:150,dx:2,dy:-3,width:100,height:50,color:"yellow"},
    {text:"Tangga",x:400, y:300,dx:-2,dy: 1,width:120,height:50,color:"black"}
];

function animateTexts(){
    lib.deleteCanvas();
    lib.context.font="50px 'Exo'";
    lib.context.textAlign="center";

    texts.forEach(item => {
        lib.context.fillStyle = item.color; // Terapkan warna manual
        lib.context.fillText(item.text, item.x, item.y);
        item.x+=item.dx;
        item.y+=item.dy;
        if (item.x+item.width/2>=lib.canvas_handler.width || item.x-item.width/2<=0) {
            item.dx=-item.dx; 
        }
        if (item.y+item.height/2 >= lib.canvas_handler.height || item.y-item.height/2<=0) {
            item.dy =-item.dy; 
        }
    });

    textAnimationId=requestAnimationFrame(animateTexts);
}

animateTexts();

//main game
function startGame(){
    if (textAnimationId) {
        cancelAnimationFrame(textAnimationId); // Sumber ChatGpt: kenapa pada saat start game canvas tidak memunculkan create papan yang ada pada function start game
        textAnimationId = null; 
    }
    papan = [];
    allKotakTeleport = [];
    indexPlayer = 0;
    indexKotak = 1; 
    lib.deleteCanvas();
    createPapan();
    createKotakTeleport();
    player();
    movePlayer();
    lib.draw();
    createNomorPapan();
}
document.getElementById("start").addEventListener("click", startGame);





