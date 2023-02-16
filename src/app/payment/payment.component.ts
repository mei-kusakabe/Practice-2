import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#id1').show();
    $('#id2').hide();$('#id3').hide();$('#id4').hide();
    $('#b1').css('color', '#111111');
    $('#b1').css('background', '#CE992F');
  }

  btnClick(id:any){
    if(id=='id1'){
    $('#id1').show();
    $('#id2').hide();$('#id3').hide();$('#id4').hide();
    $('#b1').css('color', '#111111');
    $('#b1').css('background', '#CE992F');

    $('#b2').css('color', '#BBBBBB');
      $('#b2').css('background', '#2A2A2A');
      $('#b3').css('color', '#BBBBBB');
      $('#b3').css('background', '#2A2A2A');
      $('#b4').css('color', '#BBBBBB');
      $('#b4').css('background', '#2A2A2A');
    }
    if(id=='id2'){
      $('#id2').show();
      $('#id1').hide();$('#id3').hide();$('#id4').hide();
      $('#b2').css('color', '#111111');
      $('#b2').css('background', '#CE992F');

      $('#b1').css('color', '#BBBBBB');
      $('#b1').css('background', '#2A2A2A');
      $('#b3').css('color', '#BBBBBB');
      $('#b3').css('background', '#2A2A2A');
      $('#b4').css('color', '#BBBBBB');
      $('#b4').css('background', '#2A2A2A');
    }
    if(id=='id3'){
    $('#id3').show();
    $('#id2').hide();$('#id1').hide();$('#id4').hide();
    $('#b3').css('color', '#111111');
    $('#b3').css('background', '#CE992F');

    $('#b1').css('color', '#BBBBBB');
      $('#b1').css('background', '#2A2A2A');
      $('#b2').css('color', '#BBBBBB');
      $('#b2').css('background', '#2A2A2A');
      $('#b4').css('color', '#BBBBBB');
      $('#b4').css('background', '#2A2A2A');
    }
    if(id=='id4'){
      $('#id4').show();
      $('#id2').hide();$('#id3').hide();$('#id1').hide();
      $('#b4').css('color', '#111111');
      $('#b4').css('background', '#CE992F');

      $('#b1').css('color', '#BBBBBB');
      $('#b1').css('background', '#2A2A2A');
      $('#b2').css('color', '#BBBBBB');
      $('#b2').css('background', '#2A2A2A');
      $('#b3').css('color', '#BBBBBB');
      $('#b3').css('background', '#2A2A2A');
    }
  }

  paymentChosen(id:any){
    if(id=='p1'){
      $('#p1').css('color', '#111111');
      $('#p1').css('background', '#CE992F');

      $('#p2').css('color', '#BBBBBB');
      $('#p2').css('background', '#2A2A2A');
      $('#p3').css('color', '#BBBBBB');
      $('#p3').css('background', '#2A2A2A');
    }
    if(id=='p2'){
      $('#p2').css('color', '#111111');
      $('#p2').css('background', '#CE992F');

      $('#p1').css('color', '#BBBBBB');
      $('#p1').css('background', '#2A2A2A');
      $('#p3').css('color', '#BBBBBB');
      $('#p3').css('background', '#2A2A2A');
    }
    if(id=='p3'){
      $('#p3').css('color', '#111111');
      $('#p3').css('background', '#CE992F');

      $('#p2').css('color', '#BBBBBB');
      $('#p2').css('background', '#2A2A2A');
      $('#p1').css('color', '#BBBBBB');
      $('#p1').css('background', '#2A2A2A');
    }
  }

}
