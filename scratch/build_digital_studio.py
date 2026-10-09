import os

html_path = r"c:\Users\91887\OneDrive\Desktop\protfolio\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    orig = f.read()

start_marker = '    <!-- ================================================== -->\n    <!-- 3. ABOUT SECTION                                  -->\n    <!-- ================================================== -->'
end_marker = '  <!-- Certificate Image Modal Lightbox -->'

start_idx = orig.find(start_marker)
end_idx = orig.find(end_marker)

if start_idx == -1 or end_idx == -1:
    raise Exception(f"Markers not found: start={start_idx}, end={end_idx}")

studio_sections = """    <!-- ================================================== -->
    <!-- 3. EDITORIAL CASE STUDIES / WORK (#work)          -->
    <!-- ================================================== -->
    <section class="section-wrapper bg-alt" id="work">
      <div class="section-container">
        <div class="section-header">
          <span class="section-kicker">[ CASE STUDIES // PRODUCTION DELIVERIES ]</span>
          <h2 class="section-title">FEATURED ENGINEERING WORK</h2>
          <p class="section-subtitle">
            Editorial architectural case studies detailing real technical problems, system constraints, engineering solutions, and verified features from my codebase.
          </p>
        </div>

        <div class="editorial-case-studies-container">

          <!-- PROJECT 01: EVENT BOOKING REST API -->
          <article class="editorial-project-card" id="project-01">
            <div class="editorial-project-top">
              <div class="editorial-num-title">
                <span class="editorial-big-num">01</span>
                <div>
                  <h3 class="editorial-project-title">EVENT BOOKING REST API</h3>
                  <span class="editorial-category-badge">BACKEND ARCHITECTURE // SQL &amp; SEQUELIZE</span>
                </div>
              </div>
              <div class="editorial-project-techs">
                <span class="tech-tag"><i class="fa-brands fa-node-js"></i> Node.js</span>
                <span class="tech-tag"><i class="fa-solid fa-server"></i> Express.js</span>
                <span class="tech-tag"><i class="fa-solid fa-code"></i> TypeScript</span>
                <span class="tech-tag"><i class="fa-solid fa-database"></i> MySQL</span>
                <span class="tech-tag"><i class="fa-solid fa-table"></i> Sequelize</span>
                <span class="tech-tag"><i class="fa-solid fa-lock"></i> JWT RBAC</span>
              </div>
            </div>

            <div class="editorial-grid-content">
              <!-- Left Column: Problem & Solution -->
              <div class="editorial-problem-solution">
                <div class="editorial-section-box">
                  <div class="editorial-box-heading">
                    <i class="fa-solid fa-triangle-exclamation"></i> The Problem
                  </div>
                  <p class="editorial-box-text">
                    Multi-tenant community event booking platforms suffer from schedule conflicts, overlapping bookings, late cancellations that leave organizers with unpaid reservations, and slow queries when discovering localized gatherings within driving distance.
                  </p>
                </div>

                <div class="editorial-section-box">
                  <div class="editorial-box-heading">
                    <i class="fa-solid fa-gears"></i> The Solution &amp; Architecture
                  </div>
                  <p class="editorial-box-text">
                    Engineered a hardened RESTful backend in Node.js and TypeScript utilizing MySQL with Sequelize ORM. Implemented atomic transaction isolation for overlapping booking prevention, spatial Haversine trigonometry for 30 km radius search, and time-gated cancellation middleware.
                  </p>
                </div>
              </div>

              <!-- Right Column: Key Features from CV -->
              <div class="editorial-features-container">
                <div class="editorial-features-title">
                  <i class="fa-solid fa-list-check"></i> Key Verified Features
                </div>
                <div class="editorial-features-grid">
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Event Creation &amp; Management:</strong> Complete lifecycle with organizer ownership and participant limits</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>30 km Location Discovery:</strong> Haversine mathematical radius queries for nearby events</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Overlap Prevention:</strong> Atomic schedule validation preventing concurrent double bookings</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>8-Hour Cutoff Restriction:</strong> Strict time-gated cancellation window safeguarding organizers</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Ownership Security:</strong> Authorization guards preventing unauthorized ticket cancellations</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>JWT &amp; RBAC:</strong> Role-based access control isolating organizers from attendees</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Actions -->
            <div class="editorial-project-actions">
              <a href="https://github.com/MohamedAbusayath/EventBooking" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                <i class="fa-brands fa-github"></i> View GitHub Repository
              </a>
              <a href="#contact" class="btn btn-sm btn-secondary service-cta-trigger" data-service="Booking &amp; Reservation Engine">
                <i class="fa-solid fa-bolt"></i> Hire for Booking System
              </a>
            </div>
          </article>

          <!-- PROJECT 02: ORDER MANAGEMENT API -->
          <article class="editorial-project-card" id="project-02">
            <div class="editorial-project-top">
              <div class="editorial-num-title">
                <span class="editorial-big-num">02</span>
                <div>
                  <h3 class="editorial-project-title">ORDER MANAGEMENT API</h3>
                  <span class="editorial-category-badge">TRANSACTIONAL COMMERCE // MONGODB &amp; MONGOOSE</span>
                </div>
              </div>
              <div class="editorial-project-techs">
                <span class="tech-tag"><i class="fa-brands fa-node-js"></i> Node.js</span>
                <span class="tech-tag"><i class="fa-solid fa-server"></i> Express.js</span>
                <span class="tech-tag"><i class="fa-solid fa-code"></i> TypeScript</span>
                <span class="tech-tag"><i class="fa-solid fa-leaf"></i> MongoDB</span>
                <span class="tech-tag"><i class="fa-solid fa-cubes"></i> Mongoose</span>
                <span class="tech-tag"><i class="fa-solid fa-shield-halved"></i> Joi Validation</span>
              </div>
            </div>

            <div class="editorial-grid-content">
              <!-- Left Column: Problem & Solution -->
              <div class="editorial-problem-solution">
                <div class="editorial-section-box">
                  <div class="editorial-box-heading">
                    <i class="fa-solid fa-triangle-exclamation"></i> The Problem
                  </div>
                  <p class="editorial-box-text">
                    E-commerce checkout pipelines risk inventory count drift during high-concurrency bursts, abuse from customer purchase spam, insecure user credentials, and lack of operational order data exports for store managers.
                  </p>
                </div>

                <div class="editorial-section-box">
                  <div class="editorial-box-heading">
                    <i class="fa-solid fa-gears"></i> The Solution &amp; Architecture
                  </div>
                  <p class="editorial-box-text">
                    Engineered a robust order management API in TypeScript and Express.js on MongoDB. Integrated Joi payload sanitization middleware, rate-gated customer checkout quotas (max 5/day), atomic stock validation, and streaming CSV order reporting.
                  </p>
                </div>
              </div>

              <!-- Right Column: Key Features from CV -->
              <div class="editorial-features-container">
                <div class="editorial-features-title">
                  <i class="fa-solid fa-list-check"></i> Key Verified Features
                </div>
                <div class="editorial-features-grid">
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Full Entity Lifecycle:</strong> Users, Products, Wishlists, Orders, and Purchases</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Max 5 Purchases/Day:</strong> Business logic quota preventing hoarding and checkout bot spam</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Atomic Stock Validation:</strong> Quantity decrements verified against catalog counts</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Streaming CSV Reports:</strong> Administrative order export with dynamic date-range filtering</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Joi Schema Validation:</strong> Pre-route payload sanitization blocking bad requests</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Auth &amp; Password Reset:</strong> JWT tokens, bcrypt salting, and secure reset workflows</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Actions -->
            <div class="editorial-project-actions">
              <a href="https://github.com/MohamedAbusayath/OrderManagement" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                <i class="fa-brands fa-github"></i> View GitHub Repository
              </a>
              <a href="#contact" class="btn btn-sm btn-secondary service-cta-trigger" data-service="E-Commerce Backend &amp; Checkout System">
                <i class="fa-solid fa-bolt"></i> Hire for E-Commerce API
              </a>
            </div>
          </article>

          <!-- PROJECT 03: SWEET SHOP INVENTORY BACKEND -->
          <article class="editorial-project-card" id="project-03">
            <div class="editorial-project-top">
              <div class="editorial-num-title">
                <span class="editorial-big-num">03</span>
                <div>
                  <h3 class="editorial-project-title">SWEET SHOP MANAGEMENT &amp; INVENTORY SYSTEM</h3>
                  <span class="editorial-category-badge">ENTERPRISE INVENTORY // ATOMIC NO-SQL CONCURRENCY</span>
                </div>
              </div>
              <div class="editorial-project-techs">
                <span class="tech-tag"><i class="fa-brands fa-node-js"></i> Node.js</span>
                <span class="tech-tag"><i class="fa-solid fa-server"></i> Express.js</span>
                <span class="tech-tag"><i class="fa-solid fa-leaf"></i> MongoDB</span>
                <span class="tech-tag"><i class="fa-solid fa-cubes"></i> Mongoose</span>
                <span class="tech-tag"><i class="fa-solid fa-key"></i> JWT RBAC</span>
                <span class="tech-tag"><i class="fa-solid fa-vial"></i> Postman</span>
              </div>
            </div>

            <div class="editorial-grid-content">
              <!-- Left Column: Problem & Solution -->
              <div class="editorial-problem-solution">
                <div class="editorial-section-box">
                  <div class="editorial-box-heading">
                    <i class="fa-solid fa-triangle-exclamation"></i> The Problem
                  </div>
                  <p class="editorial-box-text">
                    Simultaneous orders on high-demand inventory items cause race conditions where stock counts drift into negative values, while non-admin users could potentially tamper with product pricing and stock quantities.
                  </p>
                </div>

                <div class="editorial-section-box">
                  <div class="editorial-box-heading">
                    <i class="fa-solid fa-gears"></i> The Solution &amp; Architecture
                  </div>
                  <p class="editorial-box-text">
                    Engineered an Express.js backend using MongoDB atomic <code>$inc</code> operators with <code>quantity: { $gte: count }</code> query guards. Built role-based admin endpoints for restock operations and automated Postman test suites to prevent regressions.
                  </p>
                </div>
              </div>

              <!-- Right Column: Key Features from CV -->
              <div class="editorial-features-container">
                <div class="editorial-features-title">
                  <i class="fa-solid fa-list-check"></i> Key Verified Features
                </div>
                <div class="editorial-features-grid">
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Atomic $inc Decrements:</strong> Prevents race conditions during simultaneous sales</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Zero-Stock Guard:</strong> Returns structured HTTP 409 Conflict when items sell out</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Admin Restock Portal:</strong> Secure endpoints restricted to authenticated managers</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Uniform Error Envelopes:</strong> Centralized exception handler with informative codes</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Postman Test Collection:</strong> Automated pre-flight endpoint and regression tests</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Responsive Frontend UI:</strong> Visual inventory dashboard for retail operations</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Actions -->
            <div class="editorial-project-actions">
              <a href="https://github.com/MohamedAbusayath/sweet-shop-management" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                <i class="fa-brands fa-github"></i> View GitHub Repository
              </a>
              <a href="#contact" class="btn btn-sm btn-secondary service-cta-trigger" data-service="Admin Panel Backend APIs">
                <i class="fa-solid fa-bolt"></i> Hire for Inventory System
              </a>
            </div>
          </article>

          <!-- PROJECT 04: AI HERITAGE SPATIAL MULTIMEDIA GUIDE -->
          <article class="editorial-project-card" id="project-04">
            <div class="editorial-project-top">
              <div class="editorial-num-title">
                <span class="editorial-big-num">04</span>
                <div>
                  <h3 class="editorial-project-title">AI HERITAGE SPATIAL MULTIMEDIA GUIDE</h3>
                  <span class="editorial-category-badge">SPATIAL COMPUTING // AI INTEGRATIONS &amp; STREAMING</span>
                </div>
              </div>
              <div class="editorial-project-techs">
                <span class="tech-tag"><i class="fa-brands fa-node-js"></i> Node.js</span>
                <span class="tech-tag"><i class="fa-solid fa-server"></i> Express.js</span>
                <span class="tech-tag"><i class="fa-solid fa-database"></i> MySQL Spatial</span>
                <span class="tech-tag"><i class="fa-solid fa-brain"></i> Google Gemini AI</span>
                <span class="tech-tag"><i class="fa-solid fa-headphones"></i> Audio Streaming</span>
                <span class="tech-tag"><i class="fa-solid fa-mobile-screen"></i> Responsive UI</span>
              </div>
            </div>

            <div class="editorial-grid-content">
              <!-- Left Column: Problem & Solution -->
              <div class="editorial-problem-solution">
                <div class="editorial-section-box">
                  <div class="editorial-box-heading">
                    <i class="fa-solid fa-triangle-exclamation"></i> The Problem
                  </div>
                  <p class="editorial-box-text">
                    Monuments and heritage tourists require accurate, context-aware architectural knowledge on-site, yet dedicated hardware guides are expensive and manual tour scripts are rigid and unengaging.
                  </p>
                </div>

                <div class="editorial-section-box">
                  <div class="editorial-box-heading">
                    <i class="fa-solid fa-gears"></i> The Solution &amp; Architecture
                  </div>
                  <p class="editorial-box-text">
                    Architected a full-stack spatial web application that queries MySQL spatial databases for nearby landmarks, generates cultural narratives on-the-fly using Google Gemini AI prompt orchestration, and streams chunked audio narration to mobile visitors.
                  </p>
                </div>
              </div>

              <!-- Right Column: Key Features from CV -->
              <div class="editorial-features-container">
                <div class="editorial-features-title">
                  <i class="fa-solid fa-list-check"></i> Key Verified Features
                </div>
                <div class="editorial-features-grid">
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Proximity Geo-Queries:</strong> Real-time distance calculation for historical monuments</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Gemini AI Narratives:</strong> Dynamically generated historical context and highlights</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Chunked Audio Streaming:</strong> Progressive audio delivery with low startup latency</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Mobile Tourist UX:</strong> High-contrast responsive interface optimized for field use</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>API Key Isolation:</strong> Server-side proxy shielding sensitive Gemini AI credentials</span>
                  </div>
                  <div class="editorial-feature-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span><strong>Fallback Resilience:</strong> Cached local narratives served when offline or low connectivity</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Actions -->
            <div class="editorial-project-actions">
              <a href="https://github.com/MohamedAbusayath/ai-heritage-guide" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                <i class="fa-brands fa-github"></i> View GitHub Repository
              </a>
              <a href="#contact" class="btn btn-sm btn-secondary service-cta-trigger" data-service="Third-Party API Integration">
                <i class="fa-solid fa-bolt"></i> Hire for AI / API Project
              </a>
            </div>
          </article>

        </div>
      </div>
    </section>

    <!-- ================================================== -->
    <!-- 4. DEVELOPER OPERATING SYSTEM // RUNTIME LAB (#lab)-->
    <!-- ================================================== -->
    <section class="section-wrapper" id="lab">
      <div class="section-container">
        <div class="section-header">
          <span class="section-kicker">[ DEVELOPER OPERATING SYSTEM // RUNTIME LAB ]</span>
          <h2 class="section-title">INTERACTIVE API TERMINAL &amp; LAB</h2>
          <p class="section-subtitle">
            Inspect live mock endpoints directly in your browser. Switch between endpoints to review HTTP response envelopes, JSON payloads, headers, and execution latency.
          </p>
        </div>

        <!-- Terminal Window Component -->
        <div class="terminal-card">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="dot dot-red"></span>
              <span class="dot dot-yellow"></span>
              <span class="dot dot-green"></span>
            </div>
            <div class="terminal-title">DEVELOPER_OS // v2.6.0 (online)</div>
            <div class="terminal-latency">
              <span class="pulse-dot"></span> 1.2ms
            </div>
          </div>

          <!-- Interactive Tabs -->
          <div class="terminal-tabs" role="tablist" aria-label="Simulated API Endpoints">
            <button type="button" class="terminal-tab active" data-tab="health" role="tab" aria-selected="true" aria-controls="pane-health">
              <span class="method get">GET</span> /api/v1/health
            </button>
            <button type="button" class="terminal-tab" data-tab="auth" role="tab" aria-selected="false" aria-controls="pane-auth">
              <span class="method post">POST</span> /api/v1/auth/login
            </button>
            <button type="button" class="terminal-tab" data-tab="cache" role="tab" aria-selected="false" aria-controls="pane-cache">
              <span class="method get">GET</span> /api/v1/cache/products?page=1
            </button>
            <button type="button" class="terminal-tab" data-tab="webhook" role="tab" aria-selected="false" aria-controls="pane-webhook">
              <span class="method post">POST</span> /api/v1/webhooks/razorpay
            </button>
          </div>

          <!-- Terminal Body & Panes -->
          <div class="terminal-body">
            <!-- Pane 1: Health -->
            <div class="tab-pane active" id="pane-health" role="tabpanel">
              <div class="http-status-line">
                <span class="status-code code-200">200 OK</span>
                <span class="content-type">application/json; charset=utf-8</span>
                <span class="resp-time">Latency: 1.2ms</span>
              </div>
              <pre class="code-block"><code>{
  <span class="json-key">"status"</span>: <span class="json-str">"success"</span>,
  <span class="json-key">"service"</span>: <span class="json-str">"MohamedAbusayath-Studio-API"</span>,
  <span class="json-key">"environment"</span>: <span class="json-str">"production"</span>,
  <span class="json-key">"uptimeSeconds"</span>: <span class="json-num">482910</span>,
  <span class="json-key">"timestamp"</span>: <span class="json-str">"2026-10-08T11:42:00.000Z"</span>,
  <span class="json-key">"subsystems"</span>: {
    <span class="json-key">"database_mysql"</span>: { <span class="json-key">"status"</span>: <span class="json-str">"CONNECTED"</span>, <span class="json-key">"latency"</span>: <span class="json-str">"0.8ms"</span> },
    <span class="json-key">"database_mongodb"</span>: { <span class="json-key">"status"</span>: <span class="json-str">"CONNECTED"</span>, <span class="json-key">"latency"</span>: <span class="json-str">"1.1ms"</span> },
    <span class="json-key">"cache_redis"</span>: { <span class="json-key">"status"</span>: <span class="json-str">"ACTIVE"</span>, <span class="json-key">"hitRatio"</span>: <span class="json-str">"96.4%"</span> }
  }
}</code></pre>
            </div>

            <!-- Pane 2: Auth Login -->
            <div class="tab-pane" id="pane-auth" role="tabpanel">
              <div class="http-status-line">
                <span class="status-code code-200">200 OK</span>
                <span class="content-type">application/json; charset=utf-8</span>
                <span class="resp-time">Latency: 18.4ms (bcrypt compare)</span>
              </div>
              <pre class="code-block"><code>{
  <span class="json-key">"status"</span>: <span class="json-str">"success"</span>,
  <span class="json-key">"message"</span>: <span class="json-str">"Authentication successful"</span>,
  <span class="json-key">"data"</span>: {
    <span class="json-key">"user"</span>: {
      <span class="json-key">"id"</span>: <span class="json-str">"usr_66fa91b01c9a"</span>,
      <span class="json-key">"email"</span>: <span class="json-str">"admin@client-company.com"</span>,
      <span class="json-key">"role"</span>: <span class="json-str">"admin"</span>
    },
    <span class="json-key">"token"</span>: <span class="json-str">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl82NmZhOTFiMDE...v2"</span>,
    <span class="json-key">"expiresIn"</span>: <span class="json-str">"8h"</span>,
    <span class="json-key">"tokenType"</span>: <span class="json-str">"Bearer"</span>
  }
}</code></pre>
            </div>

            <!-- Pane 3: Redis Cache -->
            <div class="tab-pane" id="pane-cache" role="tabpanel">
              <div class="http-status-line">
                <span class="status-code code-200">200 OK</span>
                <span class="content-type">application/json; charset=utf-8</span>
                <span class="resp-time">Latency: 2.1ms (Cache HIT: Redis)</span>
              </div>
              <pre class="code-block"><code>{
  <span class="json-key">"status"</span>: <span class="json-str">"success"</span>,
  <span class="json-key">"source"</span>: <span class="json-str">"CACHE_HIT_REDIS"</span>,
  <span class="json-key">"ttlSecondsRemaining"</span>: <span class="json-num">240</span>,
  <span class="json-key">"pagination"</span>: { <span class="json-key">"page"</span>: <span class="json-num">1</span>, <span class="json-key">"limit"</span>: <span class="json-num">10</span>, <span class="json-key">"total"</span>: <span class="json-num">48</span> },
  <span class="json-key">"data"</span>: [
    { <span class="json-key">"_id"</span>: <span class="json-str">"prod_101"</span>, <span class="json-key">"name"</span>: <span class="json-str">"Wireless Earbuds"</span>, <span class="json-key">"stock"</span>: <span class="json-num">120</span>, <span class="json-key">"price"</span>: <span class="json-num">49.99</span> },
    { <span class="json-key">"_id"</span>: <span class="json-str">"prod_102"</span>, <span class="json-key">"name"</span>: <span class="json-str">"Mechanical Keyboard"</span>, <span class="json-key">"stock"</span>: <span class="json-num">45</span>, <span class="json-key">"price"</span>: <span class="json-num">89.99</span> }
  ]
}</code></pre>
            </div>

            <!-- Pane 4: Razorpay Webhook -->
            <div class="tab-pane" id="pane-webhook" role="tabpanel">
              <div class="http-status-line">
                <span class="status-code code-200">200 OK</span>
                <span class="content-type">application/json; charset=utf-8</span>
                <span class="resp-time">Latency: 9.6ms (HMAC SHA-256 Validated)</span>
              </div>
              <pre class="code-block"><code>{
  <span class="json-key">"status"</span>: <span class="json-str">"success"</span>,
  <span class="json-key">"event"</span>: <span class="json-str">"order.paid"</span>,
  <span class="json-key">"signatureValid"</span>: <span class="json-bool">true</span>,
  <span class="json-key">"processed"</span>: {
    <span class="json-key">"orderId"</span>: <span class="json-str">"order_OIKJ88129031"</span>,
    <span class="json-key">"paymentId"</span>: <span class="json-str">"pay_PJ1928014820"</span>,
    <span class="json-key">"amount"</span>: <span class="json-num">24900</span>,
    <span class="json-key">"currency"</span>: <span class="json-str">"INR"</span>,
    <span class="json-key">"fulfillmentStatus"</span>: <span class="json-str">"CONFIRMED"</span>,
    <span class="json-key">"atomicInventoryDeducted"</span>: <span class="json-bool">true</span>
  }
}</code></pre>
            </div>
          </div>

          <!-- Terminal Footer -->
          <div class="terminal-footer">
            <span><i class="fa-solid fa-code-branch"></i> Node.js v20.x</span>
            <span><i class="fa-solid fa-shield-halved"></i> Helmet &amp; Rate-Limited</span>
            <span><i class="fa-solid fa-database"></i> MySQL &amp; MongoDB Multi-Driver</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================== -->
    <!-- 5. FREELANCE CONVERSION SECTION (#hire)            -->
    <!-- ================================================== -->
    <section class="section-wrapper bg-alt" id="hire">
      <div class="section-container">
        <div class="section-header">
          <span class="section-kicker">[ FREELANCE COLLABORATION // DIRECT ENGAGEMENT ]</span>
          <h2 class="section-title">YOU HAVE THE IDEA. I'LL HELP BUILD THE SYSTEM.</h2>
          <p class="section-subtitle">
            Whether you need a full application, a robust API, or an existing bug resolved—click any requirement below to immediately tailor your project inquiry.
          </p>
        </div>

        <div class="freelance-matrix-wrapper">
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
            <i class="fa-solid fa-hand-pointer"></i> Select What You Need Built:
          </div>

          <!-- 9 Interactive Requirement Chips from User Prompt -->
          <div class="matrix-chips-cloud" id="matrix-chips-cloud">
            <button type="button" class="requirement-chip-btn" data-req="Full-Stack Web Application" data-subject="I need a web application">
              <i class="fa-solid fa-laptop-code"></i> "I need a web application"
            </button>
            <button type="button" class="requirement-chip-btn" data-req="High-Converting Landing Page" data-subject="I need a website">
              <i class="fa-solid fa-globe"></i> "I need a website"
            </button>
            <button type="button" class="requirement-chip-btn" data-req="Node.js REST API Development" data-subject="I need a backend">
              <i class="fa-solid fa-server"></i> "I need a backend"
            </button>
            <button type="button" class="requirement-chip-btn" data-req="Node.js REST API Development" data-subject="I need an API">
              <i class="fa-solid fa-network-wired"></i> "I need an API"
            </button>
            <button type="button" class="requirement-chip-btn" data-req="Admin Panel Backend APIs" data-subject="I need an admin dashboard">
              <i class="fa-solid fa-chart-line"></i> "I need an admin dashboard"
            </button>
            <button type="button" class="requirement-chip-btn" data-req="Payment Gateway &amp; Webhook Integration (Razorpay)" data-subject="I need payment integration">
              <i class="fa-solid fa-credit-card"></i> "I need payment integration"
            </button>
            <button type="button" class="requirement-chip-btn" data-req="Backend Bug Fixing &amp; Debugging" data-subject="I need to fix an existing project">
              <i class="fa-solid fa-wrench"></i> "I need to fix an existing project"
            </button>
            <button type="button" class="requirement-chip-btn" data-req="Database &amp; Redis Caching Integration" data-subject="I need a database connected">
              <i class="fa-solid fa-database"></i> "I need a database connected"
            </button>
            <button type="button" class="requirement-chip-btn" data-req="Third-Party API Integration" data-subject="I need a third-party API integrated">
              <i class="fa-solid fa-plug"></i> "I need a third-party API integrated"
            </button>
          </div>

          <!-- Dedicated Fiverr Studio CTA Banner -->
          <div class="fiverr-studio-block">
            <div class="fiverr-studio-content">
              <div class="fiverr-badge-mono">
                <i class="fa-solid fa-shield-check"></i> FIVERR VERIFIED FREELANCER
              </div>
              <h3 class="fiverr-studio-title">NEED SOMETHING BUILT?</h3>
              <p class="fiverr-studio-desc">
                Find me on Fiverr for freelance development services. Get clear milestones, protected escrow payments, and verified code delivery on the world's leading marketplace.
              </p>
            </div>
            <a href="https://www.fiverr.com/md_abusayath" target="_blank" rel="noopener noreferrer" class="btn btn-fiverr" style="padding: 14px 26px; font-size: 1rem;">
              <i class="fa-solid fa-bolt"></i> VIEW MY FIVERR SERVICES
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================== -->
    <!-- 6. ABOUT THE DEVELOPER & TRUST/CREDIBILITY (#about)-->
    <!-- ================================================== -->
    <section class="section-wrapper" id="about">
      <div class="section-container">
        <div class="section-header">
          <span class="section-kicker">[ BACKGROUND // PROFESSIONAL PROOFS ]</span>
          <h2 class="section-title">ABOUT THE DEVELOPER</h2>
          <p class="section-subtitle">
            Full-Stack Developer with hands-on backend internship experience and Computer Science engineering foundations.
          </p>
        </div>

        <div class="about-grid">
          <!-- Left Column: Verified Profile Card -->
          <div class="about-card profile-bio-card">
            <div class="about-profile-header">
              <div class="avatar-wrapper">
                <img src="img/mohamed-abusayath.png" alt="Mohamed Abusayath S" class="profile-avatar" loading="lazy">
                <span class="avatar-badge" title="Active Developer"><i class="fa-solid fa-check"></i></span>
              </div>
              <div class="profile-meta">
                <h3 class="profile-name">Mohamed Abusayath S</h3>
                <p class="profile-role">Full-Stack Developer &amp; Freelancer</p>
                <p class="profile-location"><i class="fa-solid fa-location-dot"></i> Tamil Nadu, India</p>
              </div>
            </div>

            <div class="about-text-content">
              <div style="background: var(--bg-secondary); border: 1px solid var(--border-medium); border-left: 3px solid var(--accent-primary); border-radius: var(--radius-sm); padding: 12px 14px; margin-bottom: 16px;">
                <div style="font-family: var(--font-mono); font-size: 0.76rem; color: var(--accent-primary); font-weight: 700; text-transform: uppercase;">
                  CURRENT PROFESSIONAL ROLE (CV VERIFIED)
                </div>
                <div style="font-size: 0.96rem; font-weight: 700; color: var(--text-highlight); margin-top: 2px;">
                  Backend Developer Intern
                </div>
                <div style="font-size: 0.84rem; color: var(--text-secondary);">
                  Doodleblue Innovations Pvt. Ltd. &bull; Jun 2026 – Present
                </div>
              </div>

              <p>
                I am a <strong>Computer Science and Engineering graduate</strong> (St. Michael College of Engineering and Technology, 2021–2025, CGPA 7.5/10) with practical industry experience engineering backend systems, REST APIs, and responsive web products.
              </p>
              <p>
                In my professional work, I develop production-grade REST endpoints with <strong>Node.js, Express.js, TypeScript, MongoDB, MySQL, and Redis</strong>. I implement role-based access control (RBAC), write Joi validation middleware, construct multi-table relational queries with Sequelize, and integrate secure third-party payment gateways with <strong>Razorpay</strong> and cryptographic HMAC webhooks.
              </p>
            </div>

            <div class="about-highlights-pills">
              <span class="highlight-pill"><i class="fa-brands fa-node-js"></i> Node.js &amp; Express</span>
              <span class="highlight-pill"><i class="fa-solid fa-database"></i> MySQL &amp; MongoDB</span>
              <span class="highlight-pill"><i class="fa-solid fa-bolt"></i> Redis Caching</span>
              <span class="highlight-pill"><i class="fa-solid fa-credit-card"></i> Razorpay &amp; Webhooks</span>
              <span class="highlight-pill"><i class="fa-solid fa-shield-halved"></i> JWT &amp; bcrypt Auth</span>
              <span class="highlight-pill"><i class="fa-solid fa-vial"></i> Postman Test Suites</span>
            </div>
          </div>

          <!-- Right Column: "WHY SHOULD A CLIENT TRUST ME?" (6 Engineering Proofs) -->
          <div class="about-pillars">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 800; color: var(--accent-primary); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">
              [ PROOF OVER PROMISES ]
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-highlight); margin-bottom: 16px;">
              WHY SHOULD A CLIENT TRUST ME?
            </h3>

            <div class="why-grid" style="display: grid; grid-template-columns: 1fr; gap: 12px;">
              <div class="rule-box">
                <i class="fa-solid fa-cubes-stacked"></i>
                <div>
                  <strong>01 // Production-First API Architecture</strong>
                  <p>Strict separation of concerns across Routes, Controllers, Services, and Data Access layers with uniform JSON response envelopes and predictable HTTP status codes.</p>
                </div>
              </div>

              <div class="rule-box">
                <i class="fa-solid fa-database"></i>
                <div>
                  <strong>02 // Dual-Database Mastery</strong>
                  <p>Relational modeling in MySQL with foreign key constraints and Sequelize ORM alongside MongoDB document schemas with compound indexing and Mongoose models.</p>
                </div>
              </div>

              <div class="rule-box">
                <i class="fa-solid fa-shield-virus"></i>
                <div>
                  <strong>03 // Security &amp; Defensive Coding</strong>
                  <p>Payload sanitization with Joi, rate-limiting, CORS configuration, salted bcrypt password hashing, and token signature verification preventing unauthorized access.</p>
                </div>
              </div>

              <div class="rule-box">
                <i class="fa-solid fa-gears"></i>
                <div>
                  <strong>04 // Real Business Logic Implementation</strong>
                  <p>Proven implementations of time-gated cancellation windows, atomic <code>$inc</code> inventory decrements, and Haversine spatial radius discovery.</p>
                </div>
              </div>

              <div class="rule-box">
                <i class="fa-solid fa-vial-circle-check"></i>
                <div>
                  <strong>05 // Deep Debugging &amp; Postman Suites</strong>
                  <p>Every endpoint is verified with automated Postman test collections, asserting response status codes, payload schemas, and edge-case exceptions before delivery.</p>
                </div>
              </div>

              <div class="rule-box">
                <i class="fa-brands fa-git-alt"></i>
                <div>
                  <strong>06 // Clean Git &amp; Handover Discipline</strong>
                  <p>Semantic commits, clear branch workflows, containerized Docker configurations, and comprehensive README documentation for stress-free client handover.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================== -->
    <!-- 7. TECHNICAL CONSTELLATION (#skills)              -->
    <!-- ================================================== -->
    <section class="section-wrapper bg-alt" id="skills">
      <div class="section-container">
        <div class="section-header">
          <span class="section-kicker">[ TECHNICAL CONSTELLATION // TOOLKIT ]</span>
          <h2 class="section-title">TECHNICAL STACK &amp; CONSTELLATION</h2>
          <p class="section-subtitle">
            Categorized tools, runtimes, and databases verified by codebase implementations and internship experience. No arbitrary percentages—only real engineering tools.
          </p>
        </div>

        <div class="constellation-grid-layout">
          <!-- CLUSTER 1: BUILD -->
          <div class="constellation-cluster">
            <div class="constellation-header">
              <i class="fa-solid fa-code"></i> BUILD
            </div>
            <div class="constellation-stack-list">
              <div class="constellation-node-pill">
                <span>Node.js</span> <span class="tech-spec">Runtime / V8</span>
              </div>
              <div class="constellation-node-pill">
                <span>Express.js</span> <span class="tech-spec">REST Engine</span>
              </div>
              <div class="constellation-node-pill">
                <span>TypeScript</span> <span class="tech-spec">Static Types</span>
              </div>
              <div class="constellation-node-pill">
                <span>React</span> <span class="tech-spec">Frontend UI</span>
              </div>
              <div class="constellation-node-pill">
                <span>JavaScript (ES6+)</span> <span class="tech-spec">Async / DOM</span>
              </div>
            </div>
          </div>

          <!-- CLUSTER 2: DATA -->
          <div class="constellation-cluster">
            <div class="constellation-header">
              <i class="fa-solid fa-database"></i> DATA
            </div>
            <div class="constellation-stack-list">
              <div class="constellation-node-pill">
                <span>MongoDB</span> <span class="tech-spec">NoSQL / BSON</span>
              </div>
              <div class="constellation-node-pill">
                <span>MySQL</span> <span class="tech-spec">Relational / SQL</span>
              </div>
              <div class="constellation-node-pill">
                <span>Mongoose</span> <span class="tech-spec">ODM Schemas</span>
              </div>
              <div class="constellation-node-pill">
                <span>Sequelize</span> <span class="tech-spec">SQL ORM</span>
              </div>
              <div class="constellation-node-pill">
                <span>Redis</span> <span class="tech-spec">Cache-Aside</span>
              </div>
            </div>
          </div>

          <!-- CLUSTER 3: TOOLS -->
          <div class="constellation-cluster">
            <div class="constellation-header">
              <i class="fa-solid fa-wrench"></i> TOOLS
            </div>
            <div class="constellation-stack-list">
              <div class="constellation-node-pill">
                <span>Git</span> <span class="tech-spec">Version Control</span>
              </div>
              <div class="constellation-node-pill">
                <span>GitHub</span> <span class="tech-spec">CI / Repos</span>
              </div>
              <div class="constellation-node-pill">
                <span>Postman</span> <span class="tech-spec">Test Suites</span>
              </div>
              <div class="constellation-node-pill">
                <span>Docker</span> <span class="tech-spec">Containers</span>
              </div>
              <div class="constellation-node-pill">
                <span>Swagger / OpenAPI</span> <span class="tech-spec">Documentation</span>
              </div>
            </div>
          </div>

          <!-- CLUSTER 4: INTEGRATE -->
          <div class="constellation-cluster">
            <div class="constellation-header">
              <i class="fa-solid fa-plug"></i> INTEGRATE
            </div>
            <div class="constellation-stack-list">
              <div class="constellation-node-pill">
                <span>Razorpay</span> <span class="tech-spec">Payments SDK</span>
              </div>
              <div class="constellation-node-pill">
                <span>Webhooks</span> <span class="tech-spec">HMAC SHA-256</span>
              </div>
              <div class="constellation-node-pill">
                <span>Cloudinary</span> <span class="tech-spec">CDN Uploads</span>
              </div>
              <div class="constellation-node-pill">
                <span>REST APIs</span> <span class="tech-spec">Third-Party SaaS</span>
              </div>
              <div class="constellation-node-pill">
                <span>JWT &amp; bcrypt</span> <span class="tech-spec">Auth &amp; RBAC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================== -->
    <!-- 8. EDUCATION & VERIFIED CREDENTIALS (#education)   -->
    <!-- ================================================== -->
    <section class="section-wrapper" id="education">
      <div class="section-container">
        <div class="section-header">
          <span class="section-kicker">[ VERIFIED CREDENTIALS // ACADEMIC FOUNDATION ]</span>
          <h2 class="section-title">Education &amp; Certifications</h2>
          <p class="section-subtitle">
            Verified academic credentials and technical certifications preserved directly from my CV.
          </p>
        </div>

        <div class="edu-cert-layout">
          <!-- Left Column: Education Timeline -->
          <div class="edu-column">
            <h3 class="subsection-title"><i class="fa-solid fa-graduation-cap"></i> Academic Education</h3>

            <div class="edu-cards-list">
              <!-- College -->
              <div class="edu-card">
                <div class="edu-icon-badge"><i class="fa-solid fa-university"></i></div>
                <div class="edu-card-content">
                  <span class="edu-year">2021 — 2025</span>
                  <h4 class="edu-degree">B.E. Computer Science &amp; Engineering</h4>
                  <p class="edu-institution">St. Michael College of Engineering &amp; Technology</p>
                  <p class="edu-score">CGPA: <strong>7.5 / 10</strong></p>
                </div>
              </div>

              <!-- HSC -->
              <div class="edu-card">
                <div class="edu-icon-badge"><i class="fa-solid fa-school"></i></div>
                <div class="edu-card-content">
                  <span class="edu-year">2020 — 2021</span>
                  <h4 class="edu-degree">Higher Secondary Certificate (HSC - 12th)</h4>
                  <p class="edu-institution">Britto Higher Secondary School</p>
                  <p class="edu-score">Percentage: <strong>83%</strong></p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Verified Certifications -->
          <div class="cert-column">
            <h3 class="subsection-title"><i class="fa-solid fa-certificate"></i> Verified Certifications</h3>

            <div class="cert-cards-grid">
              <!-- Cert 1: SQL and Relational Databases 101 -->
              <div class="cert-card">
                <div class="cert-thumb-wrapper">
                  <img src="img/sql.png" alt="SQL and Relational Databases Certificate" loading="lazy">
                </div>
                <div class="cert-details">
                  <h4 class="cert-name">SQL and Relational Databases 101</h4>
                  <p class="cert-issuer">Cognitive Class / IBM</p>
                  <a href="https://courses.cognitiveclass.ai/certificates/e87e02bf84a842beb7048094b63a73a8" target="_blank" rel="noopener noreferrer" class="cert-link">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Verify Certificate
                  </a>
                </div>
              </div>

              <!-- Cert 2: JavaScript Udemy -->
              <div class="cert-card">
                <div class="cert-thumb-wrapper">
                  <img src="img/javaScriptCertificate-1.png" alt="JavaScript Certificate" loading="lazy">
                </div>
                <div class="cert-details">
                  <h4 class="cert-name">JavaScript Programming</h4>
                  <p class="cert-issuer">Udemy</p>
                  <a href="img/javaScriptCertificate-1.png" target="_blank" rel="noopener noreferrer" class="cert-link cert-preview-trigger">
                    <i class="fa-solid fa-eye"></i> View Certificate
                  </a>
                </div>
              </div>

              <!-- Cert 3: Generative AI GUVI -->
              <div class="cert-card">
                <div class="cert-thumb-wrapper">
                  <img src="img/GuviCertification - b3J11c03e0p571L93j.png" alt="Generative AI Certificate" loading="lazy">
                </div>
                <div class="cert-details">
                  <h4 class="cert-name">Generative AI Fundamentals</h4>
                  <p class="cert-issuer">GUVI Geek Network</p>
                  <a href="img/GuviCertification - b3J11c03e0p571L93j.png" target="_blank" rel="noopener noreferrer" class="cert-link cert-preview-trigger">
                    <i class="fa-solid fa-eye"></i> View Certificate
                  </a>
                </div>
              </div>

              <!-- Cert 4: Java Concurrency & Multithreading -->
              <div class="cert-card">
                <div class="cert-thumb-wrapper">
                  <img src="img/java-multi-thread.png" alt="Java Concurrency Certificate" loading="lazy">
                </div>
                <div class="cert-details">
                  <h4 class="cert-name">Java Concurrency &amp; Multithreading</h4>
                  <p class="cert-issuer">Scaler Masterclass</p>
                  <a href="img/java-multi-thread.png" target="_blank" rel="noopener noreferrer" class="cert-link cert-preview-trigger">
                    <i class="fa-solid fa-eye"></i> View Certificate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================== -->
    <!-- 9. CONTACT EXPERIENCE: "LET'S BUILD SOMETHING."    -->
    <!-- ================================================== -->
    <section class="section-wrapper bg-alt" id="contact">
      <div class="section-container">
        <div class="section-header">
          <span class="section-kicker">[ INITIATE COLLABORATION // START A PROJECT ]</span>
          <h2 class="section-title">LET'S BUILD SOMETHING.</h2>
          <p class="section-subtitle">
            Tell me what you're building. What problem are you trying to solve? Whether it is an end-to-end web application, an API backend, a payment integration, or a database fix—let's discuss your timeline and scope.
          </p>
        </div>

        <div class="contact-grid-container">
          <!-- Direct Channels & Platforms -->
          <div class="contact-details-panel">
            <h3 class="contact-panel-title">Direct Studio Channels</h3>
            <p class="contact-panel-desc">Fastest response times across direct email, Fiverr milestones, and professional networks.</p>

            <div class="contact-channel-list">
              <!-- Fiverr Profile -->
              <div class="contact-channel-card">
                <div class="channel-icon" style="color: #1dbf73; background-color: rgba(29, 191, 115, 0.15);"><i class="fa-solid fa-bolt"></i></div>
                <div class="channel-info">
                  <span class="channel-label">Fiverr Profile (Verified)</span>
                  <a href="https://www.fiverr.com/md_abusayath" target="_blank" rel="noopener noreferrer" class="channel-val">fiverr.com/md_abusayath</a>
                </div>
                <a href="https://www.fiverr.com/md_abusayath" target="_blank" rel="noopener noreferrer" class="channel-external-btn" aria-label="Open Fiverr" title="Open Fiverr">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>

              <!-- Direct Email -->
              <div class="contact-channel-card">
                <div class="channel-icon"><i class="fa-solid fa-envelope"></i></div>
                <div class="channel-info">
                  <span class="channel-label">Direct Email</span>
                  <a href="mailto:mohamedabusayaths@gmail.com" class="channel-val">mohamedabusayaths@gmail.com</a>
                </div>
                <button type="button" class="copy-btn" data-copy="mohamedabusayaths@gmail.com" aria-label="Copy Email" title="Copy Email">
                  <i class="fa-regular fa-copy"></i>
                </button>
              </div>

              <!-- LinkedIn -->
              <div class="contact-channel-card">
                <div class="channel-icon"><i class="fa-brands fa-linkedin-in"></i></div>
                <div class="channel-info">
                  <span class="channel-label">LinkedIn</span>
                  <a href="https://www.linkedin.com/in/mohamed-abusayath-s-3028602a0/" target="_blank" rel="noopener noreferrer" class="channel-val">linkedin.com/in/mohamed-abusayath-s</a>
                </div>
                <a href="https://www.linkedin.com/in/mohamed-abusayath-s-3028602a0/" target="_blank" rel="noopener noreferrer" class="channel-external-btn" aria-label="Open LinkedIn" title="Open LinkedIn">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>

              <!-- GitHub -->
              <div class="contact-channel-card">
                <div class="channel-icon"><i class="fa-brands fa-github"></i></div>
                <div class="channel-info">
                  <span class="channel-label">GitHub Repositories</span>
                  <a href="https://github.com/MohamedAbusayath" target="_blank" rel="noopener noreferrer" class="channel-val">github.com/MohamedAbusayath</a>
                </div>
                <a href="https://github.com/MohamedAbusayath" target="_blank" rel="noopener noreferrer" class="channel-external-btn" aria-label="Open GitHub" title="Open GitHub">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>

              <!-- Phone -->
              <div class="contact-channel-card">
                <div class="channel-icon"><i class="fa-solid fa-phone"></i></div>
                <div class="channel-info">
                  <span class="channel-label">Direct Phone</span>
                  <a href="tel:8870912422" class="channel-val">+91 8870912422</a>
                </div>
                <button type="button" class="copy-btn" data-copy="+918870912422" aria-label="Copy Phone Number" title="Copy Phone">
                  <i class="fa-regular fa-copy"></i>
                </button>
              </div>

              <!-- Location -->
              <div class="contact-channel-card">
                <div class="channel-icon"><i class="fa-solid fa-location-dot"></i></div>
                <div class="channel-info">
                  <span class="channel-label">Base Location</span>
                  <span class="channel-val">Tamil Nadu, India (Available for Remote Globally)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Project Inquiry Form -->
          <div class="contact-form-panel">
            <h3 class="contact-panel-title">Start a Project</h3>
            <p class="contact-panel-desc">Tell me about what you are building for a prompt scope estimate or technical proposal.</p>

            <form id="contact-form" class="styled-contact-form">
              <div class="form-group">
                <label for="contact-name">Your Name</label>
                <div class="input-wrapper">
                  <i class="fa-regular fa-user input-icon"></i>
                  <input type="text" id="contact-name" name="name" placeholder="e.g. Alex (Founder / Project Lead)" required>
                </div>
              </div>

              <div class="form-group">
                <label for="contact-email">Your Email</label>
                <div class="input-wrapper">
                  <i class="fa-regular fa-envelope input-icon"></i>
                  <input type="email" id="contact-email" name="email" placeholder="e.g. alex@company.com" required>
                </div>
              </div>

              <div class="form-group">
                <label for="project-type">Project Requirement / Service</label>
                <div class="input-wrapper">
                  <i class="fa-solid fa-list-check input-icon"></i>
                  <select id="project-type" name="project_type">
                    <option value="General Inquiry">Select your project need...</option>
                    <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                    <option value="High-Converting Landing Page">High-Converting Landing Page</option>
                    <option value="Admin Panel &amp; Backoffice Tool">Admin Panel &amp; Backoffice Tool</option>
                    <option value="Analytics &amp; Metrics Dashboard">Analytics &amp; Metrics Dashboard</option>
                    <option value="Node.js REST API Development">Node.js REST API Development</option>
                    <option value="E-Commerce Backend &amp; Checkout System">E-Commerce Backend &amp; Checkout System</option>
                    <option value="Booking &amp; Reservation Engine">Booking &amp; Reservation Engine</option>
                    <option value="Payment Gateway Integration (Razorpay)">Payment Gateway Integration (Razorpay)</option>
                    <option value="Database Design &amp; Redis Caching">Database Design &amp; Redis Caching</option>
                    <option value="Third-Party API Integration">Third-Party API Integration</option>
                    <option value="Backend Bug Fixing &amp; Debugging">Backend Bug Fixing &amp; Debugging</option>
                    <option value="Full-Time Backend Developer Opportunity">Full-Time Backend Developer Opportunity</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="contact-subject">Subject</label>
                <div class="input-wrapper">
                  <i class="fa-regular fa-bookmark input-icon"></i>
                  <input type="text" id="contact-subject" name="subject" placeholder="e.g. Project Scope: Node.js API Development" required>
                </div>
              </div>

              <div class="form-group">
                <label for="contact-message">What Problem Are You Trying to Solve?</label>
                <div class="input-wrapper">
                  <textarea id="contact-message" name="message" rows="4" placeholder="Describe what you are building, existing stack, expected deliverables, or timeline requirements..." required></textarea>
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-block" id="form-submit-btn">
                <i class="fa-solid fa-paper-plane"></i> [ START A PROJECT ]
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- ================================================== -->
  <!-- 10. DIGITAL STUDIO FOOTER                          -->
  <!-- ================================================== -->
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#hero" class="brand-logo" aria-label="Mohamed Abusayath Studio">
            <span class="brand-monogram">MA.S</span>
            <span class="brand-sep">/</span>
            <span class="brand-name">Mohamed Abusayath</span>
            <span class="studio-badge-tag">[STUDIO // OS]</span>
          </a>
          <p class="footer-tagline">
            Full-Stack Developer building interfaces, APIs, backend systems, and digital experiences for businesses and startups.
          </p>
        </div>

        <div class="footer-links-col">
          <h4 class="footer-col-title">Navigation</h4>
          <a href="#work">WORK</a>
          <a href="#capabilities">BUILDS</a>
          <a href="#services">SERVICES</a>
          <a href="#layers">LAYERS</a>
          <a href="#lab">LAB</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </div>

        <div class="footer-links-col">
          <h4 class="footer-col-title">Freelance &amp; Channels</h4>
          <a href="https://www.fiverr.com/md_abusayath" target="_blank" rel="noopener noreferrer" style="color: #1dbf73; font-weight: 600;"><i class="fa-solid fa-bolt"></i> View Fiverr Services</a>
          <a href="https://github.com/MohamedAbusayath" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> GitHub Profile</a>
          <a href="https://www.linkedin.com/in/mohamed-abusayath-s-3028602a0/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin-in"></i> LinkedIn Profile</a>
          <a href="resume/MohamedAbusayathS.pdf" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-file-arrow-down"></i> Download Resume (PDF)</a>
          <a href="mailto:mohamedabusayaths@gmail.com"><i class="fa-solid fa-envelope"></i> Direct Email</a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright-text">
          &copy; <span id="current-year"></span> Mohamed Abusayath S. Digital Studio &bull; Full-Stack Freelancer.
        </p>

        <a href="#hero" class="back-to-top" aria-label="Back to top" title="Back to top">
          <i class="fa-solid fa-chevron-up"></i>
        </a>
      </div>
    </div>
  </footer>\n\n"""

new_content = orig[:start_idx] + studio_sections + orig[end_idx:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully updated index.html! New length:", len(new_content))
