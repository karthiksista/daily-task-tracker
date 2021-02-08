import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from '../storage.service';
import { TaskFormComponent } from '../task-form/task-form.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  message
  priority: string;
  description: string;
  title: string;
  date: string

  constructor(public dialog: MatDialog, private _storageService: StorageService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '60%',
      height: '50%',
      data: { title: this.title, description: this.description, priority: this.priority, date: this.date }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
      this._storageService.createNewTasks(result)
      this._storageService.currentMessage.subscribe(message => this.message = message)
      this._storageService.changeMessage("newtask")
    });
  }


}
