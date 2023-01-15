import { Component, ViewChild } from '@angular/core';
import { NgxAngularQrcodeComponent } from 'ngx-angular-qrcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-connection-demo-v9';
  
  qrData = 'https://qrtrac.com';
  shape = 'circle';
  width = 300;
  height = 300;
  margin = 5;

  imageUrl!: string;

  // Dots Options
  dotsType = 'Rounded';
  dotsGradient = true;
  dotsColor!: string;
  dotsStartColor = '#11ff33';
  dotsEndColor = '#ff1122';
  dotsGradientType = 'linear';
  dotsGradientRotation = 0;

  // Corner Square Options
  cornerSquareType = 'Rounded';
  cornerSquareGradient = true;
  cornerSquareColor!: string;
  cornerSquareStartColor = '#ff12ff';
  cornerSquareEndColor = '#E09515';
  cornerSquareGradientType = 'linear';
  cornerSquareGradientRotation = 0;

  // Corner Dot Options
  cornerDotType = 'Rounded';
  cornerDotGradient = true;
  cornerDotColor!: string;
  cornerDotStartColor = '#ffff00';
  cornerDotEndColor = '#333333';
  cornerDotGradientType = 'radial';
  cornerDotGradientRotation = 0;

  // Background Options
  backgroundType = 'Rounded';
  backgroundGradient = false;
  backgroundColor = '#ffffff'
  backgroundStartColor = '#ffffff';
  backgroundEndColor = '#B7C2E1';
  backgroundGradientType = 'radial';
  backgroundGradientRotation = 0;

  // Image Options
  imageSize!: number;
  imageMargin!: number;
  hideImageBackgroundDots = true;

  errorCorrectionLevel = 'Q';

  fileExtension = 'png';

  @ViewChild(NgxAngularQrcodeComponent, { static: true }) qrCode!: NgxAngularQrcodeComponent;

  qrImageChanged(event: any): void {
    const files = event.target.files;
    const fileToUpload = files.item(0);

    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(fileToUpload as Blob);
  }

  downloadQr(): void {
    this.qrCode.download(this.fileExtension);
  }

}
