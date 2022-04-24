song="";

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

leftWrist_Score=0;
rightWrist_Score=0;

function preload(){

song=loadSound("music.mp3");

}

function setup(){

    canvas=createCanvas(600,500);
    canvas.position(660,300);

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded(){

    console.log("PoseNet is initialized");

}

function gotPoses(results){

    if(results.length>0){

        console.log(results);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left wrist x = "+leftWristX+", left wrist y = "+leftWristY);
    
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right wrist x = "+rightWristX+", right wrist y = "+rightWristY);

        leftWrist_Score=results[0].pose.keypoints[9].score;
        rightWrist_Score=results[0].pose.keypoints[10].score;
        console.log("Left wrist score = "+leftWrist_Score+", right wrist score = "+rightWrist_Score);

    }

}

function draw(){

    image(video,0,0,600,500);

    fill("#ff647b");
    stroke("#ff647b");
    if(leftWrist_Score>0.2){

        circle(leftWristX,leftWristY,20);

        NumberLeftWristY=Number(leftWristY);
        removed_decimals=floor(NumberLeftWristY);
        volume=removed_decimals/500;
        document.getElementById("volume").innerHTML="Volume ="+volume;
        song.setVolume(volume);

    }
    if(rightWrist_Score>0.2){

        circle(rightWristX,rightWristY,20);

        if(rightWristY>0 && rightWristY<=100){

            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);

        }
        else if(rightWristY>100 && rightWristY<=200){

            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);

        }
        else if(rightWristY>200 && rightWristY<=300){

            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);

        }
        else if(rightWristY>300 && rightWristY<=400){

            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);

        }
        else if(rightWristY>400 && rightWristY<=500){

            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);

        }

    }
    




}

function play(){

    song.play();
    song.setVolume(1);
    song.rate(1);
    console.log("SONG HAS STARTED");

}

