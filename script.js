var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
            // console.log(xhttp.responseText)
            const data = JSON.parse(xhttp.responseText);
            console.log(data)
            const container = document.getElementById('container')
            const rows = data.map(row => {
                if (!row.tags) {
                    return {...row, tags: []}
                } else if (!Array.isArray(row.tags)) {
                    return {...row, tags: Object.values(row.tags)}
                }
                return row
            })
            rows.slice(1).forEach((row, i) => {
                const rowDiv = document.createElement('div')
                rowDiv.classList.add('row')
                rowDiv.innerHTML = `
                <div class='logo-section'>
                    <img class='logo' src=${row.logo}>
                </div>
                <div class='left-section'>
                    <h5 class='company'>${row.company}</h5>
                    <h3 class='position'>${row.position}</h3>
                    <p class='location'>${row.location}</p>
                </div>
                <div class='mid-section'>
                    ${row.tags.map(tag => {
                        return `<div class='tag'>${tag}</div>`
                    }).join('')}
                </div>
                <div class='right-mid-section'>
                    ${new Date(row.date).toLocaleString()}
                </div>
                <div class='right-section'>
                    <a href=${row.url} target='_blank'
                        <button class='apply'>Apply</button>
                    </a>
                </div>
                `
                container.appendChild(rowDiv)
            })
        }
    };
    xhttp.open("GET", "https://remoteok.com/api?tag=css", true);
xhttp.send();