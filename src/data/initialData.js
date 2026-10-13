export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Enterprise Data Integration & REST Sync',
    year: '2025',
    category: 'Data Engineering',
    featured: true,
    description: 'Automated architecture synchronizing complex enterprise project schemas, task hierarchies, and resource allocations into OpenProject via REST APIs with idempotent retry logic.',
    metrics: '99.8% sync reliability • 40 hrs/mo saved',
    tags: ['Python', 'REST API', 'OpenProject', 'Data Engineering', 'ETL'],
    link: 'https://github.com',
    status: 'Production',
    caseStudy: {
      problem: 'Legacy project schemas, task hierarchies, and resource allocations across disparate systems were synchronized via brittle manual spreadsheets, causing continuous data drift, lost billable hours, and sync collisions during concurrent updates.',
      architectureNodes: [
        { title: 'Source Schemas & DB Logs', desc: 'Raw enterprise ERP & task payloads ingested via webhook/polling' },
        { title: 'Python Ingestion & Validation', desc: 'Idempotency key hashing, schema coercion & strict Pydantic model checks' },
        { title: 'REST API Gateway / Worker', desc: 'Exponential backoff retry queues & adaptive token-bucket throttler' },
        { title: 'OpenProject Enterprise Sync', desc: 'Canonical relational entities, hierarchical mapping & state ledger' }
      ],
      decisions: [
        { title: 'SHA-256 Idempotency Keys', desc: 'Implemented deterministic payload hashing to eliminate duplicate task creation during transient network timeouts.' },
        { title: 'Adaptive Throttler & Jitter', desc: 'Designed a token-bucket rate limiter that completely eliminated 429 rate-limit exceptions on upstream endpoints.' },
        { title: 'Stateful Checkpoint Ledger', desc: 'Recorded transactional state cursors in SQLite staging so interruptions resume cleanly without re-processing.' }
      ],
      impact: 'Achieved 99.8% sync reliability, reduced manual cross-entry overhead by 40 hours/month, and eliminated duplicate records across 250k+ monthly entity updates.'
    }
  },
  {
    id: 'proj-2',
    title: 'Biometric Session & OPEX Analytics Dashboard',
    year: '2025',
    category: 'Data Engineering',
    featured: true,
    description: 'Interactive management dashboard processing raw employee punch logs into granular work/break durations, shift adherence metrics, and operational cost leakage insights.',
    metrics: 'Processes 50k+ punch events • Real-time Plotly',
    tags: ['Python', 'Dash', 'Plotly', 'Pandas', 'SQL'],
    link: 'https://github.com',
    status: 'Production',
    caseStudy: {
      problem: 'Fragmented biometric punch logs across multiple operating facilities obscured shift adherence, break leakage, and overtime anomalies, resulting in uncontrolled monthly labor cost spikes and delayed payroll reconciliation.',
      architectureNodes: [
        { title: 'Hardware Biometric Readers', desc: '50,000+ daily punch events streamed from facility terminals' },
        { title: 'Python ETL & Cleaning Pipeline', desc: 'Vectorized outlier detection, session pairing & break classification' },
        { title: 'Relational Analytics Engine', desc: 'SQL window functions, aggregation rollups & anomaly scoring' },
        { title: 'Plotly / Dash Telemetry UI', desc: 'Sub-second interactive filtering & executive OPEX leakage heatmaps' }
      ],
      decisions: [
        { title: 'Vectorized Window Analytics', desc: 'Replaced iterative Python loops with vectorized Pandas and SQL LEAD/LAG window queries, yielding a 12x performance boost.' },
        { title: 'In-Memory Shift Aggregation', desc: 'Pre-computed daily facility shifts into memory caches to deliver sub-15ms dashboard response times.' },
        { title: 'Statistical Anomaly Imputation', desc: 'Flagged missed punch-outs using rolling historical probability rather than silent discards or hard halts.' }
      ],
      impact: 'Processes 50k+ punch events per shift with sub-15ms visual responsiveness, automated identification of 40% in manual ops overhead, and enabled immediate supervisor intervention.'
    }
  },
  {
    id: 'proj-3',
    title: 'Full-Stack Express & AI Workflow Engine',
    year: '2025',
    category: 'AI & Automation',
    featured: true,
    description: 'Modular backend service with custom validation middleware, asynchronous job processing, and Model Context Protocol (MCP) LLM agent tool calling.',
    metrics: 'Sub-120ms API latency • Dockerized',
    tags: ['Node.js', 'Express', 'Docker', 'Claude API', 'MCP'],
    link: 'https://github.com',
    status: 'Active',
    caseStudy: {
      problem: 'Integrating LLM intelligence into deterministic backend business workflows requires strict payload validation, agentic tool execution, and low-latency response times without locking up the server event loop.',
      architectureNodes: [
        { title: 'Client Webhook & Gateway', desc: 'JSON payloads with JWT signature validation & rate limiting' },
        { title: 'Express Middleware & Sandbox', desc: 'Zod schema validation, parameter sanitization & request context injection' },
        { title: 'Model Context Protocol (MCP) Host', desc: 'Dynamic tool discovery, schema reflection & sandboxed tool invocation' },
        { title: 'Claude API & Async Worker Queue', desc: 'Streaming structured responses, tool execution & telemetry logs' }
      ],
      decisions: [
        { title: 'Model Context Protocol (MCP)', desc: 'Standardized tool interfaces via JSON-RPC, decoupling LLM reasoning from concrete tool implementations.' },
        { title: 'Async Job Worker Isolation', desc: 'Offloaded heavy tool executions to background queues, keeping public REST responses strictly under 120ms.' },
        { title: 'Multi-Stage Dockerization', desc: 'Structured builds with Node Alpine and non-root security contexts to minimize memory footprints.' }
      ],
      impact: 'Delivered sub-120ms API response latency, zero unhandled tool-call failures, and streamlined MCP agent integration into production Express environments.'
    }
  },
  {
    id: 'proj-4',
    title: 'Short-Term Rental (STR) Notion OS',
    year: '2024',
    category: 'Product & Creative',
    featured: false,
    description: 'Multi-tier Notion workspace system built for Airbnb & property hosts featuring automated booking ledgers, cleaning checklists, and unit economics tracking.',
    metrics: 'Published on Gumroad • 3 Tiered Packages',
    tags: ['Notion', 'Systems Design', 'Gumroad', 'Product'],
    link: 'https://gumroad.com',
    status: 'Live Product',
    caseStudy: {
      problem: 'Independent Airbnb and STR operators juggle fragmented communication, inconsistent turnaround turnover checklists, and chaotic manual bookkeeping across multiple booking channels.',
      architectureNodes: [
        { title: 'Multi-Channel Bookings', desc: 'Airbnb, VRBO, and direct reservations aggregated into central intake' },
        { title: 'Relational Database Core', desc: 'Interconnected Units, Bookings, Guests, and Maintenance ledgers' },
        { title: 'Turnover Checklist Engine', desc: 'Dynamic task assignment with real-time photo verification for cleaners' },
        { title: 'Unit Economics Dashboard', desc: 'Automated RevPAR, occupancy rate, and net yield calculators' }
      ],
      decisions: [
        { title: 'Relational Rollup Architecture', desc: 'Engineered multi-level Notion database formulas calculating net profit per unit without external spreadsheets.' },
        { title: 'Mobile-Optimized Staff Views', desc: 'Designed high-contrast, streamlined checklist views tailored for on-site cleaning staff smartphones.' }
      ],
      impact: 'Published on Gumroad across 3 commercial tiers, saving property managers an estimated 10+ hours per week per property.'
    }
  },
  {
    id: 'proj-5',
    title: 'Seat Secure — Strategy & Competitor Audit',
    year: '2024',
    category: 'Product & Creative',
    featured: false,
    description: 'Comprehensive market research, user funnel teardown, and pricing strategy for an IIT/NIT JoSAA engineering counseling decision platform.',
    metrics: '12+ Competitors Analyzed • GTM Roadmap',
    tags: ['Product Strategy', 'Market Research', 'EdTech', 'Analytics'],
    link: '#',
    status: 'Completed',
    caseStudy: {
      problem: 'Aspiring engineering candidates navigating the convoluted JoSAA counseling process suffered from choice anxiety, lack of opening/closing rank transparency, and predatory counseling agencies.',
      architectureNodes: [
        { title: '12+ Competitor Product Audits', desc: 'Feature matrices, pricing tiers, and UX teardowns across counseling tools' },
        { title: 'Historical Cutoff Data Analysis', desc: 'Analyzed 5 years of JoSAA rank shifts and seat allocation trends' },
        { title: 'Funnel Friction Diagnosis', desc: 'Mapped user drop-off points during choice-filling simulator sessions' },
        { title: 'GTM Strategy & Product Spec', desc: 'Designed freemium predictive model and transparent monetization roadmap' }
      ],
      decisions: [
        { title: 'Predictive Rank Banding', desc: 'Advocated for statistical confidence bands (Safe / Moderate / Ambitious) instead of false precision cutoff claims.' },
        { title: 'Value-First Freemium Gate', desc: 'Positioned basic rank simulation for free while gating deep multi-college scenario reports.' }
      ],
      impact: 'Delivered an exhaustive 40-page strategic audit document identifying 3 major UX bottlenecks in competitors and establishing a validated launch roadmap.'
    }
  },
  {
    id: 'proj-6',
    title: '3D Sculpted Clay Lighter Sleeves',
    year: '2024',
    category: 'Product & Creative',
    featured: false,
    description: 'Custom hand-sculpted and painted polymer/air-dry clay sleeves featuring high-relief botanical vines and coiled serpent motifs with protective resin finish.',
    metrics: 'Bespoke Craft • Physical Design',
    tags: ['3D Clay', 'Hand-Painted', 'Industrial Craft', 'Art'],
    link: '#',
    status: 'Showcase',
    caseStudy: {
      problem: 'Everyday utility tools lack ergonomic tactile character, individual craftsmanship, and physical durability, presenting an opportunity for functional art combining sculpted relief with everyday carry utility.',
      architectureNodes: [
        { title: 'Concept Sketches & Armature', desc: 'Botanical vine and serpent relief schematics dimensioned to standard sleeve fits' },
        { title: 'Polymer Clay Sculpting', desc: 'Layered high-relief tactile textures cured under controlled temperature' },
        { title: 'Fine Acrylic Pigmentation', desc: 'Multiple shadow washes, gradient basecoats, and dry-brush highlights' },
        { title: 'Protective Resin Sealing', desc: 'Dual-coat impact-resistant, heat-tolerant glossy UV resin topcoat' }
      ],
      decisions: [
        { title: 'Two-Part Structural Curing', desc: 'Reinforced high-stress base joints with epoxy bonding to prevent micro-fractures under repeated sleeve insertion.' },
        { title: 'Heat-Tolerant UV Resin', desc: 'Selected specialized UV-curable polymer coats to resist pocket friction and heat exposure.' }
      ],
      impact: 'Created bespoke physical design showcase demonstrating hands-on material mastery, tight mechanical tolerances, and artistic craft.'
    }
  },
  {
    id: 'proj-7',
    title: 'Containerized Python & Node Micro-Pipelines',
    year: '2024',
    category: 'Backend & Web',
    featured: false,
    description: 'Multi-stage Docker builds and Docker Compose orchestration templates for running isolated Python ETL workers alongside Express REST gateways.',
    metrics: '65% smaller image footprint',
    tags: ['Docker', 'Linux', 'Python', 'Node.js', 'DevOps'],
    link: 'https://github.com',
    status: 'Open Source',
    caseStudy: {
      problem: 'Developing and deploying heterogeneous microservices (Python for data processing and Node.js for REST endpoints) caused environment parity drift and bloated deployment images.',
      architectureNodes: [
        { title: 'Multi-Stage Dockerfile', desc: 'Alpine Linux base, isolated builder stages & minimal final runtimes' },
        { title: 'Compose Network Topology', desc: 'Internal isolated bridge networks with persistent volume mounts' },
        { title: 'Python Worker Container', desc: 'Background stream processing, file ingestion & ETL transformations' },
        { title: 'Express Gateway Container', desc: 'Public reverse-proxy, health probe endpoint & API routing' }
      ],
      decisions: [
        { title: 'Multi-Stage Build Pipeline', desc: 'Discarded build tools, compiler headers, and pip caches from final images, reducing total container size by 65%.' },
        { title: 'Explicit Service Healthchecks', desc: 'Configured robust healthcheck probes and restart policies to guarantee zero-downtime service recovery.' }
      ],
      impact: 'Cut production image sizes by 65%, achieved sub-10 second cold starts, and established 100% development-to-production parity.'
    }
  },
  {
    id: 'proj-8',
    title: 'Automated SQL Schema Migrator & Auditor',
    year: '2024',
    category: 'Data Engineering',
    featured: false,
    description: 'CLI utility to compare staging and production relational schemas, detect drift, and generate safe rollback scripts automatically.',
    metrics: 'Zero-downtime migrations',
    tags: ['SQL', 'Python', 'PostgreSQL', 'CLI'],
    link: 'https://github.com',
    status: 'Internal Tool',
    caseStudy: {
      problem: 'Manual relational schema alterations frequently introduced undocumented schema drift between staging and production databases, risking failed deployments and data loss.',
      architectureNodes: [
        { title: 'Database Catalog Inspector', desc: 'Reflects Information Schema, constraints, indexes & foreign key relationships' },
        { title: 'AST Schema Diffing Engine', desc: 'Detects missing columns, type mutations, and missing index definitions' },
        { title: 'Deterministic DDL Generator', desc: 'Constructs safe, ordered ALTER TABLE statements with transactional wrapping' },
        { title: 'Interactive CLI & Rollback Plan', desc: 'Dry-run preview with automated down-migration rollback script generation' }
      ],
      decisions: [
        { title: 'Destructive Action Guardrails', desc: 'Engineered hard locks preventing automated DROP COLUMN/TABLE execution without explicit CLI force flags.' },
        { title: 'Topological DDL Sequencing', desc: 'Sorted DDL operations to ensure parent table updates precede foreign key references, avoiding lock deadlocks.' }
      ],
      impact: 'Enabled zero-downtime database migrations, eliminated syntax errors in hand-written SQL updates, and automated audit trails across deployments.'
    }
  },
  {
    id: 'proj-9',
    title: 'Obsidian Second-Brain & Dev Knowledge Graph',
    year: '2024',
    category: 'AI & Automation',
    featured: false,
    description: 'Custom Markdown indexing script that converts daily engineering logs and architectural decision records into queryable local embeddings.',
    metrics: '400+ Linked Engineering Notes',
    tags: ['Obsidian', 'Markdown', 'Python', 'Local LLM'],
    link: 'https://github.com',
    status: 'Personal',
    caseStudy: {
      problem: 'Engineering notes, architectural decision records (ADRs), and debugging solutions spread across months of work became difficult to cross-reference and retrieve quickly.',
      architectureNodes: [
        { title: 'Local Markdown Vault', desc: '400+ structured engineering logs and architectural decision records' },
        { title: 'Python AST Note Parser', desc: 'Extracts YAML frontmatter, wikilinks, code blocks & tag taxonomies' },
        { title: 'Vector Embedding Worker', desc: 'Generates local embeddings via quantized sentence transformers' },
        { title: 'Semantic Search CLI & Graph', desc: 'Instant natural-language retrieval and bi-directional graph traversal' }
      ],
      decisions: [
        { title: 'Local-Only Embedding Engine', desc: 'Ensured all vector embeddings run locally on-device without cloud API dependencies or recurring costs.' },
        { title: 'Hybrid Tag & Vector Search', desc: 'Combined exact tag intersections with semantic vector similarity for high-precision retrieval.' }
      ],
      impact: 'Connected 400+ technical notes into a navigable knowledge graph, reducing search time for past architectural patterns from 15 minutes to under 5 seconds.'
    }
  },
  {
    id: 'proj-10',
    title: 'RESTful Rate-Limiter & Auth Middleware',
    year: '2023',
    category: 'Backend & Web',
    featured: false,
    description: 'Lightweight token-bucket rate limiting and JWT role verification middleware package for Express.js APIs.',
    metrics: 'Zero external bloat',
    tags: ['Node.js', 'Express', 'JavaScript', 'Security'],
    link: 'https://github.com',
    status: 'Archived',
    caseStudy: {
      problem: 'Third-party rate-limiting packages for small Express services often introduce heavy Redis dependencies and complex configurations for basic endpoint protection.',
      architectureNodes: [
        { title: 'Incoming HTTP Requests', desc: 'Header inspection, IP extraction & Bearer token extraction' },
        { title: 'In-Memory Token Bucket', desc: 'Sliding window request counters with automatic TTL cleanup timers' },
        { title: 'JWT Claims Verifier', desc: 'Cryptographic signature verification & role-based permission checks' },
        { title: 'Express Pipeline Handoff', desc: 'Pass-through to route handler with injected user context' }
      ],
      decisions: [
        { title: 'Sliding Window Token Bucket', desc: 'Implemented a memory-efficient sliding window algorithm with zero external database dependencies.' },
        { title: 'Low-Overhead Cache Pruning', desc: 'Used debounced garbage collection intervals to prune expired IP addresses without blocking event loops.' }
      ],
      impact: 'Secured Express endpoints against brute force traffic with zero external database overhead and sub-1ms middleware execution latency.'
    }
  }
];

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    title: 'Structuring Enterprise REST API Syncs with Idempotency',
    date: 'Oct 2026',
    readTime: '6 min read',
    category: 'Data Engineering',
    tags: ['Python', 'REST API', 'OpenProject', 'Architecture'],
    excerpt: 'How to design resilient data synchronization pipelines between internal databases and third-party project management APIs without duplicating records.',
    content: `### The Challenge of Enterprise API Synchronization

When integrating internal analytics databases with platforms like OpenProject, network timeouts, rate limits, and partial payload failures are inevitable. A naive script that simply loops over rows and fires \`POST\` requests will eventually create duplicate work packages or corrupt parent-child hierarchies.

### 1. Deterministic External Keys
Every entity in your source database should map to a deterministic fingerprint before touching the network. By hashing key fields (e.g., \`project_id + task_code + updated_at\`), we can compare local state against cached remote state and skip unchanged records entirely.

### 2. Batching & Exponential Backoff
Instead of firing 5,000 sequential requests:
- Group updates into logical dependency tiers (Projects first, Milestones second, Tasks third).
- Implement jittered exponential backoff on HTTP \`429\` and \`503\` responses.
- Log dead-letter payloads into a dedicated SQLite/Postgres audit table for instant replay.

\`\`\`python
import time
import random

def sync_records_with_retry(api_client, records, max_retries=5):
    # Deterministic batch dispatch with jittered backoff
    for attempt in range(max_retries):
        try:
            return api_client.bulk_sync(records)
        except RateLimitException as e:
            jitter = random.uniform(0.5, 1.5)
            delay = (2 ** attempt) + jitter
            time.sleep(delay)
    raise TimeoutError("Max API sync retries exceeded")
\`\`\`

### Key Takeaway
Treat every external REST integration as an eventually consistent distributed system. Idempotency keys and dry-run modes save hours of manual cleanup.`
  },
  {
    id: 'post-2',
    title: 'Event Loop & Async Mechanics in Node.js: Beyond the Basics',
    date: 'Sep 2026',
    readTime: '5 min read',
    category: 'Backend & Web',
    tags: ['Node.js', 'Express', 'JavaScript', 'Performance'],
    excerpt: 'Understanding microtask queues, libuv thread pools, and how to prevent blocking the main thread during heavy JSON transformations.',
    content: `### Why Single-Threaded Doesn't Mean Single-Tasking

Node.js excels at I/O-bound workloads because \`libuv\` delegates network and filesystem operations to the OS kernel or a C++ thread pool. However, when a route handler performs synchronous CPU work—like parsing massive CSVs or running complex regex—every other connected client waits.

### Microtasks vs. Macrotasks
1. **process.nextTick & Promises:** Executed immediately after the current operation completes, before the event loop moves to the next phase. Starving the loop with recursive \`Promise.resolve()\` calls can block I/O callbacks.
2. **Timers & Poll Phase:** Where standard \`setTimeout\`, \`setImmediate\`, and incoming network sockets live.

\`\`\`javascript
const fs = require('fs/promises');
const { Worker } = require('worker_threads');

// Offload CPU-heavy parsing to dedicated worker thread
function parseLargeDataset(filePath) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./workers/parser.js', { workerData: { filePath } });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}
\`\`\`

### Practical Rule for Express APIs
Keep middleware lean. Offload heavy data aggregation to worker threads or dedicated Python microservices, and use Node.js as the high-concurrency orchestration layer.`
  },
  {
    id: 'post-3',
    title: 'Optimizing Dockerfiles for Python Dash & Node.js Services',
    date: 'Aug 2026',
    readTime: '4 min read',
    category: 'DevOps & Containers',
    tags: ['Docker', 'Python', 'Node.js', 'Linux'],
    excerpt: 'Cutting container image sizes by 65% and speeding up CI builds using multi-stage builds, layer caching, and non-root execution.',
    content: `### Stop Shipping Build Compilers to Production

A common mistake in Python data engineering containers is installing \`gcc\`, \`build-essential\`, and raw wheels directly in the final runtime image. Suddenly, a simple Plotly Dash app balloons to 1.4GB.

\`\`\`dockerfile
# Multi-stage lean build for Python Dash
FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim as runner
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY src/ ./src
USER appuser
CMD ["python", "src/app.py"]
\`\`\`

### Three Rules for Lean Containers
1. **Order Layers by Change Frequency:** Copy \`requirements.txt\` or \`package.json\` *before* copying your source code. Docker caches the dependency installation layer until dependencies actually change.
2. **Multi-Stage Builds:** Compile wheels or TypeScript assets in a \`builder\` stage, then copy only the compiled artifacts into a \`slim-bookworm\` or \`alpine\` runtime image.
3. **Run as Non-Root:** Always create a dedicated application user (\`USER appuser\`) to harden container security in production environments.`
  }
];

export const CREATIVE_ITEMS = [
  {
    id: 'cr-1',
    title: '3D Hand-Painted Clay Crafts',
    subtitle: 'Bespoke Tactile Sculpting',
    badge: 'Physical Craft',
    description: 'Custom sculpted polymer & air-dry clay lighter sleeves featuring intricate coiled snake and botanical vine reliefs, hand-painted with acrylic washes and sealed in high-gloss UV resin.',
    highlights: ['High-relief 3D anatomy', 'Custom color palettes', 'Ergonomic grip balance']
  },
  {
    id: 'cr-2',
    title: 'Notion Workspace Systems',
    subtitle: 'Digital Product Architecture',
    badge: 'Gumroad Creator',
    description: 'Multi-tier Short-Term Rental (STR) operating systems built for property hosts. Includes automated relational databases for bookings, turnover checklists, and maintenance ledgers.',
    highlights: ['3 Tiered Product Editions', 'Relational KPI Rollups', 'Zero-friction onboarding']
  },
  {
    id: 'cr-3',
    title: 'Market & Product Strategy Audits',
    subtitle: 'EdTech & SaaS Teardowns',
    badge: 'Strategy Research',
    description: 'Deep-dive product strategy, competitor matrix, and conversion funnel analysis for Seat Secure (an IIT/NIT JoSAA counseling guidance platform).',
    highlights: ['Pricing psychology', 'User journey mapping', 'Competitor feature matrix']
  }
];

export const TECH_STACK = {
  'Data & AI': ['Python', 'SQL', 'Dash', 'Plotly', 'Pandas', 'Claude API / MCP'],
  'Backend & DevOps': ['Node.js', 'Express', 'REST APIs', 'Docker', 'Linux', 'Git'],
  'Frontend & Tools': ['React', 'Tailwind CSS', 'Notion', 'Obsidian', 'Postman']
};

export const EXPERIENCE_ITEMS = [
  {
    role: 'Data Engineer',
    period: 'Present',
    active: true,
    description: 'Building enterprise data integration architectures, biometric session analytics dashboards (Dash/Plotly), and OPEX efficiency frameworks.',
    highlights: [
      'Automated REST API sync pipelines with idempotent retry logic for OpenProject schemas.',
      'Engineered interactive Biometric Session & OPEX Analytics Dashboards processing 50k+ raw punch logs.',
      'Designed operational cost-leakage detection and shift adherence reporting pipelines.'
    ]
  },
  {
    role: 'Independent Builder & Creator',
    period: 'Ongoing',
    active: false,
    description: 'Developing full-stack Express/React apps, Gumroad Notion operating systems, EdTech strategy audits, and custom 3D clay designs.',
    highlights: [
      'Modular Node.js/Express backend with Docker orchestration and Claude Model Context Protocol (MCP) tooling.',
      'Designed multi-tier Short-Term Rental Notion OS products published on Gumroad.',
      'Handcrafted bespoke 3D clay lighter sleeves with high-relief botanical and serpent motifs.'
    ]
  }
];
