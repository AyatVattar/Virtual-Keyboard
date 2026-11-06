


document.addEventListener("DOMContentLoaded", ()=>{
const input = document.getElementById("input-field");
const keys = document.querySelectorAll(".key");


let shiftActive = false;
let capsActive = false;




function insertText(text) {

    const start = input.selectionStart;
    const end = input.selectionEnd;

    input.setRangeText(text, start, end, "end");

    input.focus();
}



keys.forEach(key => {

    key.addEventListener("click", () => {

        const action = key.dataset.action;


        if (action === "backspace") {

            const start = input.selectionStart;
            const end = input.selectionEnd;

            if (start === end && start > 0) {
                input.setRangeText("", start - 1, end, "end");
            } else if (start !== end) {
                input.setRangeText("", start, end, "end");
            }

            input.focus();
            return;
        }


        if (action === "shift") {

            shiftActive = !shiftActive;

            document.querySelectorAll('[data-action="shift"]')
                .forEach(btn => {
                    btn.classList.toggle("active", shiftActive);
                });

            return;
        }


        if (action === "caps") {

            capsActive = !capsActive;

            key.classList.toggle("active", capsActive);

            return;
        }


        if (action === "enter") {

            insertText("\n");
            return;
        }


        if (action === "escape") {

            input.blur();
            return;
        }


        if (action === "modifier") {

            key.classList.toggle("active");
            return;
        }


        if (key.dataset.letter) {

            let letter = key.dataset.letter;

            if (capsActive !== shiftActive) {
                letter = letter.toUpperCase();
            }

            insertText(letter);

            if (shiftActive) {
                shiftActive = false;

                document.querySelectorAll('[data-action="shift"]')
                    .forEach(btn => btn.classList.remove("active"));
            }

            return;
        }

        if (key.dataset.value !== undefined) {

            let value = key.dataset.value;

            if (shiftActive && key.dataset.shift !== undefined) {
                value = key.dataset.shift;
            }

            insertText(value);

            if (shiftActive) {

                shiftActive = false;

                document.querySelectorAll('[data-action="shift"]')
                    .forEach(btn => btn.classList.remove("active"));
            }

        }

    });

});

    
});
