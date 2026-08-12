# Physics Simulator

A mobile-friendly **2D physics simulator** built with **HTML, CSS, and JavaScript**. The simulator lets you experiment with gravity, bouncing balls, shrinking boundaries, circular physics, and different game modes.

## Features

- # 🏀 Real-time ball physics
- # 🌍 **Shrinking World Mode**
  - The border shrinks when the ball reaches it.
  - The ball shrinks along with the world.
- # 🌀 **Escape Loop Mode**
  - Circular physics arena.
  - Rotating circular border.
  - Rotating escape opening.
  - Balls can escape through the opening.
  - Escaped balls are replaced by new balls.
- # 🎨 Different ball colours
  - The first ball starts orange.
  - Duplicated balls receive random colours.
- # 💥 Ball-to-ball collisions
  - Balls cannot pass through each other.
  - Elastic collisions are simulated.
- # 🔊 Physics sounds
  - Bounce/collision sounds.
- # 🌙 Dark and Light themes
  - Border colours automatically adapt to the selected theme.
- # ⚙️ Settings menu
- # 📱 Mobile-friendly design
- # 🧩 Modular JavaScript
  - Physics logic
  - Motion logic
  - Main application logic
  - Escape mode logic are separated into different files.

## Modes

### # 1. Shrinking World

The simulator starts with a bouncing ball inside a bounded world.

Whenever the ball reaches the boundary, the world becomes smaller. The ball also shrinks so that it continues to fit inside the shrinking area.

The world does **not** continuously shrink automatically — shrinking is triggered by the ball interacting with the boundary.

### # 2. Escape Loop

Escape Loop uses a circular arena instead of a rectangular one.

The circular border rotates, and a small opening rotates along with it.

The balls:

- # Bounce off the circular border.
- # Collide with each other.
- # Pass through the opening.
- # Escape the circular arena.
- # Cause new balls to spawn when they escape.
- # Receive random colours when duplicated.

The first ball always starts **orange**.

## Controls

The simulator is designed primarily for **mobile/touch devices**, while also working on desktop browsers.

Use the available interface buttons and settings to:

- # Switch modes.
- # Open settings.
- # Change the theme.
- # Reset the simulator.

# [🔴 Live Demo](https://thatonehtmlguy.github.io/Ball-Physics-Simulator/)


## Project Structure

```text
Physics-Simulator/
│
├── index.html
├── style.css
│
├── main.js
├── physics.js
├── motion.js
├── escape.js
│
└── sounds/
    └── bounce.ogg
```

## Technologies

- # HTML5
- # CSS3
- # JavaScript
- # HTML Canvas
- # ES Modules
- # Web Audio / HTML Audio

## Physics

The simulator uses basic physics concepts including:

- # Gravity
- # Velocity
- # Acceleration
- # Reflection
- # Elastic collisions
- # Circular boundaries
- # Relative velocity
- # Ball separation
- # Boundary detection

## Themes

### # Dark Mode

The circular Escape Loop border is displayed in **white**.

### # Light Mode

The circular Escape Loop border changes to **black**.

The canvas background can remain transparent so the simulator integrates with the page theme.

## Sound

The simulator uses:

```text
sounds/bounce.ogg
```

The sound can be triggered when:

- # A ball hits the boundary.
- # Two balls collide.

## Customisation

You can customise the simulator by changing values in `escape.js`.

For example, ball size:

```js
const ESCAPE_BALL_RADIUS = 20;
```

Circle rotation speed:

```js
const CIRCLE_ROTATION_SPEED = 0.01;
```

Opening size:

```js
const openingAngle = 34 * Math.PI / 180;
```

Border thickness:

```js
const BORDER_WIDTH = 4;
```

Ball colours:

```js
const BALL_COLORS = [
  'orange',
  'red',
  'blue',
  'lime',
  'purple',
  'cyan',
  'yellow',
  'pink'
];
```
