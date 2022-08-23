'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-2-about-me

1. Using JavaScript, replace each of the spans (`nickname`, fav-food`, 
   `hometown`) with your own information.
2. In JavaScript, iterate through each `<li>` and change the class to 
   `list-item`.
3. Look in the css file!
------------------------------------------------------------------------------*/

window.addEventListener('load', main);

function main() {
   document.body.style.fontFamily='Arial, sans-serif'
   Object.values(document.getElementsByTagName('span')).forEach((span) => {
      switch (span.id) {
         case 'nickname': span.textContent = 'Vladimir'; break;
         case 'fav-food': span.textContent = 'Chesburgers'; break;
         case 'hometown': span.textContent = 'Amsterdam'; break;
      }
   });
   Object.values(document.getElementsByTagName('li')).forEach(li => {
      li.className = 'list-item';
      li.style.color = 'red'
   });
}


