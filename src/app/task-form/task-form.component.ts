import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import {
  FormArray, FormBuilder, FormControl
  , FormGroup, Validators
} from '@angular/forms';

export interface DialogData {
  title,
  description,
  priority,
  date,
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
  todayDate: Date
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
    this.todayDate = new Date();
  }

  buildForm(): void {
    this.newTaskForm = this.formBuilder.group({
      'title': [this.title, [Validators.required]],
      'description': [this.description, [Validators.required]],
      'date': [this.date, [Validators.required]],
      'priority': [this.priority, [Validators.required]],
    })
    // console.log(this.newTaskForm)/*  */
  }
  save(): void {
    const itemData = this.newTaskForm.value;
    this.dialogRef.close(itemData);
  }
  close(): void {
    this.dialogRef.close();
  }
  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1._id === o2._id;
  }
}
