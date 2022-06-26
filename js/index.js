const daily = document.querySelector('.daily_toggle');
const weekly = document.querySelector('.weekly_toggle');
const monthly = document.querySelector('.monthly_toggle');
const displayData = document.querySelectorAll('.info')


async function getData(file) {
    const rawData = await fetch(file)
    const jsonData = await rawData.json()
    for (let i = 0; i < jsonData.length; i++) {
        const workingData = jsonData[i];
        const wrapper = document.createElement('div')
        const displayTitle = document.createElement('h2')
        const displayCurrent = document.createElement('h3')
        const displayPrevious = document.createElement('p')
        displayData[i].append(wrapper)
        wrapper.append(displayTitle)
        wrapper.append(displayCurrent)
        displayData[i].append(displayPrevious)

        function weeklyInfo() {
            weekly.id = "active";
            daily.id = "";
            monthly.id = "";
            displayTitle.innerText = workingData.title;
            displayCurrent.innerText = workingData.timeframes.weekly.current + "hrs";
            displayPrevious.innerText = "Last week - " + workingData.timeframes.weekly.previous + "hrs";
        }

        function dailyInfo() {
            daily.id = "active";
            monthly.id = "";
            weekly.id = "";
            displayTitle.innerText = workingData.title;
            displayCurrent.innerText = workingData.timeframes.daily.current + "hrs";
            displayPrevious.innerText = "Yesterday - " + workingData.timeframes.daily.previous + "hrs";
        }

        function monthlyInfo() {
            monthly.id = "active";
            daily.id = "";
            weekly.id = "";
            displayTitle.innerText = workingData.title;
            displayCurrent.innerText = workingData.timeframes.monthly.current + "hrs";
            displayPrevious.innerText = "Last Month - " + workingData.timeframes.monthly.previous + "hrs";
        }

        weekly.addEventListener('click', () => {
            weeklyInfo()
        })
        daily.addEventListener('click', () => {
            dailyInfo()
        })
        monthly.addEventListener('click', () => {
            monthlyInfo()
        })
        dailyInfo()
    }
}

getData('./api/data.json')