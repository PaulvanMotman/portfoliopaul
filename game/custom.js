// Initialize Firebase
var config = {
    apiKey: "AIzaSyCbc50cjw_RxosvWlHYNried8p3FkCkJu8",
    authDomain: "klik-da5aa.firebaseapp.com",
    databaseURL: "https://klik-da5aa.firebaseio.com",
    storageBucket: "klik-da5aa.appspot.com",
    messagingSenderId: "345960366975"
}

firebase.initializeApp(config);
var database = firebase.database();


function writeNewScore(username, score) {
    // A post entry.
    var userData = {
      username: username,
      score: score
    };

    // Get a key for a new Post.
    var newUserKey = firebase.database().ref().child('users').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/users/' + newUserKey] = userData;

    return firebase.database().ref().update(updates);
}


firebase.database().ref('/users/').once('value').then(function(snapshot) {
    var data = snapshot.val()

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            $( "#highscores" ).append( "<p>" + data[key].username + ": " + data[key].score + "</p>" )
        }
    }
})



var path = anime.path('#path1');
var path2 = anime.path('#path2');
var path3 = anime.path('#path3');
var path4 = anime.path('#path4');

var score = 100

var topScore = {
    users: [],
    scores: []
}

var currentUser


function blueAnimation (id) {
    return  anime({
        targets: id,
        translateX: path2,
        translateY: path2,
        rotate: {
            value: 2040,
            duration: 12000,
            easing: 'easeInOutQuad'
        },
        scale: {
            value: 0.5,
            duration: 12000,
            easing: 'easeOutBounce'
        },
        duration: 12000,
        loop: true,
        easing: 'linear',
        autoplay: false,
    });
}

function redAnimation (id) {
    return  anime({
        targets: id,
        translateX: path3,
        translateY: path3,
        rotate: {
            value: 1020,
            duration: 8000,
            easing: 'easeInOutQuad'
        },
        scale: {
            value: 2,
            duration: 8000,
            easing: 'easeOutBounce'
        },
        duration: 8000,
        loop: true,
        easing: 'linear',
        autoplay: false,
    });
}

function greenAnimation (id) {
    return  anime({
        targets: id,
        translateX: path4,
        translateY: path4,
        rotate: {
            value: 2040,
            duration: 6000,
            easing: 'easeInOutQuad'
        },
        scale: {
            value: 4,
            duration: 6000,
            easing: 'easeOutBounce'
        },
        duration: 6000,
        loop: true,
        easing: 'linear',
        autoplay: false,
    });
}

function yellowAnimation (id) {
    return  anime({
        targets: id,
        translateX: path,
        translateY: path,
        rotate: {
            value: 180,
            duration: 10000,
            easing: 'easeInOutQuad'
        },
        scale: {
            value: 0.05,
            duration: 10000,
            easing: 'easeOutBounce'
        },
        duration: 10000,
        loop: true,
        easing: 'linear',
        autoplay: false,
    });
}


function isFalse(element, index, array) { 
    return element.check == false; 
} 


var clicked = []

for (var i = 16 - 1; i >= 0; i--) {
    clicked[i] = {
        check: false,
        number: 0
    }
}



function click (click, animation) {
    if (!clicked[click].check) {
        clicked[click].check = true
        animation.play()
    } else {
        clicked[click].check = false
        clicked[click].number++
        animation.pause()
        if (clicked[click].number < 2) {
            score += 10
        }
        $('#score').html(score.toString())
        if (clicked.every(isFalse)) {
            writeNewScore(currentUser, score)
            alert("You did it! You're score is " + score)
            window.location.href = "https://www.paulvanmotman.com/game/index.html"
        }
    }
}

animations = [blueAnimation('#a'), redAnimation('#b'), greenAnimation('#c'), yellowAnimation('#d'), blueAnimation('#e'), redAnimation('#f'), greenAnimation('#g'), yellowAnimation('#h'), blueAnimation('#i'), redAnimation('#j'), greenAnimation('#k'), yellowAnimation('#l'), blueAnimation('#m'), redAnimation('#n'), greenAnimation('#o'), yellowAnimation('#p')]
selectors = ['#a', '#b', '#c', '#d', '#e', '#f', '#g', '#h', '#i', '#j', '#k', '#l', '#m', '#n', '#o', '#p']

function generate_clickfunction(i, j) {
    return function() { 
        click(i, animations[j])
    };
}

for (var i = animations.length -1; i >= 0; i--) {
    $(selectors[i]).click(generate_clickfunction(i,i))          
}


$('#start').submit(function(e) {

    e.preventDefault()

    $('#button').attr("disabled", 'disabled')

    currentUser = $('#username').val()
    console.log(currentUser)


    for (var i = animations.length -1, j = 6400 ; i >= 0, j >= 400; i--, j -= 400) {
        setTimeout(generate_clickfunction(i, i), j)   
    }

    $('#score').html('100')
   

    setInterval( function () {
        score--
        $('#score').html(score.toString())
        if (score == 0) {
            alert("Game over!")
            $("#container").hide()
            window.location.href = "https://www.paulvanmotman.com/game/index.html"
        }
    }, 1000)

})



