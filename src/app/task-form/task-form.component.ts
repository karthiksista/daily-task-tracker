import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import {
  FormArray, FormBuilder, FormControl
  , FormGroup, Validators
} from '@angular/forms';

export interface DialogData {

}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  title: string;
  description: string;
  priority: string;
  date: string;
  newTaskForm: FormGroup;
  foods = [
    { value: 'low', viewValue: 'Low' },
    { value: 'Medium', viewValue: 'Medium' },
    { value: 'High', viewValue: 'High' }
  ];
  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): any {
    this.buildForm()
  }

  buildForm(): void {
    this.newTaskForm = this.formBuilder.group({
      'title': [this.title, [Validators.required]],
      'description': [this.description, [Validators.required]],
      'date': [this.date, [Validators.required]],
      'priority': [this.priority],
    })
  }
  onNoClick(): void {
    const itemData = this.newTaskForm.value;
    this.dialogRef.close(itemData);
  }
}
