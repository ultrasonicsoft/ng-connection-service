# ngx-angular-qrcode - Build beautiful QR Codes


> This library provides an Angular component to create beautiful QR codes in your application. 

> Note that, this library supports Angular version 9 till version 15 onward, and verified with demos.

## Need Dynamic QR Codes?
If you need to dynamic QR codes with analytics and more features, check out [QRtrac](https://qrtrac.com)

<!-- ## [Demo](https://free-qr-code-generator.qrtrac.com/)
See how can you create QR codes with different options -->

## Example QR Codes

<div style="display:flex; justify-content=space-around">
<img style="margin-right: 15px" src="https://github.com/ultrasonicsoft/ngx-angular-qrcode/blob/main/projects/ngx-angular-qrcode/assets/qrcode-1.png?raw=true" width="150" height="150" alt="Qr Code" title="Qr Code">
<img  style="margin-right: 15px" src="https://github.com/ultrasonicsoft/ngx-angular-qrcode/blob/main/projects/ngx-angular-qrcode/assets/qrcode-2.png?raw=true" width="150" height="150" alt="Qr Code" title="Qr Code">
<img  style="margin-right: 15px" src="https://github.com/ultrasonicsoft/ngx-angular-qrcode/blob/main/projects/ngx-angular-qrcode/assets/qrcode-3.png?raw=true" width="150" height="150" alt="Qr Code" title="Qr Code">
<img  style="margin-right: 15px" src="https://github.com/ultrasonicsoft/ngx-angular-qrcode/blob/main/projects/ngx-angular-qrcode/assets/qrcode-4.png?raw=true" width="150" height="150" alt="Qr Code" title="Qr Code">
<img src="https://github.com/ultrasonicsoft/ngx-angular-qrcode/blob/main/projects/ngx-angular-qrcode/assets/qrcode-5.png?raw=true" width="150" height="150" alt="Qr Code" title="Qr Code">
</div>




## Credits
This is an Angular wrapper library over the plain JavaScript [QR Code Styling library](https://qr-code-styling.com/)

## Installation

* Install the library by running `npm install ngx-angular-qrcode` command in your Angular project directory.

* Import `NgxAngularQrcodeModule` module into `AppModule` or any lazy loaded child module of your Angular application.

```ts
import { NgxAngularQrcodeModule } from 'ngx-angular-qrcode';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxAngularQrcodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
* Add `<qr-code></qr-code>` selector in your component's HTML file or template. The parameters can be configured per requirements.

```html
    <qr-code #qrCode
      [qrData]="qrData"
      [shape]="shape"
      [width]="width"
      [height]="height"
      [margin]="margin"
      [imageUrl]="imageUrl"
      [dotsType]="dotsType"
      [dotsColor]="dotsColor"
      [dotsGradient]="dotsGradient"
      [dotsStartColor]="dotsStartColor"
      [dotsEndColor]="dotsEndColor"
      [dotsGradientType]="dotsGradientType"
      [dotsGradientRotation]="dotsGradientRotation"
      [cornerSquareType]="cornerSquareType"
      [cornerSquareColor]="cornerSquareColor"
      [cornerSquareGradient]="cornerSquareGradient"
      [cornerSquareStartColor]="cornerSquareStartColor"
      [cornerSquareEndColor]="cornerSquareEndColor"
      [cornerSquareGradientType]="cornerSquareGradientType"
      [cornerSquareGradientRotation]="cornerSquareGradientRotation"
      [cornerDotType]="cornerDotType"
      [cornerDotColor]="cornerDotColor"
      [cornerDotGradient]="cornerDotGradient"
      [cornerDotStartColor]="cornerDotStartColor"
      [cornerDotEndColor]="cornerDotEndColor"
      [cornerDotGradientType]="cornerDotGradientType"
      [cornerDotGradientRotation]="cornerDotGradientRotation"
      [backgroundColor]="backgroundColor"
      [backgroundGradient]="backgroundGradient"
      [backgroundStartColor]="backgroundStartColor"
      [backgroundEndColor]="backgroundEndColor"
      [backgroundGradientType]="backgroundGradientType"
      [backgroundGradientRotation]="cornerDotGradientRotation"
      [imageSize]="imageSize"
      [imageMargin]="imageMargin"
      [hideImageBackgroundDots]="hideImageBackgroundDots"
      [errorCorrectionLevel]="errorCorrectionLevel"></qr-code>
```

* Make sure you create a local reference using `#qrCode` or any variable name to call `download` method to download qr code if its used in `@ViewChild()`.

```ts
import { Component, ViewChild } from '@angular/core';
import { NgxAngularQrcodeComponent } from 'ngx-angular-qrcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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

```

## API Documentation

Please refer to this [API Documentation](https://github.com/kozakdenys/qr-code-styling) to understand each parameters, and different options for them.



