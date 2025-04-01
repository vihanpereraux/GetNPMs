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

                // visit npm site
                const npmLogoWrapper = document.createElement('a');
                npmLogoWrapper.className = 'explore';
                // npm site link
                const npmLogoImg = document.createElement('img');
                npmLogoImg.src = "https://img.shields.io/badge/Explore%20on%20NPM-CC3534?style=flat&logo=npm&logoColor=white";
                npmLogoImg.alt = "Explore on NPM";
                npmLogoWrapper.appendChild(npmLogoImg);
                npmLogoWrapper.style.textDecoration = 'none';
                npmLogoWrapper.href = item.package.links.npm;
                npmLogoWrapper.target = '_blank';
                packageDiv.appendChild(npmLogoWrapper);

                // visit github repository
                const ghLogoWrapper = document.createElement('a');
                ghLogoWrapper.className = 'explore';
                ghLogoWrapper.style.marginLeft = '5px';
                // github repository link
                const ghLogoImg = document.createElement('img');
                ghLogoImg.src = "https://img.shields.io/badge/Explore%20on%20GitHub-181717?style=flat&logo=github&logoColor=white";
                ghLogoImg.alt = "Explore on GitHub";
                ghLogoWrapper.appendChild(ghLogoImg);
                ghLogoWrapper.style.textDecoration = 'none';
                ghLogoWrapper.href = item.package.links.repository;
                ghLogoWrapper.target = '_blank';
                packageDiv.appendChild(ghLogoWrapper);

                resultsDiv.appendChild(packageDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

