import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-tree-view2',
  templateUrl: './tree-view2.component.html',
  styleUrls: ['./tree-view2.component.css']
})
export class TreeView2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(function () {
      $('.genealogy-tree2 ul').hide();
      $('.genealogy-tree2>ul').show();
      $('.genealogy-tree2 ul.active').show();
      $('.genealogy-tree2 li').on('click', function (e) {
          var children = $(this).find('> ul');
          if (children.is(":visible")) children.hide('fast').removeClass('active');
          else children.show('fast').addClass('active');
          e.stopPropagation();
      });
  });
  }

}
