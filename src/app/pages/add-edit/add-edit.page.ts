import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Exercise } from 'src/app/model/exercise';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.page.html',
  styleUrls: ['./add-edit.page.scss'],
})
export class AddEditPage implements OnInit {

  exercise: Exercise = { title: '', description: '', time: undefined, repeat: undefined, rest: undefined }
  value: boolean = false;

  constructor(
    private exercisesService: ExerciseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.value = true;
      this.exercise = this.exercisesService.getExercise(+id)
    }
  }

  saveExercise() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.exercisesService.saveExercise(this.exercise);
    this.router.navigateByUrl('/home');
    if (id != null) {
      this.presentToastEdit()
    } else {
      this.presentToastCreate()

    }

  }
  async presentToastEdit() {
    const toast = await this.toastController.create({
      message: 'Ejercicio editado con éxito',
      duration: 2000
    });
    toast.present();
  }

  async presentToastCreate() {
    const toast = await this.toastController.create({
      message: 'Ejercicio creado con éxito',
      duration: 2000
    });
    toast.present();
  }

  async deleteToast() {
    const toast = await this.toastController.create({
      message: 'Ejercicio borrado',
      duration: 2000
    });
    toast.present();
  }

  deleteExercise(id: number) {
    this.exercisesService.deleteExercise(id);
    this.router.navigateByUrl('/home');
    this.deleteToast()

  }

  async presentAlertConfirm(e: Exercise) {
    console.log('alerta');
    const alert = await this.alertController.create({
      header: 'Borrar ejercicio',
      message: `¿Estás seguro que quieres borrar el ejercicio <strong> ${e.title}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Aceptar',
          handler: () => {
            this.deleteExercise(e.id);
          }
        }
      ]
    });

    await alert.present();
  }

}
