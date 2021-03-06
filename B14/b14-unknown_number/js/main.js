$(document).ready(function () {
    let data = getLocalStorage(LOCAL);

    let secret_number = random_number(25);
    let guess = 0;

    button_list(number_of_predict_button);
    life(life_count);

    

    getGameList(data);
    if (data.length > 0) {
        guess = data[data.length - 1].guess + 1;
        secret_number = data[data.length - 1].secret;

        if (data[data.length - 1].value == data[data.length - 1].secret)
        {
            setGameWin(guess-1, secret_number);
        }
    }

    if (data.length > life_count-1 && data[data.length - 1].value != data[data.length - 1].secret) 
    {
        setGameLose(secret_number);
    }
    
    console.log("load", data);
    console.log("secret", secret_number);
    console.log("gues", guess);

    //number button
    $(".btn-number").click(function (e) {
        e.preventDefault();
        let val = $(this).val();

        console.log(val);
        game_predict_number.html(val);

        let obj = {
            guess: guess,
            value: val,
            secret: secret_number,
        };

        data.push(obj);

        console.log("data:", data);

        if (guess < life_count) {
            getGameList(data);

            console.log("try:", guess);
            guess++;
            console.log("try2:", guess);
            if (obj.value == obj.secret) {
                setGameWin(obj.guess, obj.secret);
            }
        }
        if (guess >= life_count && obj.value != obj.secret) {
            setGameLose(obj.secret);
        }
    });

    //play again  button
    btn_restart.click(function (e) {
        e.preventDefault();
        setResetGame();
        secret_number = random_number(25);
        console.log("secret", secret_number);
        data = [];
        setLocalStorage(LOCAL, data);
        guess = 0;
        $('.btn-number').css('box-shadow',"")
        alert("Restart the game!")
    });

    //hint button
    btn_hint.click(function (e) {
        e.preventDefault();
        let val = game_predict_number.html();

        console.log("hint value",val);
        if (val > secret_number) {
            for (let i = val - 1; i <= number_of_predict_button; i++) {
                $(".hint-number").eq(i).prop("disabled", true);
            }
        } else if (val < secret_number) {
            for (let i = 0; i < val; i++) {
                $(".hint-number").eq(i).prop("disabled", true);
            }
        }
    });

    //save button
    btn_save.click(function (e) {
        e.preventDefault();
        console.log("save game:", data);
        setLocalStorage(LOCAL, data);
        alert("Save success!")
    });
});
