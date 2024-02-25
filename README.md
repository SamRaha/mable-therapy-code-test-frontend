Link to live website: https://main.d22xhslt35h63x.amplifyapp.com/

Enhancements:

1. Introduce functionality that permits users to conduct searches based on usernames by utilizing the endpoint 'https://api.github.com/users/${username}/repos'. This enhancement will enable users to either select a user from a list or search directly by username to view their repositories.

2. Given the current limitations imposed by the GitHub API, which restricts the number of calls within a specific timeframe, I propose to authenticate requests by incorporating my GitHub API key. This strategy necessitates the development of a backend service to securely manage the API key, ensuring it remains protected and confidential.

3. For applications of an enterprise scale, I would advocate for the adoption of React Query to efficiently cache API requests. This approach significantly optimizes data retrieval processes, minimizing redundant network calls and enhancing the overall user experience.

4. While the current state management strategy employs prop drilling, which suffices for the simplicity of this application, considerations for future scalability and complexity would lead me to implement more robust state management solutions, such as the Context API or Redux. These frameworks offer a more structured and maintainable approach to state management across larger, more complex applications.

Side Note:

In the design decision to use the term 'favourite' over 'star', it's important to note the distinction between the two actions within the context of this application. The choice to 'favourite' does not equate to 'starring' a GitHub repository; these are distinct functionalities. The term 'favourite' more accurately reflects the user's action within this application, differentiating it from the specific 'star' feature provided by GitHub.
