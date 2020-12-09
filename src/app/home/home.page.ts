import { Component } from '@angular/core';
import { Exercise } from '../model/exercise';
import { Router } from '@angular/router';
import { ExerciseService } from '../services/exercise.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  btnColor = "bluelight";

  constructor(public exercisesService: ExerciseService,
    private router: Router) { }

  changeColor(btn) {

    if (btn.color === 'bluelight')
      btn.color = 'yellow';
    else
      btn.color = 'bluelight';
  }

  goAddEdit(id: number) {
    this.router.navigateByUrl(`/add-edit${id != undefined ? '/' + id : ''}`);
  }

  goTimer(id: number) {
    this.router.navigateByUrl(`/timer${id != undefined ? '/' + id : ''}`);
  }


  ///////////////////////////////////////////////////////////////////
}


