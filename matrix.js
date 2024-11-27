export default class MatrixUtility{
    constructor(){}
    static createIdentityMatrix(){
        return [
            [1,0,0],
            [0,1,0],
            [0,0,1]
        ];
    }

    static multiplyMatrix(m1,m2){
        let hasil = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]

        for (let i=0;i<3;i++){
            for (let j=0;j<3;j++){
                for (let k=0;k<3;k++){
                    hasil[i][k] += m1[i][j] * m2[j][k] 
                }
            }
        }

        return hasil;

    }

    static createTranslationMatrix(Tx,Ty){
        return [
            [1,0,Tx],
            [0,1,Ty],
            [0,0,1]
        ];
    }
    static createRotationMatrix(angle){
        return [
            [Math.cos(angle),-Math.sin(angle),0],
            [Math.sin(angle),Math.cos(angle),0],
            [0,0,1]
        ];
    }
    static createScaleMatrix(Sx,Sy){
        return [
            [Sx,0,0],
            [0,Sy,0],
            [0,0,1]
        ];
    }

    static createdFixedPointRotationMatrix(anchor,angle){
        let m1= this.createTranslationMatrix(-anchor.x,-anchor.y);
        let m2=this.createRotationMatrix(angle);
        let m3 = this.createTranslationMatrix(anchor.y,anchor.y);

        let hasil;
        hasil = this.multiplyMatrix(m3,m2);
        hasil = this.multiplyMatrix(hasil,m1);//m3 * m2 * m1 * titik

        return hasil;
    }

    static createdFixedPointScaleMatrix(anchor,Sx,Sy){
        let m1= this.createTranslationMatrix(-anchor.x,-anchor.y);
        let m2=this.createScaleMatrix(Sx,Sy);
        let m3 = this.createTranslationMatrix(anchor.y,anchor.y);

        let hasil;
        hasil = this.multiplyMatrix(m3,m2);
        hasil = this.multiplyMatrix(hasil,m1);//m3 * m2 * m1 * titik

        return hasil;
    }

    // static transformPoint(point,matrix){
    //     return {x:matrix[0][0]*point.x + matrix[0][1]*point.y + matrix[0][2]*1, y:matrix[1][0]*point.x + matrix[1][1]*point.y + matrix[1][2]*1 }
    // }
    static transformPoint(point, matrix) {
        return {
            x: matrix[0][0] * point.x + matrix[0][1] * point.y + matrix[0][2] * 1,
            y: matrix[1][0] * point.x + matrix[1][1] * point.y + matrix[1][2] * 1
        };
    }
    
    static transformPoints(points,matrix){
        let hasil =[];
        for (let i=0;i<points.length;i++){
            var point_hasil;
            point_hasil= this.transformPoint(points[i],matrix);
            hasil.push(point_hasil);
        }

        return hasil;
    }
}