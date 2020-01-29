import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.scss"]
})
export class CalculatorComponent implements OnInit {
  show: string;
  sum: string;
  total: string;
  _number: any = [];
  his: string;
  his_st: boolean;
  ch_k: boolean;
  constructor() {}

  ngOnInit() {
    this.ch_k = false;
    this.his_st = false;
    this.show = "";
    this.total = "";
    this.sum = "";

  }

  cal(key) {
    //เช็คไม่ให้กรอกครั้งแรก
    if ((key == "%" || key == "*" || key == "/") && this.show == "") {
      return;
    }

    //เมื่อกด = แล้ว พิมพ์ใหม่ให้เคลียร์ค่าเก่า
    if (this.ch_k) {
      this.clear();
      this.ch_k = false;
    }

    //เก็บค่าเอาไปใช้หา % โดยเก็บเรียงตัวหนังสือต่อกัน
    if (
      key == 1 ||
      key == 2 ||
      key == 3 ||
      key == 4 ||
      key == 5 ||
      key == 6 ||
      key == 7 ||
      key == 8 ||
      key == 9 ||
      key == 0 ||
      key == "."
    ) {
      let tx: string = this.sum + key;
      this.sum = tx;
    }

    if (key == "+" || key == "-" || key == "*" || key == "/") {
      //เก็บค่าไว้ใน อาเรย์
      this._number.push(this.sum);
      this.sum = "";
      // console.log(this._number);

      //เช็คตัวสุดท้าย เพื่อไม่ให้พิมพ์เครื่องหมายตอกันได้เกิน 2 ตัว
      let tx;
      let td;
      let b = this.show.toString();
      tx = b.charAt(b.length - 1);
      td = b.charAt(b.length - 2);
      if ((tx == "*" || tx == "/") && key == "-") {
        let td;
        let b = this.show.toString();
        td = b.charAt(b.length - 2);
        if (td != "-" && key == "-") {
          this.show = this.show + key;
          this.total = this.total + key;
        }
      }
      //เช็คตัวรองสุดท้าย เพื่อไม่ให้พิมพ์เครื่องหมายตอกันได้เกิน 2 ตัว
      else if ( (td == "+" || td == "*" || td == "/")) {
        // debugger
        if(tx == "-"){
          return;
        }
          this.show = this.show + key;
          this.total = this.total + key;
        
      }
      

      //กำหลดค่าลงใน show เพื่อไปแสดง
      else {
        this.check_text();
        this.show = this.show + key;
        this.total = this.total + key;
      }
    } else if (key == "%") {

      let tx;
      let b = this.show.toString();
      tx = b.charAt(b.length - 1);
      if (tx == "+" || tx == "-"|| tx == "*"|| tx == "/" || tx == "%") {
      return;
      }
      //ถ้ากด % ครั้งแรก ให้คำนวณได้
      if (this._number.length == 0) {
        this._number.push(this.sum);
        this.show = this.show + key;
        let pr = this._number[0];
        let s_t = eval(pr + "/100");
        this.total =  s_t.toString();
        // console.log(this.total);
      } else {
        this.show = this.show + key;
        this._number.push(this.sum);
        this.sum = "";
        let pr1 = this._number[this._number.length - 2];
        let pr2 = this._number[this._number.length - 1];

        this.total = this.total.substring(0, this.total.length - pr2.length);
        let s_t = eval("(" + pr1 + "/100)*" + pr2);

        this.total = this.total + s_t.toString();
        // console.log(this.total);
      }
    }
    
    else {
      this.show = this.show + key;
      this.total = this.total + key;
    }
  }
  clear() {
    this.his_st = false;
    this.his = "";
    this.show = "";
    this.total = "";
    this.sum = "";
    this._number = [];
  }

  //เช็คตัวสุดท้าย และตัด
  check_text() {
    let tx;
    let b = this.show.toString();
    tx = b.charAt(b.length - 1);
    if (tx == "+" || tx == "-" || tx == "*" || tx == "/") {
      this.show = this.show.substring(0, this.show.length - 1);
    }
    let tx2;
    let b2 = this.total.toString();
    tx2 = b2.charAt(b.length - 1);
    if (tx2 == "+" || tx2 == "-" || tx2 == "*" || tx2 == "/") {
      this.total = this.total.substring(0, this.total.length - 1);
    }
  }

  //เช็คตัวหน้า และตัด
  check_text2() {
    let tx;
    let b = this.show.toString();
    tx = b.charAt(0);
    if (tx == "/" || tx == "*" || tx == "%") {
      this.show = "0";
    }
    let tx1;
    let b1 = this.total.toString();
    tx1 = b1.charAt(0);
    if (tx1 == "/" || tx1 == "*" || tx == "%") {
      this.total = "0";
    }
  }

  //คำนวณ
  calculator() {
    if (this.show != "") {
      console.log(this.total);
      this.check_text();
      this.check_text();
      this.check_text2();
      this.his = this.show;
      this.show = eval(this.total.toString());
      this.his_st = true;
      this.ch_k = true;
    }
  }
}
