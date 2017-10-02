import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  qrData = null;
  createdCode = null;
  scannedCode = null;
  usuario: string = "j2";
  credito: number = 0;

  usuarios: FirebaseListObservable<any>;
  cargas: FirebaseListObservable<any>;

  constructor(private barcodeScanner: BarcodeScanner, public navCtrl: NavController, db: AngularFireDatabase) {
    this.usuarios = db.list('/usuarios');
    this.cargas = db.list('/' + this.usuario);
  }

  createCode() {
    this.createdCode = this.qrData;
  }
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    })
  }

  ///////////////////
  cargarCredito(num) {
    /*var flag = 0;

    this.cargas.forEach(element => {
      for (let i in element) {
        console.log("element i-" + i + ": " + element[i].$value);
        if (element[i].$value == num) {
          flag = 1;
          return;
        }
      }
    });

    if (flag == 0) {
      this.cargas.push(num);
      console.log("credito cargado");
    }
    else if (flag == 1) {
      console.log("ya se cargo");
    }*/

    if (!this.verificarCredito(num)) {
      
      var creditoAgregado: number;
      switch (num) {
        case '2786f4877b9091dcad7f35751bfcf5d5ea712b2f':
          creditoAgregado = 100;
          break;

        case '8c95def646b6127282ed50454b73240300dccabc':
          creditoAgregado = 50;
          break;

        case 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172':
          creditoAgregado = 10;
      }


      var nuevoCredito: number = this.credito + creditoAgregado;
      this.cargas.push(num);
      console.log("credito cargado");
      this.usuarios.update(this.usuario, { credito: nuevoCredito })
    }
    else {
      console.log("ya se cargo");
    }
  }

  verificarCredito(num) {
    var flag = 0;
    this.cargas.forEach(element => {
      for (let i in element) {
        console.log("element i-" + i + ": " + element[i].$value);
        if (element[i].$value == num) {
          flag = 1;
          return flag;
        }
      }
    });
    return flag;
  }





  verCredito(num) {
    this.cargas.forEach(element => {

      for (let i in element) {

        console.log(element[i].$value + "num: " + num);
        if (element[i].$value == num) {
          console.log("oasdasdoaosd");
          return;
        }
        //        console.log(element[i].$value);

      }
    })
  }
  ////////////////////

}
