//? 1. Write an async function that fetches the USD→ETB rate from a public exchange-rate API,
//? checks res.ok, and returns the rate.

async function usdToEtb(url) {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        return data.rate;
    } catch (error) {
        console.error(error);
    }
}

const rate = usdToEtb("https://api.frankfurter.dev/v2/rate/USD/ETB")


//? 2. Rewrite a three-step .then chain (fetch → json → render) as an async function using await and
//? try/catch.
const url = "https://api.frankfurter.dev/v2/rate/USD/ETB"
fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });

// convert async await functino 
async function getData(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// 3. Fetch a deliberately wrong URL and confirm your catch block runs; then fetch a real URL that
// returns 404 and show why you also need res.ok.
async function usdToEtb(url) {
    try {
        const res = await fetch(url);

        console.log("Status:", res.status);
        console.log("OK:", res.ok);

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        console.log("Data:", data);

        return data;

    } catch (error) {
        console.error("Error:", error);
    }
}

usdToEtb("https://api.frankfurter.dev/v2/rate/USD/ETBtest")


// 4. Fetch a list from a public API and use Promise.all to fetch details for the first two items in
// parallel.

async function getUsers() {
    try {
        // Step 1: Fetch the list
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const users = await res.json();

        const firstTwoUsers = users.slice(0, 2);

        const userDetails = await Promise.all(
            firstTwoUsers.map(async user => {
                const res = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${user.id}`
                );

                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`);
                }

                return await res.json();
            })
        );

        console.log("First two users:");
        console.log(userDetails);

    } catch (error) {
        console.error("Error:", error);
    }
}

getUsers();

// Exersice 5
// use it from ./../index.html console

// 5. Loading → Success / Error

const output = document.getElementById("output");

async function loadUser() {

    // State 1: Loading
    output.textContent = "Loading...";

    try {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/users/1"
        );

        // Check HTTP errors such as 404
        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const user = await res.json();

        // State 2: Success
        output.innerHTML = `
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>City: ${user.address.city}</p>
        `;

    } catch (error) {

        // State 3: Error
        output.textContent = `Error: ${error.message}`;
    }
}

loadUser();