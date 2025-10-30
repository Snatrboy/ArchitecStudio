// Unsplash API Configuration
const UNSPLASH_ACCESS_KEY = 'O9k5KHEDQGWw7UNMvA7AxFBzNnYDthUL4XCAUoYUSG4'; 
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

// Fungsi untuk fetch foto arsitektur
async function fetchArchitecturePhotos(query = 'architecture', perPage = 9) {
  const projectsGrid = document.getElementById('projects-grid');
  
  // Loading state
  projectsGrid.innerHTML = '<div class="col-span-full text-center py-12"><div class="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div><p class="mt-4 text-gray-600">Loading projects...</p></div>';
  
  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}?query=${query}&per_page=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    displayPhotos(data.results);
    
  } catch (error) {
    console.error('Error fetching photos:', error);
    projectsGrid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-red-600 text-lg mb-4">❌ Failed to load projects</p>
        <p class="text-gray-600">Error: ${error.message}</p>
        <button onclick="fetchArchitecturePhotos()" class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Try Again
        </button>
      </div>
    `;
  }
}

// Fungsi untuk menampilkan foto di UI
function displayPhotos(photos) {
  const projectsGrid = document.getElementById('projects-grid');
  
  if (photos.length === 0) {
    projectsGrid.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-gray-600">No projects found</p></div>';
    return;
  }
  
  projectsGrid.innerHTML = photos.map(photo => `
    <div class="relative group overflow-hidden rounded-lg shadow hover:shadow-xl transition">
      <img 
        src="${photo.urls.regular}" 
        alt="${photo.alt_description || 'Architecture project'}"
        class="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <div class="text-white">
          <p class="text-sm">📷 Photo by 
            <a href="${photo.user.links.html}?utm_source=architect_studio&utm_medium=referral" 
               target="_blank" 
               class="underline hover:text-blue-300">
              ${photo.user.name}
            </a>
          </p>
          <p class="text-xs mt-1">on 
            <a href="https://unsplash.com?utm_source=architect_studio&utm_medium=referral" 
               target="_blank" 
               class="underline hover:text-blue-300">
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </div>
  `).join('');
}

// Filter kategori
function changeCategory(category) {
  const queries = {
    all: 'architecture',
    modern: 'modern architecture',
    interior: 'interior design',
    landscape: 'landscape architecture'
  };
  
  fetchArchitecturePhotos(queries[category] || queries.all);
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  fetchArchitecturePhotos();
});