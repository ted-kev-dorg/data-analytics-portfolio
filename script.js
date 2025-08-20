// --- Mobile Menu Toggle ---
const menuButton = document.getElementById('menu-button');
const navLinks = document.getElementById('nav-links');

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
});

// --- Dynamic Project Data ---
const projectsData = [
    {
        title: "E-commerce Sales Analysis",
        summary: "Identified key trends and customer behavior to optimize marketing and inventory.",
        description: [
            "Analyzed sales data to identify key trends, top-selling products, and customer behavior patterns.",
            "Used Python (Pandas, Matplotlib) and Tableau for data cleaning, analysis, and visualization.",
            "Key insights were used to optimize marketing campaigns and inventory management."
        ],
        technologies: "Python, SQL, Tableau",
        images: [
            "https://placehold.co/800x600/4f46e5/ffffff?text=E-commerce+Dashboard",
            "https://placehold.co/800x600/4f46e5/ffffff?text=E-commerce+Chart+1",
            "https://placehold.co/800x600/4f46e5/ffffff?text=E-commerce+Chart+2"
        ]
    },
    {
        title: "Movie Data Analysis",
        summary: "Uncovered trends in genre popularity and box office performance using Python.",
        description: [
            "Exploratory data analysis of a large movie dataset to uncover trends in genre popularity, box office performance, and director influence over time.",
            "Used Python and various data science libraries to create insightful visualizations.",
            "Developed a detailed report on findings, highlighting key cinematic trends and their financial impact."
        ],
        technologies: "Python, Pandas, Matplotlib",
        images: [
            "https://placehold.co/800x600/3b82f6/ffffff?text=Movie+Data+Analysis",
            "https://placehold.co/800x600/3b82f6/ffffff?text=Movie+Chart+1"
        ]
    },
    {
        title: "COVID-19 Impact on Retail",
        summary: "Analyzed shifts in consumer behavior and market resilience during the pandemic.",
        description: [
            "Conducted a time-series analysis of global retail sales data to understand the economic impact of the COVID-19 pandemic.",
            "Highlighted significant shifts in consumer behavior and market resilience across different regions and retail sectors.",
            "Used Excel and Power BI to create dynamic dashboards that tracked key metrics over time."
        ],
        technologies: "Excel, Power BI",
        images: [
            "https://placehold.co/800x600/4f46e5/ffffff?text=COVID-19+Impact"
        ]
    }
];

// --- Dynamic Project Card Generation ---
const projectsGrid = document.getElementById('projects-grid');

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = "project-card bg-gray-50 p-4 rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105";
    
    // Create the image element
    const img = document.createElement('img');
    img.src = project.images[0]; // Use the first image as the thumbnail
    img.alt = `${project.title} Thumbnail`;
    img.className = "rounded-md w-full mb-4";
    card.appendChild(img);
    
    // Create the title element
    const title = document.createElement('h3');
    title.className = "text-xl font-bold text-gray-800";
    title.textContent = project.title;
    card.appendChild(title);
    
    // Create the technologies element with new styling
    const tech = document.createElement('p');
    tech.className = "project-tech text-indigo-600 text-sm mt-2 font-bold";
    tech.textContent = project.technologies;
    card.appendChild(tech);

    // Create the summary element and add it after technologies
    const summary = document.createElement('p');
    summary.className = "text-gray-600 text-sm mt-2";
    summary.textContent = project.summary;
    card.appendChild(summary);

    // Store project data as attributes for the lightbox
    card.dataset.title = project.title;
    card.dataset.description = JSON.stringify(project.description); // Store the array as a JSON string
    card.dataset.images = project.images.join(',');

    return card;
}

// Populate the grid
projectsData.forEach(project => {
    const card = createProjectCard(project);
    projectsGrid.appendChild(card);
});


// --- Lightbox Functionality ---
const lightbox = document.getElementById('lightbox');
const closeBtn = document.querySelector('.close-btn');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const projectCards = document.querySelectorAll('.project-card'); // Get cards after they are generated
const imageCounter = document.getElementById('image-counter');
const thumbnailGallery = document.getElementById('thumbnail-gallery');

let currentImageIndex = 0;
let projectImages = [];

function updateLightboxImage() {
    lightboxImage.src = projectImages[currentImageIndex];
    imageCounter.textContent = `${currentImageIndex + 1} of ${projectImages.length}`;

    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
    
    // Hide/show buttons based on image index
    prevBtn.style.display = (currentImageIndex === 0) ? 'none' : 'block';
    nextBtn.style.display = (currentImageIndex === projectImages.length - 1) ? 'none' : 'block';
}

function createThumbnails() {
    thumbnailGallery.innerHTML = ''; // Clear previous thumbnails
    projectImages.forEach((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('thumbnail');
        img.alt = `Thumbnail ${index + 1}`;
        img.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightboxImage();
        });
        thumbnailGallery.appendChild(img);
    });
    // Update the initial active state
    updateLightboxImage();
}

// Open the lightbox when a project card is clicked
projectsGrid.addEventListener('click', (event) => {
    const card = event.target.closest('.project-card');
    if (!card) return; // If the click wasn't on a card, do nothing

    const title = card.getAttribute('data-title');
    const descriptionString = card.getAttribute('data-description');
    const imagesString = card.getAttribute('data-images');

    const projectDescription = JSON.parse(descriptionString);
    projectImages = imagesString.split(',');
    currentImageIndex = 0;

    // Set up the modal content
    lightboxTitle.textContent = title;
    
    // Clear previous description
    lightboxDescription.innerHTML = ''; 
    const ul = document.createElement('ul');
    ul.className = "list-disc list-inside space-y-2 text-gray-600";
    projectDescription.forEach(point => {
        const li = document.createElement('li');
        li.textContent = point;
        ul.appendChild(li);
    });
    lightboxDescription.appendChild(ul);
    
    // Create thumbnails and update image
    createThumbnails();

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
});


// Close the lightbox when the close button is clicked
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable background scroll
});

// Close the lightbox when clicking outside the content
window.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable background scroll
    }
});

// Navigation for multiple images
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent modal from closing
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateLightboxImage();
    }
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent modal from closing
    if (currentImageIndex < projectImages.length - 1) {
        currentImageIndex++;
        updateLightboxImage();
    }
});