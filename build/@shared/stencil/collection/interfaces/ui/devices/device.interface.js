import { SILVER, GOLD, BLACK_DEVICE, WHITE_DEVICE, BLUE, RED, GREEN, YELLOW } from '../color/color.interface';
export const DEVICE_LIST = [
    { displayTitle: 'iPhone X', device: 'iphone-x', isIOSMobile: true },
    { displayTitle: 'iPhone 8', device: 'iphone8', colors: [BLACK_DEVICE, SILVER, GOLD], isIOSMobile: true },
    { displayTitle: 'iPhone8 Plus', device: 'iphone8plus', colors: [BLACK_DEVICE, SILVER, GOLD], isIOSMobile: true },
    { displayTitle: 'iPhone 5S', device: 'iphone5s', colors: [BLACK_DEVICE, SILVER, GOLD], isIOSMobile: true },
    { displayTitle: 'iPhone 5C', device: 'iphone5c', colors: [BLUE, GREEN, YELLOW, RED, WHITE_DEVICE], isIOSMobile: true },
    { displayTitle: 'Samsung Galaxy Note 8', device: 'note8', isIOSMobile: false },
    { displayTitle: 'Samsung Galaxy S5', device: 's5', colors: [BLACK_DEVICE, WHITE_DEVICE], isIOSMobile: false },
    { displayTitle: 'Nexus 5', device: 'nexus5', isIOSMobile: false },
    { displayTitle: 'HTC-One', device: 'htc-one', isIOSMobile: false },
    { displayTitle: 'iPad Mini', device: 'ipad', colors: [BLACK_DEVICE, SILVER], isIOSMobile: false },
    { displayTitle: 'Macbook', device: 'macbook', isIOSMobile: false }
];
