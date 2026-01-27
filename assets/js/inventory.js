const cars = [
  {
    title: "2021 Mercedes-Benz C300",
    miles: "32,410",
    trans: "Automatic",
    price: 31995,
    tag: "Clean Title",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1800&q=60",
  },
  {
    title: "2020 Toyota Camry SE",
    miles: "41,220",
    trans: "Automatic",
    price: 22990,
    tag: "One Owner",
    img: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1800&q=60",
  },
  {
    title: "2019 Ford F-150 XLT 4x4",
    miles: "75,800",
    trans: "Automatic",
    price: 28800,
    tag: "4x4",
    img: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1800&q=60",
  },
  {
    title: "2018 BMW 330i",
    miles: "62,110",
    trans: "Automatic",
    price: 19900,
    tag: "Sport",
    img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1800&q=60",
  },
  {
    title: "2022 Honda Civic Touring",
    miles: "18,600",
    trans: "Automatic",
    price: 25995,
    tag: "Low Miles",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=60",
  },
  {
    title: "2017 Jeep Grand Cherokee",
    miles: "89,200",
    trans: "Automatic",
    price: 17950,
    tag: "SUV",
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1800&q=60",
  }
];

function money(n){
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function render(list){
  const grid = document.querySelector("#invGrid");
  if (!grid) return;

  grid.innerHTML = list.map((c) => `
    <div class="inv-card">
      <img class="inv-img" src="${c.img}" alt="${c.title}">
      <div class="inv-body">
        <h3 class="inv-title">${c.title}</h3>
        <div class="inv-meta">${c.miles} miles • ${c.trans}</div>
        <div class="inv-price">
          <div style="font-weight:800; font-size:18px;">${money(c.price)}</div>
          <div class="badge">${c.tag}</div>
        </div>
        <div class="btn-row" style="margin-top:6px;">
          <a class="btn primary" href="contact.html">Check Availability</a>
          <a class="btn" href="financing.html#prequal">Get Pre-Qualified</a>
        </div>
      </div>
    </div>
  `).join("");
}

function applyFilters(){
  const q = (document.querySelector("#q")?.value || "").toLowerCase();
  const max = Number(document.querySelector("#maxPrice")?.value || 999999);

  const filtered = cars.filter((c) => {
    const matchesText = c.title.toLowerCase().includes(q);
    const matchesPrice = c.price <= max;
    return matchesText && matchesPrice;
  });

  render(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  render(cars);

  const q = document.querySelector("#q");
  const max = document.querySelector("#maxPrice");
  const maxLabel = document.querySelector("#maxLabel");

  if (max && maxLabel) {
    maxLabel.textContent = money(Number(max.value));
    max.addEventListener("input", () => {
      maxLabel.textContent = money(Number(max.value));
      applyFilters();
    });
  }

  if (q) q.addEventListener("input", applyFilters);

  const clearBtn = document.querySelector("#clearFilters");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (q) q.value = "";
      if (max) max.value = "50000";
      if (maxLabel) maxLabel.textContent = money(50000);
      render(cars);
    });
  }
});
