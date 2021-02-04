/**
 * Loads info from CharacterItem in sessionStorage and displays it
 */
function loadCharacterDetails() {
    let character = JSON.parse(sessionStorage.getItem('characterItem'));

    $('#characterImg').attr('src', `./assets/img/${character.name}.png`);
    $('#characterName').html(character.name);
    $('#characterNationality').html(`Nationality: ${character.nationality}`);
    $('#characterEthnicity').html(`Ethnicity: ${character.ethnicity}`);
    $('#characterEyeColour').html(`Eye Colour: ${character.eyeColour}`);
    $('#characterLoveInterest').html(`Love Interest: ${character.loveInterest}`);
    $('#characterWeaponOfChoice').html(`Weapon of Choice: ${character.weaponOfChoice}`);

    if ($('#characterLoveInterest').text() == 'Love Interest: undefined') {
        $('#characterLoveInterest').text('Love Interest:  None');
    }
}
