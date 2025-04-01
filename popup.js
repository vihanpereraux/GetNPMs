document.getElementById('searchInput').addEventListener('input', function (event) {
    const query = event.target.value.trim();
    const resultsDiv = document.getElementById('results');

    if (query.length === 0) {
        resultsDiv.innerHTML = '';
        return;
    }

    fetch(`https://registry.npmjs.org/-/v1/search?text=${query}&size=12`)
        .then(response => response.json())
        .then(data => {
            resultsDiv.innerHTML = '';
            data.objects.forEach(item => {
                const packageDiv = document.createElement('div');
                packageDiv.className = 'package';

                // name
                const nameDiv = document.createElement('div');
                nameDiv.className = 'name';
                nameDiv.textContent = 'npm i ' + item.package.name;
                packageDiv.appendChild(nameDiv);

                // description
                const descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'description';
                descriptionDiv.textContent = item.package.description;
                packageDiv.appendChild(descriptionDiv);

                // downlaods
                const downloadsDiv = document.createElement('div');
                downloadsDiv.className = 'downlaods';
                downloadsDiv.textContent = item.downloads.weekly + ' weekly downloads';
                packageDiv.appendChild(downloadsDiv);

                resultsDiv.appendChild(packageDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

