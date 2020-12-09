import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise';

// Importamos el plugin capacitor
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exercises: Exercise[] = [];
  counterId: number = 0;


  constructor() {

    this.getExercisesStorage().then(
      data => this.exercises = data
    );

    this.getCounterIdStorage().then(
      data => this.counterId = data
    );
  }

  getExercises(): Exercise[] {
    return this.exercises;

  }

  public async getExercisesStorage(): Promise<Exercise[]> {
    const ret = await Storage.get({ key: 'exercises' });
    return JSON.parse(ret.value) ? JSON.parse(ret.value) : [];
  }

  public async getCounterIdStorage(): Promise<number> {
    const { value } = await Storage.get({ key: 'counterId' });
    return value ? +value : 0;
  }

  public getExercise(id: number) {
    return { ...this.exercises.filter(ex => ex.id === id)[0] };
  }

  public async saveExercise(ex: Exercise) {

    // Creamos una nueva tarea
    if (ex.id == undefined) {
      ex.id = this.counterId++;
      this.exercises.push(ex);
    } else {
      // Editamos una tarea ya existente.
      this.exercises = this.exercises.filter(exer => exer.id != ex.id);
      this.exercises.push(ex);
    }

    await this.saveExercises(this.exercises);
    await this.saveCounterId(this.counterId);
  }

  public async saveExercises(exercises: Exercise[]) {
    await Storage.set({
      key: 'exercises',
      value: JSON.stringify(exercises)
    });
  }

  public async saveCounterId(cI: number) {
    await Storage.set({
      key: 'counterId',
      value: '' + cI
    });
  }

  public async deleteExercise(id: number) {
    this.exercises = this.exercises.filter(e => e.id != id);
    await this.saveExercises(this.exercises);
  }




  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //____________________________________________________________________________________________________________________//
}
