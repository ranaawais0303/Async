'use strict';

// challenge # 2
// let img;
const wait = function (second) {
  return new Promise(function (resolve) {
    setTimeout(resolve, second * 1000);
  });
};
const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// //wait resolve the promise
let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     // currentImg.style.opacity = 0;
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('image 2  loaded');
//     return wait(2);
//   })
//   .then(() => (currentImg.style.display = 'none'))
//   .catch(err => console.error(err));

//challenge # 3

//PART 1
const loadNPause = async function () {
  try {
    //load img 1
    let img = await createImage('img/img-1.jpg');
    console.log('image 1 loaded');
    // currentImg = img1;
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-2.jpg');
    console.log('image 2 loaded');
    // currentImg = img1;
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-3.jpg');
    console.log('image 3 loaded');
    // currentImg = img1;
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();
//PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = await imgArr.map(async img => await createImage(img));
    // console.log(imgs);

    //combinator function promise.all
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);

    //add parallel class
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
