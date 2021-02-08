import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { StorageService } from '../storage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {
  pending: any = [];
  process: any = [];
  completed: any = []
  message;
  showCards: boolean;
  showProcessCards: boolean;
  showCompletedCards: boolean;

  constructor(private _storageService: StorageService, public dialog: MatDialog) { }

  ngOnInit() {
    this._storageService.currentMessage.subscribe(message => {
      if (message == 'newtask' || message == 'editedtask' || message == 'deletedtask' || message == 'movedtask') {
        console.log(message)
        this.pending = this._storageService.getPendingTasks()
        this.process = this._storageService.getProcessTasks() ? this._storageService.getProcessTasks() : []
        if (this.pending.length) {
          this.showCards = true
        } else {
          this.showCards = false;

        }
        console.log(this.process, 'vammoo')
        if (this.process && this.process.length) {
          this.showProcessCards = true
        } else {
          this.showProcessCards = false;

        }
        if (this.completed && this.completed.length) {
          this.showCompletedCards = true
        } else {
          this.showCompletedCards = false;

        }
        // console.log(this.pending.typeof(), 'pendinpendingpending')
      } else {
        console.log('mMEHHHH', this.pending)
        this.pending = this._storageService.getPendingTasks()
        this.process = this._storageService.getProcessTasks() ? this._storageService.getProcessTasks() : []
        this.completed = this._storageService.getCompletedTasks() ? this._storageService.getCompletedTasks() : []

        if (this.pending.length) {
          this.showCards = true
        } else {
          this.showCards = false;

        }
        console.log(this.process, 'vammoo')
        if (this.process && this.process.length) {
          this.showProcessCards = true
        } else {
          this.showProcessCards = false;

        }
        if (this.completed && this.completed.length) {
          this.showCompletedCards = true
        } else {
          this.showCompletedCards = false;

        }
      }
    })
    this.pending = this._storageService.getPendingTasks()

    // console.log('INITITITITIT', typeof (this._storageService.getPendingTasks()))


  }

  editPendingTask(id): void {

    console.log(id, 'IDDD')

    this.pending.filter((task) => {
      if (task.id === id) {
        const dialogRef = this.dialog.open(TaskFormComponent, {
          width: '60%',
          height: '50%',
          data: { title: task.title, description: task.description, priority: task.priority, date: task.date }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          // this.animal = result;
          this._storageService.editPendingTask(result, id)
          this._storageService.currentMessage.subscribe(message => this.message = message)
          this._storageService.changeMessage("editedtask")
        });
      }
    })
  }

  deletePendingTask(id): any {
    this._storageService.deletePendingTask(id)
    this._storageService.currentMessage.subscribe(message => this.message = message)
    this._storageService.changeMessage("deletedtask")
  }

  deleteProcessTask(id): any {
    this._storageService.deleteProcessTask(id)
    this._storageService.currentMessage.subscribe(message => this.message = message)
    this._storageService.changeMessage("deletedtask")
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event, 'EVENTTT')
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data ? event.previousContainer.data : [],
        event.container.data ? event.container.data : [],
        event.previousIndex,
        event.currentIndex);
      if (event.container.id === 'cdk-drop-list-1') {
        if (event.previousContainer.id === 'cdk-drop-list-0') {
          this._storageService.moveToProcessList(event.container.data)
          this._storageService.updatePendingTasks(event.previousContainer.data)
          this._storageService.currentMessage.subscribe(message => this.message = message)
          this._storageService.changeMessage("movedtask")
        }
        if (event.previousContainer.id === 'cdk-drop-list-2') {
          this._storageService.moveToProcessList(event.container.data)
          this._storageService.updateCompletedTasks(event.previousContainer.data)
          this._storageService.currentMessage.subscribe(message => this.message = message)
          this._storageService.changeMessage("movedtask")
        }
        //
        //
        //
      }
      if (event.container.id === 'cdk-drop-list-0') {
        if (event.previousContainer.id === 'cdk-drop-list-1') {
          this._storageService.moveToPendingList(event.container.data)
          this._storageService.updateProcessTasks(event.previousContainer.data)
          this._storageService.currentMessage.subscribe(message => this.message = message)
          this._storageService.changeMessage("movedtask")
        }
      }

      if (event.container.id === 'cdk-drop-list-2') {
        if (event.previousContainer.id === 'cdk-drop-list-1') {
          this._storageService.moveToCompletedList(event.container.data)
          this._storageService.updateProcessTasks(event.previousContainer.data)
          this._storageService.currentMessage.subscribe(message => this.message = message)
          this._storageService.changeMessage("movedtask")
        }
      }
    }
  }

}
