/**
 *  Listener event for when the user chooses a charater and wants to continue
 */
$('#aang-appa').click(() => {
    // Hide and show elements accordingly
    $('.select').remove();
    $('#instructions').remove();
    $('#aang-appa-figure').remove();
    $('#aang-appa').remove();
    $('#loadingFigure').addClass('mb-6');
    $('#loadingFigure').css('display', 'inline-block');
    $('#loadingText').css('display', 'block');

    // Request Options
    const requestOptions = {
        body: {
            character: $('select option:selected').text(),
        },
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    };

    // Request to the server
    fetch(`https://y0u5xf98u9.execute-api.us-east-1.amazonaws.com/dev/character`, requestOptions)
        .then((response) => response.text())
        .then((res) => {
            sessionStorage.setItem('characterItem', res);
            document.location.href = 'character.html';
        })
        .catch((error) => console.log('error', error));
});
