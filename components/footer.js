/*
 * AuctionPropertyToday - Injectable Luxury Footer Component
 * Features: Location Directory, Site Navigation, Newsletter signups
 */

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    injectFooter();
    setupFooterInteractions();
  });

  function injectFooter() {
    const footer = document.createElement('footer');
    footer.className = 'luxury-footer';
    
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          
          <div class="footer-brand">
            <h3 class="luxury-heading">
              AUCTION<span class="gold-text-gradient" style="font-weight:700;">PROPERTY</span>
              <span class="logo-sub" style="font-size:0.6rem; letter-spacing:0.2em;">TODAY</span>
            </h3>
            <p>India's gateway to bank-liquidated and verified real estate auctions. Digitizing transparent property assets for investors.</p>
            <div style="display:flex; gap:1rem; color:var(--text-secondary);">
              <a href="#" style="font-size:1.1rem;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="#" style="font-size:1.1rem;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="#" style="font-size:1.1rem;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
            </div>
          </div>
          
          <div>
            <h4 class="footer-section-title">Navigation</h4>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="listings.html">Properties</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="admin.html">Admin Dashboard</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="footer-section-title">Our Offices</h4>
            <div class="footer-office">
              <div class="office-card">
                <h4>Mumbai BKC</h4>
                <p>Suite 1204, Capital Building, Bandra Kurla Complex, Mumbai 400051</p>
              </div>
              <div class="office-card">
                <h4>Lutyens' Delhi</h4>
                <p>32, Amaltas Avenue, Lutyens' Bungalow Zone, New Delhi 110001</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="footer-section-title">Newsletter</h4>
            <div class="footer-newsletter">
              <p>Subscribe to receive notifications of bank property auctions before they go public.</p>
              <form class="newsletter-form" id="footer-newsletter-form">
                <input type="email" class="newsletter-input" placeholder="Enter Email Address..." required />
                <button type="submit" class="newsletter-btn">JOIN</button>
              </form>
            </div>
          </div>
          
        </div>
        
        <div class="footer-bottom">
          <p>© 2026 AuctionPropertyToday. All Rights Reserved. Fully compliant with RBI, SARFAESI Act, and RERA regulations across India.</p>
          <div style="display:flex; gap:1.5rem;">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(footer);
  }

  function setupFooterInteractions() {
    const form = document.getElementById('footer-newsletter-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = form.querySelector('.newsletter-input');
        const email = input.value.trim();
        
        if (email) {
          // Custom aesthetic modal notification
          const msg = document.createElement('div');
          msg.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--bg-surface);
            border: 1px solid var(--border-color-gold);
            padding: 1.5rem 2rem;
            border-radius: 6px;
            z-index: 10000;
            box-shadow: 0 15px 40px rgba(0,0,0,0.5), 0 0 20px var(--gold-glow);
            max-width: 400px;
            animation: footerNotifyFade 0.5s ease;
          `;
          msg.innerHTML = `
            <h4 style="font-family:var(--font-serif); font-size:1.2rem; color:var(--gold-primary); margin-bottom:0.5rem;">Subscription Confirmed</h4>
            <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5;">Notifications of upcoming property auctions will be sent to <strong>${email}</strong> ahead of public listings.</p>
          `;
          
          document.body.appendChild(msg);
          
          // CSS keyframe injected dynamically
          if (!document.getElementById('footer-notify-animation')) {
            const style = document.createElement('style');
            style.id = 'footer-notify-animation';
            style.innerHTML = `
              @keyframes footerNotifyFade {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `;
            document.head.appendChild(style);
          }

          input.value = '';
          setTimeout(() => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(10px)';
            msg.style.transition = 'all 0.5s ease';
            setTimeout(() => msg.remove(), 500);
          }, 5000);
        }
      });
    }
  }
})();
