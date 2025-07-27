function goToStep2() {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.remove("hidden");
}
function showConfirm() {
    document.getElementById("step2").classList.add("hidden");
    document.getElementById("confirm1").classList.remove("hidden");
}


function goToStep3() {
    document.getElementById("confirm1").classList.add("hidden");
    document.getElementById("step3").classList.remove("hidden");
}

function startLove() {
    document.getElementById("step3").classList.add("hidden");
    document.getElementById("loveContainer").classList.remove("hidden");
    crtLoveTL();
}

const crtLoveTL = () => {
    const move = 1000;
    const easing = "sin.inOut";
    const delta = 100;

    const letters = document.querySelectorAll(".letter, .heart");
    const leftLine = document.querySelector(".left-line");
    const rightLine = document.querySelector(".right-line");

    const tl = new mojs.Timeline();

    // Shrink lines
    tl.add(
        new mojs.Html({
            el: leftLine,
            duration: move,
            easing,
            width: { 40: 0 },
        }),
        new mojs.Html({
            el: rightLine,
            duration: move,
            easing,
            width: { 40: 0 },
        })
    );

    // Fade out letters one by one
    letters.forEach((el, i) => {
        tl.add(
            new mojs.Html({
                el,
                duration: 400,
                delay: move + i * delta,
                opacity: { 1: 0 },
            })
        );
    });

    tl.play();
    for (let i = 0; i < 5; i++) {
        new mojs.Burst({
            left: 0,
            top: 0,
            x: `${20 + i * 15}%`,
            y: '50%',
            radius: { 0: 100 },
            count: 10,
            children: {
                shape: 'circle',
                radius: 10,
                fill: 'red',
                strokeWidth: 2,
                duration: 1500,
                easing: 'quad.out',
            }
        }).play();
    }

    // بعد آخر حرف يختفي، أظهر الورد
    setTimeout(() => {
        document.getElementById("flowers").classList.remove("hidden");
    }, move + letters.length * delta + 400);
};
