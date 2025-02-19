document.addEventListener("DOMContentLoaded", function () {
    async function fetchBooks(subject) {
        try {
            const response = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=6`);
            const data = await response.json();
            return data.works || [];
        } catch (error) {
            console.error("Error fetching books:", error);
            return [];
        }
    }

    async function loadBooks() {
        const categories = {
            "aids1": "artificial_intelligence",
            "aids2": "machine_learning",
            "aids3": "data_mining",
            "aids4": "neural_networks",
            "ds1": "data_science",
            "ds2": "big_data",
            "ds3": "data_analysis",
            "ds4": "statistics"
        };

        for (const [sectionId, subject] of Object.entries(categories)) {
            const books = await fetchBooks(subject);
            const section = document.getElementById(sectionId);
            
            if (section && books.length > 0) {
                section.innerHTML = ''; // Clear existing content

                books.slice(0, 6).forEach(book => {
                    const bookCard = document.createElement("article");
                    bookCard.classList.add("book-card");

                    // Check if authors exist
                    const authors = book.authors ? book.authors.map(author => author.name).join(", ") : "Unknown Author";

                    // Handle book description safely
                    let description = " ";
                    if (book.description) {
                        description = typeof book.description === "object" ? book.description.value : book.description;
                    }

                    // Truncate descriptions longer than 100 characters
                    if (description.length > 100) {
                        description = description.substring(0, 100) + "...";
                    }

                    bookCard.innerHTML = `
                        <h4>${book.title}</h4>
                        <p>by ${authors}</p>
                        <div class="card-body">
                            <p>${description}</p>
                        </div>
                    `;
                    section.appendChild(bookCard);
                });
            }
        }
    }

    loadBooks();
});
