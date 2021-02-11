/**
 *  Listener event for when the user chooses a charater and wants to continue
 */
$('#aang-appa').click(() => {
    // Hide and show elements accordingly
    const character = $('select option:selected').text();
    $('.select').remove();
    $('#instructions').remove();
    $('#aang-appa-figure').remove();
    $('#aang-appa').remove();
    $('#loadingFigure').addClass('mb-6').css('display', 'inline-block');
    $('#loadingText').css('display', 'block');

    // Request Options
    const requestOptions = {
        body: JSON.stringify({
            character: character,
        }),
        method: 'POST',
        redirect: 'follow',
    };

    // Request to the server
    fetch(`http://localhost:3000/dev/character`, requestOptions)
        .then((response) => response.text())
        .then((res) => {
            sessionStorage.setItem('characterItem', res);
            document.location.href = 'character.html';
        })
        .catch((error) => console.log('error', error));
});
