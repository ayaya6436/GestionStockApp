import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorIdService {
  private lastId = 0;

  generateNewId(id: number): number {
    this.lastId++;
    return this.lastId;
  }

  constructor() { }
}
