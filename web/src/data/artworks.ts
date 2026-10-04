import type ja from '../i18n/ja.json';

export interface Artwork {
  id: string;
  titleKey: keyof typeof ja.artwork;
  image: string;
  postUrl: string;
  pixivUrl?: string;
}

export const artworks: Artwork[] = [
  { id: 'new-year', titleKey: 'newYear', image: '/images/artworks/new-year.jpg', postUrl: 'https://twitter.com/nogikun_/status/1476931194583273477', pixivUrl: 'https://www.pixiv.net/artworks/95190174' },
  { id: 'fish', titleKey: 'fish', image: '/images/artworks/fish.jpg', postUrl: 'https://twitter.com/nogikun_/status/1488430073405313029' },
  { id: 'punched', titleKey: 'punched', image: '/images/artworks/punched.jpg', postUrl: 'https://twitter.com/nogikun_/status/1464290733767024643' },
  { id: 'blank', titleKey: 'blank', image: '/images/artworks/blank.jpg', postUrl: 'https://twitter.com/nogikun_/status/1456881963638267905', pixivUrl: 'https://www.pixiv.net/artworks/96385147' },
  { id: 'namakubi', titleKey: 'namakubi', image: '/images/artworks/namakubi.jpg', postUrl: 'https://twitter.com/nogikun_/status/1426466900087771140' },
];
