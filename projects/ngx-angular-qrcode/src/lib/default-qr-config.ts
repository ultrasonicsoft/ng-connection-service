import { Options } from 'qr-code-styling';

export const QrPreviewSize = {
  width: 124,
  height: 124,
};

export const DefaultQrConfiguration: Options = {
  width: 240,
  height: 240,
  shape: 'square',
  type: 'canvas',
  data: 'draft',
  margin: 5,
  dotsOptions: {
    type: 'dots',
    color: '#000000',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'square',
    color: '#000000',
  },
  cornersDotOptions: {
    type: 'square',
    color: '#000000',
  },
  // image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 5,
    crossOrigin: 'anonymous',
  }
}