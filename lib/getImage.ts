import fs from 'fs';

export function getImage() {
  const dir = '/public/static/images/';
  let imagePath = '';
  fs.readdir(dir, (_, files) => {
    imagePath = files[Math.floor(Math.random() * files.length)];
  });
  const base64String = Buffer.from(imagePath).toString('base64');
  return 'data:image/png;base64,' + base64String;
}
