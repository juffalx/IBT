document.addEventListener("DOMContentLoaded", () => {
    // page ሙሉ load አድርጎ ሲጨርስ
    const form = document.getElementById("signup-form");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const errorArea = document.getElementById("error-area");
    const userCountDiv = document.getElementById("user-count");

    const STORAGE_KEY = "signup_users";
    // ቡሃላ STORAGE_KEY እያልን local ላይ የተቀመጠውን storage key መጠቀም እንችላለን
    updateUserCount();

    form.addEventListener("submit", (event) => {
        event.preventDefault();  // reload እንዳያደርግ ከልከለው
        errorArea.textContent = "";

        //ሁሉንም አላስፈላጊ whitespace እናጠፋቸው እና variable ላይ እናስቀምጣቸዋለን
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();

        if (name.length < 2) {
            errorArea.textContent = "Name must be at least 2 characters.";
            return;
        }
        // ኢትዮጲያ ውስጥ ቴሌ 9 እና ሳፋሪኮም ደግሞ 07 ኮድ ስለሚጠቀሙ
        //ስለዚ 0 ካለ ወይም +251 ካለ ቡሃላ 7 ወይም 9 ብሎ ነው ሚጀምረው 

        const phoneRegex = /^(?:\+251|0)[79]\d{8}$/; 
        if (!phoneRegex.test(phone)) {
            errorArea.textContent = "Invalid Ethiopian phone number.";
            return;
        }
        
        // ፓስዎርድ ብዛቱ minimum 8 ፣ minimum 1 Uppercase, Lowercase special character and numer 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            errorArea.textContent = "Password must be 8+ chars with 1 uppercase, 1 lowercase, and 1 special character.";
            return;
        }

        const newUser = { name, phone, password };  
        // አዲሱን የገቡትን 3ቱንም የuser ዳታዎችን newUser ላይ አስቀምጣቸው
        

        // users =  በፊት storage ላይ  በ STORAGE_KEY ስም  ተቀምጦ የነበረ ዳታ ካለ ሁሉንም ውሰደው እና json parse አድርገው ከሌለ ደግሞ ባዶ ሊስት አድርገው 
        let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        users.push(newUser); // add to user or add new data to existing data

        // ከዛ ቡሃላ አንድ ላይ አድርገክ ወደ string ቀይረክ ከዛ localstorege ላይ save አድርገው
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

        form.reset();// በትክክል ፎርሙ ከሰራ ቡሃላ ለቀጣይ ዳታ ክሊር ያደርገዋል

        updateUserCount(); // ከዛ ብሃላ ሚቆጥረውን number update ያደርገዋል
        
        alert("Saved successfully!");
    });

    function updateUserCount() {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        userCountDiv.textContent = `Total signed up: ${users.length}`;
    }
});