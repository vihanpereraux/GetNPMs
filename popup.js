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
                packageDiv.textContent = item.package.name;
                packageDiv.addEventListener('click', () => {
                    alert(`Selected: ${item.package.name}\nDescription: ${item.package.description}`);
                });
                resultsDiv.appendChild(packageDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});