peter_pan_song = ""; 
harry_potter_theme_song = "";
status_song_left_hand = "";
status_song_right_hand = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    peter_pan_song = loadSound("music2.mp3");
    harry_potter_theme_song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(video, 0, 0, 600, 500);

    status_song_left_hand = peter_pan_song.isPlaying();
    status_song_right_hand = harry_potter_theme_song.isPlaying();
    
    fill('#FF0000');
    stroke('#FF0000');

    if (scoreLeftWrist > 0.2) 
    {
        circle(leftWristX, leftWristY, 20);
        harry_potter_theme_song.stop(); 
        if (status_song_left_hand == false) 
        {
            peter_pan_song.play();
            document.getElementById("song").innerHTML = "PETER PEN SONG";        
        }       
    }

    if (scoreRightWrist > 0.2) 
    {
        circle(rightWristX, rightWristY, 20);
        peter_pan_song.stop();
        if (status_song_right_hand == false) 
        {
            harry_potter_theme_song.play();
            document.getElementById("song").innerHTML = "HARRY POTTER THEME SONG";            
        }        
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) 
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}