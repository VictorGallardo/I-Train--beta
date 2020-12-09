import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from 'src/app/model/exercise';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  exercise: Exercise = { title: '', description: '', time: 0, repeat: 0, rest: 0 }
  time;
  interval
  cRepeats: number;

  state: 'start' | 'stop' = 'stop';

  constructor(
    private exercisesService: ExerciseService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.exercise = this.exercisesService.getExercise(+id)
    }
    this.cRepeats = this.exercise.repeat
    this.time = this.exercise.time
  }


  goAddEdit(id: number) {
    this.router.navigateByUrl(`/add-edit${id != undefined ? '/' + id : ''}`);
  }


  startTimer() {
    this.state = 'start';
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      } else {
        this.time = this.exercise.time;
      }
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.interval);
    this.state = 'stop';
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
