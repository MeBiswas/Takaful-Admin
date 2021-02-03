import { Component, OnInit } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Interface
import { Filter } from '../../../model/filter';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Form
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from '../../../services/admin/admin.service';
// Regex Patterns
const pattern = /^[a-zA-Z]*$/;

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css'],
})
export class AddTemplateComponent implements OnInit {
  templateType: string = 'Email';

  AddTemplateForm = this._fb.group({
    message: [''],
    template: ['', Validators.required],
    type: ['', [Validators.required, Validators.pattern(pattern)]],
  });

  templateTypeList: Filter[] = [
    { value: 'Email', option: 'Email' },
    { value: 'SMS', option: 'SMS' },
  ];
  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  // Form Field Getter
  get template() {
    return this.AddTemplateForm.get('template');
  }
  get type() {
    return this.AddTemplateForm.get('type');
  }
}
