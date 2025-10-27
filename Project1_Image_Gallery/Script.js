 // logic for open gallaryoverlay also image box
    let overlay = document.querySelector(".galleryOverlay");
    let imageBox = document.querySelector(".imgBox");
    var img = document.querySelector(".imgBox img");
    let close=document.querySelector(".imgBox span");
    let activeFilter = 'all';
    let nextBtn=document.querySelector(".nextBtn");
    let prevBtn=document.querySelector(".prevBtn");
    let currentIndex=0;

    let gallery = document.querySelector("#gallery")
    gallery.addEventListener("click", (event) => {
        let currentImagePath = event.target.src;

        if (currentImagePath !== undefined) {
            overlay.classList.add('galleryOverlayShow')
            imageBox.classList.add('imgBoxShow')
            img.src = currentImagePath;
            console.log(currentImagePath)
            // activeFilter=button.getAttribute('data-category')

            const selectedFilter = filterEffects[activeFilter]||'none';
            img.style.filter=selectedFilter;
        }

    })
    // click cross icon close the galleryoverlay 
    close.addEventListener("click",()=>{
         overlay.classList.remove('galleryOverlayShow')
         imageBox.classList.remove('imgBoxShow')
    })

    // click across image close the gallaryoverlay
    overlay.addEventListener("click",()=>{
        overlay.classList.remove('galleryOverlayShow')
        imageBox.classList.remove('imgBoxShow')
    })

    // click escape button close gallaryoveray
    document.addEventListener("keydown",(e)=>{
         if(e.key==="Escape"){
        overlay.classList.remove('galleryOverlayShow')
        imageBox.classList.remove('imgBoxShow')
    }
    })

   // --- CATEGORY FILTER LOGIC ---
const filterButtons = document.querySelectorAll('.category .filter-btn');
const galleryItems = document.querySelectorAll('.galleryItem');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove "active" class from all category buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));

    // Add "active" class to the clicked one
    button.classList.add('active');

    // Get selected category
    const category = button.getAttribute('data-category');

    // Loop through gallery items
    galleryItems.forEach(item => {
      // If category is "all", show all
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
// --- IMAGE FILTER LOGIC ---
const filterEffectButtons = document.querySelectorAll('.filter .filter-btn');
const galleryImages = document.querySelectorAll('.galleryItem img');

// Object mapping filter types to CSS filters
const filterEffects = {
  all: 'none', // “None” button
  animal: 'grayscale(100%)', // GrayScale
  flowers: 'sepia(80%)',     // Sepia
  mountains: 'blur(2px)'     // Slightly Blur
};

filterEffectButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all filter buttons
    filterEffectButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to the clicked one
    button.classList.add('active');

    // Get the selected filter category
    const category = button.getAttribute('data-category');
    const selectedFilter = filterEffects[category] || 'none';

    // Apply the filter to all images
    galleryImages.forEach(img => {
      img.style.filter = selectedFilter;
    });
        activeFilter = button.getAttribute('data-category');
  });
});

// ===== LIGHTBOX NAVIGATION LOGIC =====

let lightboxImg = document.querySelector(".imgBox img");
let closeBtn = document.querySelector(".closeBtn");
;

// Open lightbox
gallery.addEventListener("click", (event) => {
  const clickedImg = event.target.closest(".galleryItem img");
  if (!clickedImg) return;

  const visibleItems = [...galleryItems].filter(
    (item) => item.style.display !== "none"
  );
  currentIndex = visibleItems.findIndex(
    (item) => item.querySelector("img") === clickedImg
  );

  openLightbox(visibleItems[currentIndex].querySelector("img").src);
});

function openLightbox(src) {
  overlay.classList.add("galleryOverlayShow");
  imageBox.classList.add("imgBoxShow");
  lightboxImg.src = src;

  // Apply active filter style
  const selectedFilter = filterEffects[activeFilter] || "none";
  lightboxImg.style.filter = selectedFilter;
}

// Close lightbox
function closeLightbox() {
  overlay.classList.remove("galleryOverlayShow");
  imageBox.classList.remove("imgBoxShow");
}

closeBtn.addEventListener("click", closeLightbox);
overlay.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNextImage();
  if (e.key === "ArrowLeft") showPrevImage();
});

// Next/Prev buttons
nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPrevImage);

function showNextImage() {
  const visibleItems = [...galleryItems].filter(
    (item) => item.style.display !== "none"
  );
  if (visibleItems.length === 0) return;

  currentIndex = (currentIndex + 1) % visibleItems.length;
  updateLightboxImage(visibleItems[currentIndex].querySelector("img").src);
}

function showPrevImage() {
  const visibleItems = [...galleryItems].filter(
    (item) => item.style.display !== "none"
  );
  if (visibleItems.length === 0) return;

  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  updateLightboxImage(visibleItems[currentIndex].querySelector("img").src);
}

function updateLightboxImage(src) {
  lightboxImg.src = src;
  const selectedFilter = filterEffects[activeFilter] || "none";
  lightboxImg.style.filter = selectedFilter;
}