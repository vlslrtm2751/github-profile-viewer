# GitHub Profile Viewer

A web application that allows you to search and view GitHub user profiles, including their repositories, statistics, and activity.

## Features

- 🔍 Search any GitHub user by username
- 👤 View user profile details (avatar, bio, location, website, company)
- 📊 Display user statistics (followers, following, public repositories)
- 📁 Browse a user's public repositories with details (stars, forks, language, description)
- 🔗 Direct links to GitHub profiles and repositories

## Demo

Enter a GitHub username in the search bar to fetch and display the user's profile information along with their public repositories.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- [GitHub REST API](https://docs.github.com/en/rest)

## Getting Started

### Prerequisites

- A modern web browser
- Internet connection (to access the GitHub API)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vlslrtm2751/github-profile-viewer.git
   ```

2. Navigate into the project directory:
   ```bash
   cd github-profile-viewer
   ```

3. Open `index.html` in your browser, or serve with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   # Then open http://localhost:8000 in your browser
   ```

## Usage

1. Open the application in your browser.
2. Type a GitHub username into the search field.
3. Press **Enter** or click the **Search** button.
4. The user's profile information and repositories will be displayed.

## API Rate Limiting

This app uses the public GitHub API, which allows up to **60 unauthenticated requests per hour**. If you hit the rate limit, wait an hour or add a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to increase the limit.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
