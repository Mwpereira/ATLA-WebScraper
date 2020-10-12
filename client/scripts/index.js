//Listener event for when the user chooses a charater and wants to continue
$("#aang-appa").click(function () {

    //Gets character chosen
    let character = $("#charactersList option:selected").text();

    //Corrects path for URL
    if(character == 'Ty Lee'){
        character = 'Ty_Lee';
    }

    //Hide and show elements accordingly
    $("#charactersList").css("display", "none");
    $("#instructions").css("display", "none");
    $("#aang-appa").css("display", "none");
    $("#loadingGif").css("display", "block");
    $("#loadingText").css("display", "block");
    
    //Request Options
    var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
            "Access-Control-Origin":"*"
        }
    };
    
    //Request to the server
    fetch(`http://localhost:8080?data=${character}`, requestOptions)
        .then(response => response.text())
        .then(res => {
            sessionStorage.setItem('characterItem', res);
            document.location.href = 'character.html';
        })
        .catch(error => console.log('error', error));       
});  