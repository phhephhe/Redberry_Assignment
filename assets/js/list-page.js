const laptopsList = document.getElementById('laptops-list');

fetch('https://pcfy.redberryinternship.ge/api/laptops?token=f82b277af6d81d49299fb1a624ba7c92')
    .then(response => response.json())
    .then(data => {
        data.data.forEach(item => {
            const laptopContainer = document.createElement('div');
            laptopContainer.classList.add('grid-item');

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('left-row');
            laptopContainer.appendChild(imgContainer);
            const img = document.createElement('img');
            img.src = 'https://pcfy.redberryinternship.ge' + item.laptop.image;
            img.classList.add('computer-img');
            imgContainer.appendChild(img);

            const laptopInfoContainer = document.createElement('div');
            laptopInfoContainer.classList.add('right-row');
            laptopContainer.appendChild(laptopInfoContainer);

            const pcNames = document.createElement('div');
            pcNames.classList.add('user-pc-names');
            const pUserName = document.createElement('p');
            const pLaptopName = document.createElement('p');
            pUserName.innerHTML = item.user.name;
            pLaptopName.innerHTML = item.laptop.name;
            pcNames.appendChild(pUserName);
            pcNames.appendChild(pLaptopName);
            laptopInfoContainer.appendChild(pcNames);
            
            const linkContainer = document.createElement('div');
            laptopInfoContainer.appendChild(linkContainer);
            const link = document.createElement('button');
            link.innerHTML = 'მეტის ნახვა';
            link.classList.add('see-more');
            linkContainer.appendChild(link);

            link.addEventListener('click', () => {
                localStorage.setItem('laptopId', item.laptop.id);
                window.location.href = "laptop-info.html";
            })
            laptopsList.appendChild(laptopContainer);
        })
    });

