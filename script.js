// Global Data (plants + cart)
let allPlants = [];
let cart = [];

// Helper: Get Valid Image
function getValidImage(originalImage, plantName, index = 0) {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1605027990121-3b2c6ed2bb08?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
  ];

  if (originalImage && originalImage.startsWith("http")) {
    return originalImage;
  }
  return fallbackImages[index % fallbackImages.length];
}

// Spinner toggle
function showSpinner(show) {
  const sp = document.getElementById("spinner");
  if (sp) {
    sp.style.display = show ? "block" : "none";
  }
}

// Init Page
window.addEventListener("load", () => {
  console.log("page ready...");
  addCategories();
  loadAllPlants();
  updateCart();
});

// Category Buttons
function addCategories() {
  const cats = [
    { id: "all", name: "All Trees" },
    { id: 1, name: "Fruit Trees" },
    { id: 2, name: "Flowering Trees" },
    { id: 3, name: "Shade Trees" },
    { id: 4, name: "Medicinal Trees" },
    { id: 5, name: "Timber Trees" },
    { id: 6, name: "Evergreen Trees" },
    { id: 7, name: "Ornamental Plants" },
    { id: 8, name: "Bamboo" },
    { id: 9, name: "Climbers" },
    { id: 10, name: "Aquatic Plants" },
  ];

  const container = document.getElementById("categories");
  if (!container) return;

  container.innerHTML = "";
  cats.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.textContent = cat.name;

    btn.onclick = () => {
      container
        .querySelectorAll("button")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (cat.id === "all") loadAllPlants();
      else loadCategoryPlants(cat.id);
    };

    if (i === 0) btn.classList.add("active");
    container.appendChild(btn);
  });
}

// Fetch all plants (with serial order)
async function loadAllPlants() {
  console.log("fetching all plants...");
  showSpinner(true);
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    const plants = data?.data || data?.plants;

    if (plants) {
      const order = [
        "Fruit Trees",
        "Flowering Trees",
        "Shade Trees",
        "Medicinal Trees",
        "Timber Trees",
        "Evergreen Trees",
        "Ornamental Plants",
        "Bamboo",
        "Climbers",
        "Aquatic Plants",
      ];

      // sort plants by category order
      const sorted = plants.sort((a, b) => {
        const i1 = order.indexOf(a.category);
        const i2 = order.indexOf(b.category);
        return i1 - i2;
      });

      allPlants = sorted;
      displayPlants(sorted);
    } else {
      loadDummyPlants();
    }
  } catch (err) {
    console.error("API error", err);
    loadDummyPlants();
  }
  showSpinner(false);
}

// Fetch by Category
async function loadCategoryPlants(id) {
  console.log("fetching cat:", id);
  showSpinner(true);
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/category/${id}`
    );
    const data = await res.json();
    const plants = data?.data || data?.plants;
    if (plants) {
      allPlants = plants;
      displayPlants(plants);
    } else {
      loadDummyPlants();
    }
  } catch (e) {
    console.error("category fetch failed", e);
    loadDummyPlants();
  }
  showSpinner(false);
}

// Dummy Data
function loadDummyPlants() {
  console.log("loading dummy plants...");
  const dummy = [
    {
      id: 1,
      name: "Mango Tree",
      description: "Sweet and juicy mango tree perfect for tropical gardens...",
      image:
        "https://images.unsplash.com/photo-1605027990121-3b2c6ed2bb08?w=400&h=300&fit=crop",
      category: "Fruit Trees",
      price: 500,
      scientific_name: "Mangifera indica",
    },
    {
      id: 2,
      name: "Rose Bush",
      description: "Beautiful flowering rose bush with vibrant red flowers...",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      category: "Flowering Trees",
      price: 300,
      scientific_name: "Rosa rubiginosa",
    },
    {
      id: 3,
      name: "Banyan Tree",
      description: "A majestic shade tree with a vast canopy...",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      category: "Shade Trees",
      price: 1200,
      scientific_name: "Ficus benghalensis",
    },
    {
      id: 4,
      name: "Neem Tree",
      description: "Medicinal tree with healing properties...",
      image: "",
      category: "Medicinal Trees",
      price: 400,
      scientific_name: "Azadirachta indica",
    },
    {
      id: 5,
      name: "Oak Tree",
      description: "Strong timber tree perfect for furniture...",
      image: "",
      category: "Timber Trees",
      price: 800,
      scientific_name: "Quercus robur",
    },
    {
      id: 6,
      name: "Pine Tree",
      description: "Evergreen pine tree for year-round greenery...",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      category: "Evergreen Trees",
      price: 600,
      scientific_name: "Pinus sylvestris",
    },
    {
      id: 7,
      name: "Ornamental Palm",
      description: "Decorative tree for gardens and landscapes...",
      image: "",
      category: "Ornamental Plants",
      price: 350,
      scientific_name: "Chamaerops humilis",
    },
    {
      id: 8,
      name: "Bamboo Plant",
      description: "Fast growing bamboo plant for privacy and decoration...",
      image:
        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=400&h=300&fit=crop",
      category: "Bamboo",
      price: 200,
      scientific_name: "Bambusa vulgaris",
    },
    {
      id: 9,
      name: "Jasmine Vine",
      description: "Fragrant climbing jasmine with white flowers...",
      image:
        "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop",
      category: "Climbers",
      price: 250,
      scientific_name: "Jasminum officinale",
    },
    {
      id: 10,
      name: "Water Lily",
      description: "Aquatic plant with floating leaves and flowers...",
      image: "",
      category: "Aquatic Plants",
      price: 300,
      scientific_name: "Nymphaea nouchali",
    },
  ];

  // maintain serial order
  const order = [
    "Fruit Trees",
    "Flowering Trees",
    "Shade Trees",
    "Medicinal Trees",
    "Timber Trees",
    "Evergreen Trees",
    "Ornamental Plants",
    "Bamboo",
    "Climbers",
    "Aquatic Plants",
  ];

  const sorted = dummy.sort((a, b) => {
    const i1 = order.indexOf(a.category);
    const i2 = order.indexOf(b.category);
    return i1 - i2;
  });

  allPlants = sorted;
  displayPlants(sorted);
}

// Modal
function openPlantModal(id) {
  const plant = allPlants.find((p) => p.id == id);
  if (!plant) return;

  const modal = document.getElementById("modal");
  const mc = document.getElementById("modal-content");
  if (!modal || !mc) return;

  const imageUrl = getValidImage(plant.image, plant.name);

  mc.innerHTML = `
    <h2>${plant.name}</h2>
    <img src="${imageUrl}" alt="${plant.name}" class="modal-tree-image"
         onload="this.style.opacity='1'"
         style="opacity:0; transition: opacity 0.5s ease;"
         onerror="this.src='https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'; this.style.opacity='1';"/>
    <p><strong>Category:</strong> ${plant.category}</p>
    <p><strong>Price:</strong> ৳${plant.price}</p>
    <div style="margin-bottom: 15px;">
      <p><strong>Description:</strong></p>
      <p style="margin-top: 5px; text-align: justify; line-height: 1.6;">${plant.description}</p>
    </div>
    <div class="modal-close-container">
      <button onclick="closeModal()" class="modal-close-btn">Close</button>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const m = document.getElementById("modal");
  if (m) {
    m.classList.add("hidden");
    m.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
  }
}

document.addEventListener("click", (e) => {
  if (e.target.id === "modal") closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Render Plants
function displayPlants(plants) {
  const container = document.getElementById("cards");
  if (!container) return;

  container.innerHTML = "";
  if (!plants || plants.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:20px;">No plants found</div>`;
    return;
  }

  plants.forEach((p, idx) => {
    const c = document.createElement("div");
    c.className = "card";
    const img = getValidImage(p.image, p.name, idx);
    const desc =
      p.description?.length > 80
        ? p.description.slice(0, 80) + "..."
        : p.description;

    c.innerHTML = `
      <img src="${img}" alt="${p.name}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'"/>
      <div class="card-content">
        <h4 onclick="openPlantModal(${p.id})">${p.name}</h4>
        <p class="desc">${desc}</p>
        <div class="card-meta">
          <span class="tag">${p.category}</span>
          <div class="price">৳${p.price}</div>
        </div>
        <button class="add" onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
      </div>
    `;
    container.appendChild(c);
  });
}

// Cart
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}
function removeFromCart(i) {
  cart.splice(i, 1);
  updateCart();
}
function updateCart() {
  const list = document.getElementById("cart-list");
  const totalEl = document.getElementById("cart-total");
  if (!list || !totalEl) return;

  list.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <div class="item-info">
        <strong>${item.name}</strong>
        <p>৳${item.price} × 1</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${i})">×</button>
    `;
    list.appendChild(li);
  });
  totalEl.textContent = "৳" + total;
}

// Handle Form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tree-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const treeCount = document.getElementById("tree-count").value;

      if (!name || !email || !treeCount) {
        alert("Please fill all fields");
        return;
      }
      if (cart.length === 0) {
        alert("Please add some trees to cart");
        return;
      }
      alert(
        `Thanks ${name}! You ordered ${treeCount} trees. Total: ${
          document.getElementById("cart-total").textContent
        }`
      );
      form.reset();
      cart = [];
      updateCart();
    });
  }
});

// Navigation Shortcuts
function scrollToTrees() {
  document
    .getElementById("choose-section")
    ?.scrollIntoView({ behavior: "smooth" });
}
function scrollToForm() {
  document.getElementById("plantForm")?.scrollIntoView({ behavior: "smooth" });
}
