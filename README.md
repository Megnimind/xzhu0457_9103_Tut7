# Creative Coding Major Project - IDED9103

## Project Overview
As part of our major project in Creative Coding, our group has chosen an artwork to represent through code. This task involves analyzing the selected artwork's characteristics and employing coding techniques to create a digital interpretation.

### Selected Artwork
![Selected Artwork](https://static01.nyt.com/images/2019/06/07/arts/07mondrain-moma3/07mondrain-moma3-superJumbo.jpg)

### Artwork Analysis
Broadway Boogie Woogie is a work of art that is constructed from colorful rectangular segments that resemble the rhythms of jazz music, along with clean lines like those of a street, and the concept of his work is based on the transportation network of New York City in the 1940s.

### Inspiration
For inspiration and references, we explored various digital artworks and coding projects. [That Creative Code Page](https://available-anaconda-10d.notion.site/That-Creative-Code-Page-c5550ef2f7574126bdc77b09ed76651b) and [p5.js](https://p5js.org/examples/) galleries provided great insights into what's possible with creative coding.

### Related works website
Computer-generated artwork in the style of Victory Boogie Woogie: https://hegl.mathi.uni-heidelberg.de/generating-victory-boogie-woogie-by-piet-mondrian/

Dynamische Broadway Boogie Woogie: https://doc.gold.ac.uk/compartsblog/index.php/work/broadway-boogie-woogie/

Abstract Art: https://www.payette.com/cool-stuff/exploration-computational-art/


## About Me
**Name:** Xiaodong Zhu  
**Course:** IDED9103 Creative Coding  
**Institution:** University of Sydney

## Final work

### Artwork picture
![Piet Mondrian (Line work)](https://www.payette.com/wp-content/uploads/2021/05/untitled-1-1920x1920.jpg)

![Piet Mondrian (Art)](https://hegl.mathi.uni-heidelberg.de/wp-content/uploads/2023/09/image8-1536x865.png)

![Victory Boogie Woogie (cells technical)](https://hegl.mathi.uni-heidelberg.de/wp-content/uploads/2023/09/image3-300x300.png)

![House with Four Walls (for loop)](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6673f949-3f54-4267-b357-9469cf6a509e_292x296.gif)

### Techniques
In my personal iteration, I mainly used audio techniques to create the animation: using the level or frequency of the audio track to make the content of the screen jump and eventually follow the rhythm of the animation. Both Perlin noise and randomness techniques were used; Perlin noise was used to drive the extended generation of colored squares in the canvas, ensuring that the squares generated had a natural randomness and continuity. In addition, randomness is achieved by randomly generating the color and position of the squares. It is also simple to incorporate user input techniques: refresh the screen by tapping on the start of the screen or a space. As well as a time-based technique to start generating the next extension, these extensions use for loops to generate lines, colored squares, and at the end to make the colored squares scroll from left to right or bottom to top, thus going off the canvas and spreading across the screen. I didn't use any unexpected techniques to realize my work, but I did refer to and try to introduce algorithms such as L-Systems or Hilbert Curve to generate more complex geometries, and although the resulting work is not ideal, it is still an interesting experiment. 

### Technical references used
Audio: https://p5js.org/reference/#/libraries/p5.sound
Time-Based: https://p5js.org/reference/#/p5.MediaElement/time
Perlin noise and randomness: https://p5js.org/reference/#/p5/noise
For Loops: https://p5js.org/reference/#/p5/for

### Technical inspiration reference
L-Systems: https://p5js.org/zh-Hans/examples/simulate-l-systems.html
Hilbert Curve: https://editor.p5js.org/codingtrain/sketches/LPf9PLmp
Cells: https://editor.p5js.org/ejuo/sketches/ZJqQ68_ez
Examples of Cells technology similar to this work: https://hegl.mathi.uni-heidelberg.de/generating-victory-boogie-woogie-by-piet-mondrian/
Some another fun art: https://codeswitchstudio.com/?p=2396

### Application method:
Use createCanvas() and setup() to configure and split the grid system of the canvas and add a for loop traversal of each cell to create random squares as the basis of the image. At the same time, we can use the color array to add the basic colors that Mondrian used, with (red, yellow, blue) as the main colors and the non-colors (black, white, gray) to form the Broadway color function. This array through the random function to randomly select the color and fill each cell with a random color, thus dynamically generating the screen. And by adjusting the gridSize to adapt to different screen sizes, to ensure that the artwork can be displayed correctly on any device!

### How to interact with the work:
The initial stage can be started by tapping the center of the screen to play audio, the first step of the animation is to randomly generate 50 lines in a set canvas area of 650x690 pixels by the rhythm of the music, and after the completion of the generation will continue to randomly generate the basic colors of Mondrian's main colors (red, yellow, blue, black, white, grey) to form a random Broadway canvas within the range of a for loop. The color function will continue to generate small squares of Mondrian's basic colors (red, yellow, blue, black, white, and gray), which will be stacked on top of each other to create a set of large squares. After the cubes have been generated for 17 seconds, a grid of cubes is randomly refreshed on the screen from left to right and bottom to top, until the entire screen is filled, and can eventually be cleared by a space to restart generation.  I wanted to use this basic color overlay pattern to understand and construct the visual language that the original author wanted to express. 

