import { Component } from '@angular/core';
import { Box } from './app.box'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculator';
  firstDigit = "";
  arr = ["+","-","*","/","=","X"];
  listOp : string[];
  result1 = "";
  box2 = '0'
  constructor()
  {
    this.listOp = []
  }

  doOperation()
  {
    let result = 0;
    if(this.listOp[1] == "+")
      result = Number(this.listOp[0]) + Number(this.listOp[2]);
    else if(this.listOp[1] == "-")
      result = Number(this.listOp[0]) - Number(this.listOp[2]);
    else if(this.listOp[1] == "*" || this.listOp[1] == "X")
      result = Number(this.listOp[0]) * Number(this.listOp[2]);
    else if(this.listOp[1] == "/")
      result = Number(this.listOp[0]) / Number(this.listOp[2]);
    else{
      this.firstDigit = "";
      this.listOp = [];
    }

    //this.model.box = result.toString();
    this.box2 = result.toString();

    if(this.listOp[3] == "=")
    {
      this.listOp = [];
      this.firstDigit = result.toString();
      this.result1 = result.toString();
    }
    else
    {
      this.listOp[0] = result.toString();
      this.listOp[1] = this.listOp[3];
      this.listOp.pop();
      this.listOp.pop(); 
      this.firstDigit = "";
      this.result1 = result.toString();
    }
  }

  checkOperator(op : String)
  {
    for(let i=0;i<this.arr.length;i++)
    {
      if(this.arr[i] == op)
      {
        return true;
      }
    }
    return false;
  }

  captureInput(event : any){
    let check = this.checkOperator(event.target.value);
    if(check == false)
    {
      if(this.firstDigit == this.result1)
      {
        this.firstDigit = "";
        this.result1 = "";  
      }
      if(event.target.value == "." && this.firstDigit == "")
      {
        this.firstDigit = "0";  
      }
      this.firstDigit = this.firstDigit + event.target.value;
      //this.model.box = this.firstDigit;
      this.box2 = this.firstDigit;
    }
    else if(check == true)
    {
      if(this.checkOperator(this.listOp[this.listOp.length]) != check && this.firstDigit != "")
      {
        this.listOp.push(this.firstDigit);
      }
      else 
      {
          if(this.checkOperator(this.listOp[this.listOp.length - 1]) == check)
            this.listOp.pop();
      }
      if(event.target.value != "=")
      {
        this.listOp.push(event.target.value); //push operator other than =
      }
      else
      {
        if(this.listOp.length > 2)
          this.listOp.push(event.target.value); //push operator = if it listop length is greater than 2
      }
      this.firstDigit = "";
      if(this.listOp.length>=3)
        this.doOperation(); // perform operation if length greater than 3
    }
  }

  resetCal(event : any)
  {
    this.listOp = [];
    this.firstDigit = "";
    //this.model.box = "0";
    this.box2 = "0"
  }
}
