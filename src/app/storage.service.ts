import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  getPendingTasks(): any {
    return JSON.parse(localStorage.getItem('pendingList'))
  }
  changeMessage(message: string): void {
    this.messageSource.next(message);
  }

  createNewTasks(data): any {
    var pendingList = [];
    pendingList = JSON.parse(localStorage.getItem('pendingList')) || [];
    console.log(data, 'naaadata')

    console.log(pendingList.length, 'lengthyyyy')
    if (pendingList.length) {
      data['id'] = Math.floor(Math.random() * 100);
    } else {
      data['id'] = 1
    }
    pendingList.push(data);
    localStorage.setItem('pendingList', JSON.stringify(pendingList));
  }

  editPendingTask(data, id): any {
    console.log('before data', data)
    var pendingList = [];
    pendingList = JSON.parse(localStorage.getItem('pendingList'))
    const index = pendingList.findIndex(editIdData => editIdData.id === id)
    data['id'] = id
    console.log('index', index)
    pendingList[index] = data
    localStorage.setItem('pendingList', JSON.stringify(pendingList));
    console.log('afterdata', pendingList)
  }

  deletePendingTask(id): any {
    var pendingList = [];
    pendingList = JSON.parse(localStorage.getItem('pendingList'))
    const index = pendingList.findIndex(editIdData => editIdData.id === id)
    console.log('index', index)
    pendingList.splice(index, 1)
    localStorage.setItem('pendingList', JSON.stringify(pendingList));
    console.log('afterdata', pendingList)
  }

  deleteProcessTask(id): any {
    var processList = [];
    processList = JSON.parse(localStorage.getItem('processList'))
    const index = processList.findIndex(editIdData => editIdData.id === id)
    console.log('index', index)
    processList.splice(index, 1)
    localStorage.setItem('processList', JSON.stringify(processList));
    console.log('afterdata', processList)
  }

  updatePendingTasks(data): any {
    console.log('UPDATEPENDIN', data)
    localStorage.setItem('pendingList', JSON.stringify(data));
  }

  getProcessTasks(): any {
    return JSON.parse(localStorage.getItem('processList'))
  }
  moveToProcessList(data): any {
    localStorage.setItem('processList', JSON.stringify(data));
  }
  updateProcessTasks(data): any {
    localStorage.setItem('processList', JSON.stringify(data));
  }

  moveToPendingList(data): any {
    localStorage.setItem('pendingList', JSON.stringify(data));
  }

  getCompletedTasks(): any {
    return JSON.parse(localStorage.getItem('completedList'))
  }

  moveToCompletedList(data): any {
    localStorage.setItem('completedList', JSON.stringify(data));

  }
  updateCompletedTasks(data): any {
    localStorage.setItem('completedList', JSON.stringify(data));

  }
}
