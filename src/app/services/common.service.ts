import { Injectable } from '@angular/core';
import { keyValue, selected, textValue } from '../interfaces/shared';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  commonData: keyValue[];
  selection: selected[];
  clone: selected[];

  constructor() {

    this.commonData = [];
    this.selection = [];

  }

  setItem(key: string, value: any): void {

    var found = this.commonData.filter(x => x.key == key)[0];
    if (found != null) {
      found.value = value;
    }
    else {
      this.commonData.push(new keyValue(key, value));
    }
  }

  getItem(key: string): any {

    var found = this.commonData.filter(x => x.key == key)[0];
    if (found != null) {
      return found.value;
    }
    return null;
  }

  clearItems(): void {
    this.commonData = [];
  }

  canAddToSelection(key0: string, key1: string): boolean {

    return this.selection.findIndex(x => x.key0 == key0 && (key1 == null || x.key1 == key1)) == -1;

  }

  addToSelection(key0: string, key1: string, stringifiedData :string) {

    var index = this.selection.findIndex(x => x.key0 == key0 && (key1 == null || x.key1 == key1));
    if (index == -1) {
      this.selection.push(new selected(key0, key1,stringifiedData));
    }

  }


  removeFromSelection(key0: string, key1: string) {

    var foundIndex = this.selection.findIndex(x => x.key0 == key0 && (key1 == null || x.key1 == key1));
    if (foundIndex != -1) {
      this.selection.splice(foundIndex, 1);
    }

  }

  clearSelection() {
    this.selection = [];
  }

  getSelection(): selected[] {

    this.clone = [];
    this.clone.push(...this.selection);
    return this.clone;

  }


}
