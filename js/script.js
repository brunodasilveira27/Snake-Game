const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');
const game_scores = document.querySelector('#game-scores');

let box_size = 0;
let box_qt = 40;
let scores = 0;

function resize() {

  const game_container = document.querySelector('.game-container');
  
  const game_containerWidth = getComputedStyle(game_container).width.replace('px', '');
        canvas.width = game_containerWidth;
        canvas.height = game_containerWidth;
  
  box_size = canvas.width / box_qt;
  
};

const canvas_color = '#F5FFFA';

const snake = {

  color : '#000',
  pos_x : 1,
  pos_y : 1,
  vel: {
  
    x: 0,
    y: 0,
  
  },
  
  trail: [],
  tail: 2
  
};

const food = {

  color : '#FF0000',
  pos_x: 0,
  pos_y: 0,
  
  pos() {
  
    this.pos_x = Math.floor(Math.random() * box_qt);
    this.pos_y = Math.floor(Math.random() * box_qt);
  
  }

};

function loop() {

  update();

};

function update() {

  snake.pos_x += snake.vel.x;
  snake.pos_y += snake.vel.y;
  
  ctx.fillStyle = canvas_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  if(snake.pos_x > box_qt) {
  
     snake.pos_x = 0;
     
  }
  
  else if(snake.pos_x < 0) {
  
     snake.pos_x = box_qt;
  
  };
  
  if(snake.pos_y > box_qt) {
  
     snake.pos_y = 0;
  
  }
  
  else if(snake.pos_y < 0) {
  
     snake.pos_y = box_qt;
  
  };
  
  ctx.fillStyle = snake.color;
  
  for(let i = 0; i < snake.trail.length; i++) {
  
      ctx.fillRect(snake.trail[i].x * box_size, snake.trail[i].y * box_size, box_size, box_size);
      
        if(snake.pos_x === food.pos_x && snake.pos_y === food.pos_y) {
        
           scores += 1;
           snake.tail += 1;
           game_scores.innerText = scores;
           food.pos();
        
        };
  
  };
  
  snake.trail.push({
  
    x: snake.pos_x,
    y: snake.pos_y,
  
  });
  
  while(snake.trail.length > snake.tail) {
  
        snake.trail.shift();
  
  };
  
  ctx.fillStyle = food.color;
  ctx.fillRect(food.pos_x * box_size, food.pos_y * box_size, box_size, box_size);

};

window.onload = function() {

  resize();
  food.pos();
  
  let fps = 1000 / 20;
  setInterval(loop, fps);

};

window.addEventListener('resize', resize);

let touch_start = [];
let touch_move = [];

window.addEventListener('touchstart', function(e) {

  touch_start = [e.touches[0].pageX, e.touches[0].pageY];

});

window.addEventListener('touchmove', function(e) {

   touch_move = [touch_start[0] - e.touches[0].pageX, touch_start[1] - e.touches[0].pageY];
   
     if(Math.abs(touch_move[0]) > Math.abs(touch_move[1])) {
     
        if(touch_move[0] < 0) {
        
           snake.vel.x = 1;
           snake.vel.y = 0;
        
        }
        
        else {
        
           snake.vel.x = -1;
           snake.vel.y = 0;
        
        };
     
     }
     
     else {
     
         if(touch_move[1] > 0) {
         
            snake.vel.x = 0;
            snake.vel.y = -1;
            
         }
         
         else {
         
            snake.vel.x = 0;
            snake.vel.y = 1;
         
         };
     
     };

});