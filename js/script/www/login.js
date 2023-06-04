document.addEventListener('DOMContentLoaded', function () {
    var userData = validateUserDataFromCookie();
    var loadingContainer = document.getElementById('loadingContainer');
    var loginContainer = document.getElementById('loginContainer');
    var profilePictureContainer = document.getElementById('profilePicture');

    var currentUrl = window.location.href;
    var loginUrl = 'https://accounts.yeahgames.net/login?continue=' + encodeURIComponent(currentUrl);

    if (userData) {
        var profilePicture = document.createElement('img');
        profilePicture.src = 'https://ugc.yeahgames.net/profile/p/default/png/@' + userData.username + '.png';
        profilePicture.alt = 'Profile picture';
        profilePicture.title = '@' + userData.username + '\'s network account.';
        profilePicture.classList.add('rounded-full', 'profile-picture', 'float-right');
        profilePicture.addEventListener('error', function () {
            profilePicture.src = 'https://ugc.yeahgames.net/profile/p/default/png/default.png'; // Default profile picture
        });

        var dropdownMenu = document.createElement('div');
        dropdownMenu.id = 'dropdownMenu';
        dropdownMenu.classList.add('dropdown-menu', 'profilemenu');

        var dropdownItems = [
            { text: 'Profile', link: 'https://members.yeahgames.net/@' + userData.username },
            { text: 'Settings', link: 'https://settings.yeahgames.net' },
            { text: 'Log out', link: 'https://accounts.yeahgames.net/logout?continue=' + encodeURIComponent(currentUrl) }
        ];

        dropdownItems.forEach(function (item) {
            var dropdownItem = document.createElement('a');
            dropdownItem.href = item.link;
            dropdownItem.classList.add('dropdown-item');
            dropdownItem.innerHTML = item.text;
            dropdownMenu.appendChild(dropdownItem);
        });

        profilePictureContainer.appendChild(profilePicture);
        document.querySelector('nav').insertAdjacentElement('afterend', dropdownMenu);

        profilePicture.addEventListener('click', function (event) {
            event.preventDefault();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', function (event) {
            var targetElement = event.target;
            if (!dropdownMenu.contains(targetElement) && !profilePicture.contains(targetElement)) {
                dropdownMenu.classList.remove('show');
            }
        });

        loadingContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    } else {
        var loginButton = document.createElement('a');
        loginButton.href = loginUrl;
        loginButton.id = 'loginButton';
        loginButton.classList.add('bgyg', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'float-right');
        loginButton.innerHTML = '<i class="fas fa-key"></i>&#160; Login';
        loginButton.title = 'Log into your centralized yEAh Network account for use across the network, or create one if you haven\'t already.';

        loginContainer.style.display = 'none';

        loadingContainer.innerHTML = '<div class="loading-spinner"></div>';

        setTimeout(function () {
            loadingContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        }, 1000);

        loginContainer.appendChild(loginButton);
    }
});