const container = document.getElementById("container");

const fillCalendar = function (BIRTHDATE) {
    const NUM_YEARS = 80;

    const table = document.createElement("table");
    table.className = "calendar";

    const tbody = document.createElement("tbody");

    table.appendChild(tbody);

    document.getElementById("calendar-contain").appendChild(table);

    const header = document.createElement("tr");
    header.className = "header";

    for (let i = 0; i < NUM_YEARS; ++i) {
        const th = document.createElement("th");
        th.innerText = i + 1;
        th.style.visibility = ((i + 1) % 5 == 0 || i == 0) ? "visible" : "hidden";

        header.appendChild(th);
    }

    tbody.appendChild(header);

    const weeksElapsed = weeksBetween(BIRTHDATE, new Date());
    const elapsedPercentage = Math.round((weeksElapsed / (NUM_YEARS * 52)) * 1000) / 10;
    const remainPercentage = Math.round((1 - (weeksElapsed / (NUM_YEARS * 52))) * 1000) / 10;

    document.getElementById("weeks-elapsed").innerText = `You have been alive for ${weeksElapsed} weeks.`;

    for (let i = 0; i < 52; ++i) {
        const row = document.createElement("tr");

        for (let j = 0; j < NUM_YEARS; ++j) {
            const day = document.createElement("td");
            row.appendChild(day);

            if (j < Math.floor(weeksElapsed / 52)) {
                day.className = "filled";
            } else if (j == Math.floor(weeksElapsed / 52) && i < weeksElapsed % 52) {
                day.className = "filled";
            }
        }

        tbody.appendChild(row);
    }

    function weeksBetween(d1, d2) {
        return Math.floor((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    }

    let showElapsed = true;

    function updatePercent() {
        if (showElapsed) {
            document.getElementById("percent").innerText = `you have spent ${elapsedPercentage}% of your life.`;
        } else {
            document.getElementById("percent").innerText = `you have ${remainPercentage}% of your life remaining.`;
        }
    }

    document.getElementById("percent").addEventListener("click", () => {
        showElapsed = !showElapsed;
        updatePercent();
    });

    updatePercent();
};

(function() {
    const dateInput = document.getElementById("birthday");
    const pickScreen = document.getElementById("birthdate-pick");

    if(getCookie().birthday) {
        fillCalendar(new Date(getCookie().birthday));
        pickScreen.style.display = "none";
        pickScreen.style.opacity = 0;
    } else {
        document.getElementById("submit").addEventListener("click", () => {
            const date = dateInput.valueAsDate;
            fillCalendar(date);
            setCookie(date);

            pickScreen.style.opacity = 0;
            setTimeout(() => pickScreen.style.display = "none", 700);
        });
    }

    document.getElementById("reset").addEventListener("click", () => {
        document.cookie = "";
        location.reload();
    });

    function setCookie(birthday) {
        const cookie = {
            birthday: birthday
        };

        document.cookie = JSON.stringify(cookie);
    }

    function getCookie() {
        return JSON.parse(document.cookie || "{}");
    }
})();