import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    // uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['undo', 'redo']],
      // ['style', ['bold', 'italic', 'underline', 'clear']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontsize', 'color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['emoji', 'picture', 'link']],
    ],
    // fontNames: [
    //   'Helvetica',
    //   'Arial',
    //   'Arial Black',
    //   'Comic Sans MS',
    //   'Courier New',
    //   'Roboto',
    //   'Times',
    // ],
  };
}
