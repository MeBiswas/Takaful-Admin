import { Input, OnInit, ViewChild, Component, OnChanges } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Forms
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit, OnChanges {
  @Input() data;
  @ViewChild('closeBtn') closeBtn;

  emailURL: string = '/message/email';

  emailForm = this._fb.group({
    message: ['', Validators.required],
    subject: ['', Validators.required],
    email: ['a@a.com', [Validators.required, Validators.email]],
  });

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  // LifeCycle Method
  ngOnChanges() {
    this.emailForm.patchValue({ ...this.data });
  }

  // Form Field Getter
  get email() {
    return this.emailForm.get('email');
  }
  get subject() {
    return this.emailForm.get('subject');
  }
  get message() {
    return this.emailForm.get('message');
  }

  config = {
    tabsize: 2,
    height: '200px',
    placeholder: '',
    toolbar: [
      ['edit', ['undo', 'redo']],
      ['headline', ['style']],
      [
        'style',
        [
          'bold',
          'clear',
          'italic',
          'underline',
          'subscript',
          'superscript',
          'strikethrough',
        ],
      ],
      ['fontface', ['fontname']],
      ['textsize', ['fontsize', 'color']],
      ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
      ['table', ['table']],
      ['insert', ['link']],
      ['view', ['fullscreen', 'codeview']],
    ],
    fontNames: [
      'Helvetica',
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Roboto',
      'Times',
    ],
  };

  // Submit Handler
  onSubmit(v) {
    !v
      ? this._toast.error('Please fill all required fields')
      : this.sendEmail(this.emailForm.value);
  }

  private sendEmail(v) {
    this._spin.show();
    this._admin.postApiWithAuth(this.emailURL, v).subscribe(
      (res) => {
        res ? this._spin.hide() : null;
        if (res.status.code === 0) {
          this._toast.success(res.status.message);
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else {
          this._toast.warning(res.status.message);
        }
      },
      (err) => {
        err ? this._spin.hide() : null;
        this._toast.error('Oops! Something went wrong.');
      }
    );
    this.closeModal();
  }

  // Close Modal Method
  closeModal(): void {
    this.emailForm.setValue({
      email: [''],
      message: [''],
      subject: [''],
    });
    this.closeBtn.nativeElement.click();
  }
}
