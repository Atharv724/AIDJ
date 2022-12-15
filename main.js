song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
function preload(){
    song = loadSound("actualmusic.mp3");
}

function setup(){
    canvas = createCanvas(450, 400);
    canvas.center();
    webcam = createCapture(VIDEO);
    webcam.hide();
    posenet = ml5.poseNet(webcam, ModelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    image(webcam, 0, 0, 450, 400);
    
    fill("red");
    stroke("red");

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY >100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightWristY >200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY >300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightWristY >400){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function ModelLoaded(){
    console.log("model has been loaded");
}

function gotPoses(result){
    if(result.length > 0){
        console.log(result);
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        scoreLeftWrist = result[0].pose.keypoints[9].score;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
        scoreRightWrist = result[0].pose.keypoints[10].score;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}