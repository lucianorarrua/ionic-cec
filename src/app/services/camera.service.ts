import { Injectable } from '@angular/core';
import {
  Plugins,
  CameraResultType,
  CameraSource,
  CameraOptions
} from '@capacitor/core';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() {
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    }
    return await Camera.getPhoto(options);
  }
}
