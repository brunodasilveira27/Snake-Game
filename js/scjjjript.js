const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const render_screen = document.querySelector('.render-screen');
const render_txt = document.querySelector('#render-txt');

let grid_size = 15;
let grid_x = grid_y = 0;
let canvas_color = 'lightgreen';
let jogando = false;
let scores = 0;
let score_span = document.querySelector('#score-span');

const strings = {

  click_onScreen: 'Deslize o dedo para jogar!',
  orientation_change: 'A tela precisa estar em modo paisagem.',

};

function resize() {

  canvas.width = window.screen.width;
  canvas.height = window.screen.height;
  
  grid_x = canvas.width / grid_size;
  grid_y = canvas.height / grid_size;
  
};

function screen_orientation() {

  if(window.orientation != 90) {
  
     show_screen();
     render_txt.innerText = strings.orientation_change;
     return false;
  
  }
  
  else {
  
     show_screen();
     render_txt.innerText = strings.click_onScreen;
     return true;
  
  };

};

const snake = {

  color: '#000',
  pos_x: 0,
  pos_y: 0,
  vel_x: 0,
  vel_y: 0,
  trail: [],
  tail: 2,

};

const food = {

   color: 'red',
   pos_x: 0,
   pos_y: 0,
   
   pos() {
   
     this.pos_x = Math.floor(Math.random(2) * grid_x);
     this.pos_y = Math.floor(Math.random(2) * grid_y);
   
   }

};

function loop() {

  snake.pos_x += snake.vel_x;
  snake.pos_y += snake.vel_y;
  
  if(snake.pos_x > grid_x) {
  
     snake.pos_x = 0;
  
  }
  
  else if(snake.pos_x < 0) {
  
      snake.pos_x = grid_x;
  
  };
  
  if(snake.pos_y > grid_y) {
  
     snake.pos_y = 0;
  
  } else if(snake.pos_y < 0){
     snake.pos_y = grid_y;
  };
  
  ctx.fillStyle = canvas_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = snake.color;
  
  for(let i = 0; i < snake.trail.length; i++) {
  
      ctx.fillRect(snake.trail[i].x * grid_size, snake.trail[i].y * grid_size, grid_size, grid_size);
      
      if(snake.pos_x === food.pos_x && snake.pos_y === food.pos_y) {
      
         scores += 1;
         score_span.innerText = scores;
         food.pos();
         snake.tail += 1;
      
      };
  
  };
  
  snake.trail.push({
  
    x: snake.pos_x,
    y: snake.pos_y
  
  });
  
  while(snake.trail.length > snake.tail) {
  
    snake.trail.shift();
  
  };
  
  ctx.fillStyle = food.color;
  ctx.fillRect(food.pos_x * grid_size, food.pos_y * grid_size, grid_size, grid_size);

};

function show_screen() {

  render_screen.classList.remove('none');

};

function hidden_screen() {

  render_screen.classList.add('none');

};

window.onload = function() {

  resize();
  screen_orientation();
  food.pos();
  
  let fps = 1000 / 10;
  setInterval(loop, fps);

};

window.addEventListener('resize', resize);
window.addEventListener('orientationchange', function() {

  screen_orientation();

});

let touch_start = [];
let touch_move = [];

window.addEventListener('touchstart', function(e) {

  if(screen_orientation()) {
  
     hidden_screen();
     jogando = true;
  
  };
  
  touch_start = [e.touches[0].pageX, e.touches[0].pageY];

});

window.addEventListener('touchmove', function(e) {

   touch_move = [touch_start[0] - e.touches[0].pageX, touch_start[1] - e.touches[0].pageY];
   
   if(jogando) {
   
      if(Math.abs(touch_move[0]) > Math.abs(touch_move[1])) {
      
         if(touch_move[0] < 0) {
         
            snake.vel_x = 1;
            snake.vel_y = 0;
         
         }
         
         else {
         
            snake.vel_x = -1;
            snake.vel_y = 0;
         
         };
      
      } else {
      
        if(touch_move[1] < 0) {
        
           snake.vel_x = 0;
           snake.vel_y = 1;
        
        }
        
        else {
        
           snake.vel_x = 0;
           snake.vel_y = -1;
        
        };
      
      };
   
   };
   
});
