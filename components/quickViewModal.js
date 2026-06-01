/*
 * AuctionPropertyToday - Shared Property Quick View Modal Component
 * Features: Shimmer Skeleton loaders, database fetches, dynamic layouts
 */

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    injectQuickViewModal();
  });

  function injectQuickViewModal() {
    // Check if modal already present
    if (document.getElementById('global-quick-view-modal')) return;

    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.id = 'global-quick-view-modal';
    modal.innerHTML = `
      <div class="modal-backdrop" id="qv-modal-backdrop"></div>
      <div class="modal-card">
        <button class="modal-close-btn" id="qv-modal-close">×</button>
        <div class="modal-grid" id="qv-modal-grid-content">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Bind close events
    const closeBtn = document.getElementById('qv-modal-close');
    const backdrop = document.getElementById('qv-modal-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', closeQuickView);
    if (backdrop) backdrop.addEventListener('click', closeQuickView);
  }

  function closeQuickView() {
    const modal = document.getElementById('global-quick-view-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Expose global controller
  window.quickViewModal = {
    show: async function(propertyId) {
      const modal = document.getElementById('global-quick-view-modal');
      const content = document.getElementById('qv-modal-grid-content');
      
      if (!modal || !content) return;

      // 1. Show modal in loading state
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      // 2. Load skeletal loader
      content.innerHTML = `
        <div class="modal-media skeleton"></div>
        <div class="modal-content-panel" style="gap:1.5rem;">
          <div class="skeleton" style="height: 24px; width: 40%; border-radius: 4px;"></div>
          <div class="skeleton" style="height: 48px; width: 90%; border-radius: 4px;"></div>
          <div class="skeleton" style="height: 36px; width: 50%; border-radius: 4px;"></div>
          <div class="skeleton" style="height: 120px; width: 100%; border-radius: 4px;"></div>
          <div class="skeleton" style="height: 50px; width: 100%; border-radius: 4px; margin-top: auto;"></div>
        </div>
      `;

      // 3. Query Live Database
      if (window.supabaseClient) {
        const { data, error } = await window.supabaseClient
          .from('properties')
          .select('*, property_images(*)')
          .eq('id', propertyId);
        
        if (error || !data || data.length === 0) {
          content.innerHTML = `
            <div style="grid-column: span 2; padding: 4rem; text-align: center;">
              <h3 style="font-family:var(--font-serif); font-size:1.5rem; color:var(--text-primary); margin-bottom:1rem;">Error Loading Property</h3>
              <p style="color:var(--text-secondary);">The requested property could not be found at this time.</p>
              <button class="btn-luxury" style="margin-top:2rem;" onclick="document.getElementById('global-quick-view-modal').classList.remove('open')">Close</button>
            </div>
          `;
          return;
        }

        const item = data[0];
        const images = item.property_images && item.property_images.length > 0
          ? item.property_images.map(img => img.image_url)
          : ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"];

        const rawPrice = item.price || item.reservation_price || 0;
        const priceFormatted = `₹${(rawPrice / 10000000).toFixed(1)} Cr`;
        const auctionDate = item.auction_date || new Date().toISOString();

        const pName = item.title || item.property_name || 'Untitled';
        const pClass = item.property_type || item.property_classification || item.type || 'Villa';
        const pDesc = item.description || item.property_description || '';
        const pArea = item.area_sqft || item.built_area || item.area || 0;
        const pBHK = item.bedrooms || item.bhk_configuration || 1;
        const pBaths = item.bathrooms || item.bathroom_configuration || 1;

        // 4. Render gorgeous high-luxury content
        const firstIsVid = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'm4v'].includes(images[0].split('?')[0].split('.').pop().toLowerCase());
        content.innerHTML = `
          <div class="modal-media">
            ${firstIsVid ? `
              <video src="${images[0]}" controls muted loop autoplay playsinline style="width:100%; height:100%; object-fit:cover; display:block; outline:none; background:#000;"></video>
            ` : `
              <img src="${images[0]}" alt="${pName}" />
            `}
            ${item.is_featured ? '<span class="badge-featured">Featured</span>' : ''}
            <span class="badge-auction-date" style="bottom:1.5rem; top:auto; left:1.5rem; right:auto;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>${new Date(auctionDate).toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'})}</span>
            </span>
          </div>
          
          <div class="modal-content-panel">
            <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.12em; color:var(--gold-primary); font-weight:600; margin-bottom:0.5rem;">
              ${item.city} • ${pClass}
            </div>
            
            <h3 class="luxury-heading" style="font-size:2rem; line-height:1.25; margin-bottom:0.5rem; color:var(--text-primary);">${pName}</h3>
            
            <div class="modal-price">${priceFormatted}</div>
            
            <p class="modal-desc">${pDesc.length > 250 ? pDesc.substring(0, 250) + '...' : pDesc}</p>
            
            <div class="modal-stats">
              <div class="modal-stat-box">
                <h4>Area</h4>
                <p>${pArea.toLocaleString('en-IN')} sq ft</p>
              </div>
              <div class="modal-stat-box">
                <h4>Bedrooms</h4>
                <p>${pBHK} BHK</p>
              </div>
              <div class="modal-stat-box">
                <h4>Bathrooms</h4>
                <p>${pBaths} Bathrooms</p>
              </div>
            </div>
            
            <div style="display:grid; grid-template-columns: 1fr; margin-top:auto;">
              <a href="details.html?id=${item.id}" class="btn-luxury" style="text-align:center;">VIEW DETAILS</a>
            </div>
          </div>
        `;
      }
    }
  };
})();
