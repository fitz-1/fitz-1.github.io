const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageArr = ['../../img/wa11/pic1.png', '../../img/wa11/pic2.png', '../../img/wa11/pic3.png', '../../img/wa11/pic4.png', '../../img/wa11/pic5.png'];
/* Declaring the alternative text for each image file */
const altDict = {
    'pic1.png': "my friends and a campfire with lots of stars",
    'pic2.png': "the milky way seen from Moab",
    'pic3.png': "my tent for the night and the stars above",
    'pic4.png': "my friends at the campfire with shooting stars above them",
    'pic5.png': "lots of stars on the horizon in Moab"
}
/* Looping through images */
count = 0;
for(img of imageArr){
    const newImage = document.createElement('img');
    console.log(imageArr[img])
    newImage.setAttribute('src', img);
    newImage.setAttribute('alt', altDict[count++]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener("click", picChange => {
        displayedImage.src = picChange.target.src;
        displayedImage.alt = picChange.target.alt;
    });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", () => {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
        btn.textContent = 'Lighten';
        btn.setAttribute('class','light');
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        overlay.style.height = displayedImage.naturalHeight;
        overlay.style.width = displayedImage.naturalWidth;
    } else {
        btn.textContent = 'Darken';
        btn.setAttribute('class','dark');
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
        overlay.style.height = displayedImage.naturalHeight;
        overlay.style.width = displayedImage.naturalWidth;
    }
})