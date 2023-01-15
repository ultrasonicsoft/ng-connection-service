import { AfterContentInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import QRCodeStyling, { CornerDotType, CornerSquareType, DotType, ErrorCorrectionLevel, FileExtension, Gradient, GradientType, gradientTypes, Options, ShapeType } from 'qr-code-styling';
import { DefaultQrConfiguration, QrPreviewSize } from './default-qr-config';

@Component({
  selector: 'qr-code',
  template: `
        <div #qrCodeCanvas></div>    
  `,
  styles: [
  ]
})
export class NgxAngularQrcodeComponent implements OnChanges, AfterContentInit {
  @ViewChild('qrCodeCanvas', { static: true }) qrCodeCanvas!: ElementRef;

  @Input() qrData!: string;
  @Input() imageUrl!: string;
  @Input() shape!: string | ShapeType;
  @Input() width!: number;
  @Input() height!: number;
  @Input() margin!: number;

  // Dots Options
  @Input() dotsType!: string;
  @Input() dotsGradient!: boolean;
  @Input() dotsGradientType!: string;
  @Input() dotsGradientRotation!: number;
  @Input() dotsColor!: string;
  @Input() dotsStartColor!: string;
  @Input() dotsEndColor!: string;

  // Corners Square Options
  @Input() cornerSquareType!: string;
  @Input() cornerSquareGradient!: boolean;
  @Input() cornerSquareGradientType!: string;
  @Input() cornerSquareGradientRotation!: number;
  @Input() cornerSquareColor!: string;
  @Input() cornerSquareStartColor!: string;
  @Input() cornerSquareEndColor!: string;

  // Corners Dot Options
  @Input() cornerDotType!: string;
  @Input() cornerDotGradient!: boolean;
  @Input() cornerDotGradientType!: string;
  @Input() cornerDotGradientRotation!: number;
  @Input() cornerDotColor!: string;
  @Input() cornerDotStartColor!: string;
  @Input() cornerDotEndColor!: string;

  // Background Options
  @Input() backgroundType!: string;
  @Input() backgroundGradient!: boolean;
  @Input() backgroundGradientType!: string;
  @Input() backgroundGradientRotation!: number;
  @Input() backgroundColor!: string;
  @Input() backgroundStartColor!: string;
  @Input() backgroundEndColor!: string;

  // Image Options
  @Input() imageSize!: number;
  @Input() imageMargin!: number;
  @Input() hideImageBackgroundDots!: boolean;

  @Input() errorCorrectionLevel!: string;

  private qrCodeStyle!: QRCodeStyling;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.displayQr();
  }

  ngAfterContentInit(): void {
    console.debug('🔥 this.qrData', this.qrData);
    this.displayQr();
  }

  displayQr(): void {
    if (!QRCodeStyling) {
      return;
    }
    this.qrCodeCanvas.nativeElement.innerHTML = '';
    const dotsGradient: Gradient = {
      type: this.dotsGradientType as GradientType,
      rotation: this.dotsGradientRotation,
      colorStops: [
        {
          offset: 0,
          color: this.dotsStartColor
        },
        {
          offset: 1,
          color: this.dotsEndColor
        }
      ]
    }

    const cornerSquareGradient: Gradient = {
      type: this.cornerSquareGradientType as GradientType,
      rotation: this.cornerSquareGradientRotation,
      colorStops: [
        {
          offset: 0,
          color: this.cornerSquareStartColor
        },
        {
          offset: 1,
          color: this.cornerSquareEndColor
        }
      ]
    }
    const backgroundGradient: Gradient = {
      type: this.backgroundGradientType as GradientType,
      rotation: this.backgroundGradientRotation,
      colorStops: [
        {
          offset: 0,
          color: this.backgroundStartColor
        },
        {
          offset: 1,
          color: this.backgroundEndColor
        }
      ]
    }
    const cornerDotGradient: Gradient = {
      type: this.cornerDotGradientType as GradientType,
      rotation: this.cornerDotGradientRotation,
      colorStops: [
        {
          offset: 0,
          color: this.cornerDotStartColor
        },
        {
          offset: 1,
          color: this.cornerDotEndColor
        }
      ]
    }

    let config: Options = {
      ...DefaultQrConfiguration,
      shape: this.shape as ShapeType,
      width: this.width || QrPreviewSize.width,
      height: this.height || QrPreviewSize.height,
      margin: this.margin || DefaultQrConfiguration.margin,
      data: this.qrData || 'https://qrtrac.com',
      image: this.imageUrl,
      dotsOptions: {
        type: this.dotsType as DotType || DefaultQrConfiguration.dotsOptions?.type,
        color: this.dotsColor,
        ...(this.dotsGradient && { gradient: dotsGradient })
      },
      cornersSquareOptions: {
        type: this.cornerSquareType as CornerSquareType || DefaultQrConfiguration.cornersSquareOptions?.type,
        color: this.cornerSquareColor,
        ...(this.cornerSquareGradient && { gradient: cornerSquareGradient })
      },
      cornersDotOptions: {
        type: this.cornerDotType as CornerDotType || DefaultQrConfiguration.cornersDotOptions?.type,
        color: this.cornerDotColor,
        ...(this.cornerDotGradient && { gradient: cornerDotGradient })
      },
      backgroundOptions: {
        color: this.backgroundColor,
        ...(this.backgroundGradient && { gradient: backgroundGradient })
      },
      imageOptions: {
        imageSize: this.imageSize || DefaultQrConfiguration.imageOptions?.imageSize,
        margin: this.imageMargin || DefaultQrConfiguration.imageOptions?.margin,
        hideBackgroundDots: this.hideImageBackgroundDots || DefaultQrConfiguration.imageOptions?.hideBackgroundDots
      },
      qrOptions: {
        errorCorrectionLevel: this.errorCorrectionLevel as ErrorCorrectionLevel || DefaultQrConfiguration.qrOptions?.errorCorrectionLevel
      }
    };

    this.qrCodeStyle = new QRCodeStyling(config);
    this.qrCodeStyle.append(this.qrCodeCanvas.nativeElement);
  }

  download(fileExtension: string, qrName?: string): void {
    console.debug('🔥 download called',);
    this.qrCodeStyle.download({
      name: qrName || 'ngxs-qrcode',
      extension: fileExtension as FileExtension
    })
  }

}
