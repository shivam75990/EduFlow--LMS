// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSidebar();
  initUserDropdown();
  initNotifications();
  initRippleButtons();
  initMobileSearch();
  initPageSpecific();
});

// ===== Theme =====
function initTheme() {
  const savedTheme = localStorage.getItem('edu-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('edu-theme', next);
      toggle.innerHTML = next === 'dark' ? '☀️' : '🌙';
      showToast(next === 'dark' ? 'Dark mode enabled' : 'Light mode enabled', 'info');
    });
  }
}

// ===== Sidebar =====
function initSidebar() {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  const topbar = document.querySelector('.topbar');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      mainContent?.classList.toggle('expanded');
      topbar?.classList.toggle('expanded');
      toggle.innerHTML = sidebar.classList.contains('collapsed') ? '▶' : '◀';
    });
  }

  // Mobile sidebar
  const mobileToggle = document.getElementById('mobileMenuToggle');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 &&
          sidebar.classList.contains('mobile-open') &&
          !sidebar.contains(e.target) &&
          !mobileToggle.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }

  // Active nav
  let currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  if (currentPage === '' || currentPage === 'index.html') currentPage = 'dashboard.html';
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage) {
      item.classList.add('active');
    }
  });
}

// ===== User Dropdown =====
function initUserDropdown() {
  const dropdownBtn = document.getElementById('userDropdownBtn');
  const dropdown = document.getElementById('userDropdown');

  if (dropdownBtn && dropdown) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });
  }
}

// ===== Notifications =====
function initNotifications() {
  const bellBtn = document.getElementById('notificationBell');
  const panel = document.getElementById('notificationsPanel');
  const closeBtn = document.getElementById('notificationsClose');

  // Update badge
  const unread = EduData.notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notifBadge');
  if (badge) {
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';
  }

  if (bellBtn && panel) {
    bellBtn.addEventListener('click', () => {
      panel.classList.toggle('open');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
      });
    }

    document.addEventListener('click', (e) => {
      if (panel.classList.contains('open') &&
          !panel.contains(e.target) &&
          !bellBtn.contains(e.target)) {
        panel.classList.remove('open');
      }
    });
  }

  renderNotifications();
}

function renderNotifications() {
  const list = document.getElementById('notificationsList');
  if (!list) return;

  list.innerHTML = EduData.notifications.map(n => `
    <div class="notification-item ${n.read ? 'read' : ''}">
      <div class="notification-dot"></div>
      <div>
        <strong style="font-size:14px;display:block;margin-bottom:2px;">${n.title}</strong>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:4px;">${n.message}</p>
        <span style="font-size:11px;color:var(--text-muted);">${n.time}</span>
      </div>
    </div>
  `).join('');
}

// ===== Ripple Buttons =====
function initRippleButtons() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = ripple.style.height = '20px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ===== Mobile Search =====
function initMobileSearch() {
  const btn = document.getElementById('mobileSearchBtn');
  const bar = document.getElementById('mobileSearchBar');

  if (btn && bar) {
    btn.addEventListener('click', () => {
      bar.classList.toggle('show');
      if (bar.classList.contains('show')) {
        bar.querySelector('input')?.focus();
      }
    });
  }
}

// ===== Toast =====
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${icons[type] || 'ℹ️'}</span>
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ===== Smooth Scroll =====
function smoothScroll(target, offset = 0) {
  const el = document.querySelector(target);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// ===== Modal =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('show');
    document.body.style.overflow = '';
  }
});

// ===== Page-specific init =====
function initPageSpecific() {
  const page = window.location.pathname.split('/').pop();

  switch (page) {
    case 'index.html':
    case 'dashboard.html':
    case '':
      initDashboard();
      break;
    case 'courses.html':
      initCoursesPage();
      break;
    case 'course-details.html':
      initCourseDetails();
      break;
    case 'progress.html':
      initProgressPage();
      break;
    case 'certificates.html':
      initCertificatesPage();
      break;
    case 'profile.html':
      initProfilePage();
      break;
  }
}

// ===== Dashboard =====
function initDashboard() {
  renderStats();
  renderContinueLearning();
  renderRecentlyOpened();
  renderWeeklyChart();
}

function renderStats() {
  const container = document.getElementById('statsGrid');
  if (!container) return;

  const stats = [
    { icon: '📚', value: EduData.stats.totalCourses, label: 'Total Courses', color: 'primary' },
    { icon: '✅', value: EduData.stats.completedCourses, label: 'Completed', color: 'success' },
    { icon: '⏱️', value: EduData.stats.hoursLearned, label: 'Hours Learned', color: 'warning' },
    { icon: '🎓', value: EduData.stats.certificatesEarned, label: 'Certificates', color: 'secondary' }
  ];

  container.innerHTML = stats.map((s, i) => `
    <div class="stat-card animate-slide-up stagger-${i + 1}">
      <div class="stat-icon ${s.color}">${s.icon}</div>
      <div class="stat-content">
        <h3>${s.value}</h3>
        <p>${s.label}</p>
      </div>
    </div>
  `).join('');
}

function renderContinueLearning() {
  const container = document.getElementById('continueLearning');
  if (!container) return;

  const inProgress = EduData.courses.filter(c => c.enrolled && c.progress > 0 && c.progress < 100);
  const courses = inProgress.slice(0, 3);

  if (courses.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📖</div><h3>No courses in progress</h3><p>Start learning today!</p></div>`;
    return;
  }

  container.innerHTML = courses.map(c => `
    <div class="course-card animate-slide-up">
      <div class="course-card-thumb" style="background: linear-gradient(135deg, ${getGradientForCategory(c.category)})">
        <div class="thumb-overlay"></div>
        <span class="course-category">${c.category}</span>
        <span class="course-difficulty badge-${c.difficulty}">${c.difficulty}</span>
      </div>
      <div class="course-card-body">
        <h3>${c.title}</h3>
        <p class="course-instructor">${c.instructor}</p>
        <div class="course-meta">
          <span>📖 ${c.lessonsCount} lessons</span>
          <span>⏱️ ${c.duration}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-size:13px;font-weight:600;color:var(--primary);">${c.progress}%</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width:${c.progress}%"></div>
        </div>
        <a href="course-details.html?id=${c.id}" class="btn btn-primary btn-full btn-sm">Continue Learning</a>
      </div>
    </div>
  `).join('');
}

function renderRecentlyOpened() {
  const container = document.getElementById('recentlyOpened');
  if (!container) return;

  const recent = EduData.courses.filter(c => c.enrolled).slice(0, 4);

  container.innerHTML = recent.map(c => `
    <div class="course-card animate-slide-up">
      <div class="course-card-thumb" style="background: linear-gradient(135deg, ${getGradientForCategory(c.category)})">
        <div class="thumb-overlay"></div>
        <span class="course-category">${c.category}</span>
        <span class="course-difficulty badge-${c.difficulty}">${c.difficulty}</span>
      </div>
      <div class="course-card-body">
        <h3>${c.title}</h3>
        <p class="course-instructor">${c.instructor}</p>
        <div class="course-meta">
          <span>📖 ${c.lessonsCount} lessons</span>
          <span>⏱️ ${c.duration}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-size:13px;font-weight:600;color:var(--primary);">${c.progress}% complete</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width:${c.progress}%"></div>
        </div>
        <a href="course-details.html?id=${c.id}" class="btn btn-secondary btn-full btn-sm">View Course</a>
      </div>
    </div>
  `).join('');
}

function renderWeeklyChart() {
  const container = document.getElementById('weeklyChart');
  if (!container) return;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const max = Math.max(...EduData.stats.weeklyActivity);

  container.innerHTML = `
    <div class="section-header">
      <h2>Weekly Activity</h2>
    </div>
    <div class="activity-grid">
      ${EduData.stats.weeklyActivity.map((h, i) => `
        <div class="activity-day">
          <div class="activity-bar">
            <div class="activity-fill" style="height:${max > 0 ? (h / max) * 100 : 0}%"></div>
          </div>
          <span class="activity-label">${days[i]}</span>
          <span style="font-size:11px;font-weight:600;color:var(--text-secondary);">${h}h</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ===== Courses Page =====
function initCoursesPage() {
  renderCourses(EduData.courses);
  initCourseFilters();
  const countEl = document.getElementById('courseCount');
  if (countEl) countEl.textContent = EduData.courses.length;
}

function renderCourses(courses) {
  const container = document.getElementById('coursesGrid');
  if (!container) return;

  if (courses.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><h3>No courses found</h3><p>Try adjusting your filters.</p></div>`;
    return;
  }

  container.innerHTML = courses.map(c => `
    <div class="course-card animate-slide-up">
      <div class="course-card-thumb" style="background: linear-gradient(135deg, ${getGradientForCategory(c.category)})">
        <div class="thumb-overlay"></div>
        <span class="course-category">${c.category}</span>
        <span class="course-difficulty badge-${c.difficulty}">${c.difficulty}</span>
      </div>
      <div class="course-card-body">
        <h3>${c.title}</h3>
        <p class="course-instructor">${c.instructor}</p>
        <div class="course-meta">
          <span>📖 ${c.lessonsCount} lessons</span>
          <span>⏱️ ${c.duration}</span>
        </div>
        ${c.enrolled ? `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="font-size:13px;font-weight:600;color:var(--primary);">${c.progress}% complete</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width:${c.progress}%"></div>
          </div>
          <a href="course-details.html?id=${c.id}" class="btn btn-primary btn-full btn-sm">Continue Learning</a>
        ` : `
          <a href="course-details.html?id=${c.id}" class="btn btn-secondary btn-full btn-sm">View Details</a>
        `}
      </div>
    </div>
  `).join('');
}

function initCourseFilters() {
  const searchInput = document.getElementById('courseSearch');
  const categoryFilter = document.getElementById('filterCategory');
  const progressFilter = document.getElementById('filterProgress');
  const sortSelect = document.getElementById('sortCourses');

  function filterAndRender() {
    let filtered = [...EduData.courses];
    const search = searchInput?.value.toLowerCase() || '';
    const category = categoryFilter?.value || 'all';
    const progress = progressFilter?.value || 'all';
    const sort = sortSelect?.value || 'title';

    if (search) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(search) ||
        c.instructor.toLowerCase().includes(search)
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }

    if (progress !== 'all') {
      filtered = filtered.filter(c => {
        if (progress === 'not-started') return c.progress === 0;
        if (progress === 'in-progress') return c.progress > 0 && c.progress < 100;
        if (progress === 'completed') return c.progress === 100;
        return true;
      });
    }

    switch (sort) {
      case 'title': filtered.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'progress': filtered.sort((a, b) => b.progress - a.progress); break;
      case 'duration': filtered.sort((a, b) => b.duration.localeCompare(a.duration)); break;
    }

    renderCourses(filtered);
  }

  searchInput?.addEventListener('input', filterAndRender);
  categoryFilter?.addEventListener('change', filterAndRender);
  progressFilter?.addEventListener('change', filterAndRender);
  sortSelect?.addEventListener('change', filterAndRender);
}

// ===== Course Details =====
function initCourseDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  const course = EduData.courses.find(c => c.id === id);

  if (!course) return;

  renderCourseBanner(course);
  renderCourseInfo(course);
  renderLessons(course);
  renderSidebarCard(course);
  initLessonToggles();
}

function renderCourseBanner(course) {
  const container = document.getElementById('courseBanner');
  if (!container) return;

  container.innerHTML = `
    <div class="course-banner" style="background: linear-gradient(135deg, ${getGradientForCategory(course.category)})">
      <div class="course-banner-content">
        <h1>${course.title}</h1>
        <div class="course-meta-detail">
          <span>👨‍🏫 ${course.instructor}</span>
          <span>📖 ${course.lessonsCount} Lessons</span>
          <span>⏱️ ${course.duration}</span>
          <span class="badge-${course.difficulty}" style="padding:2px 10px;border-radius:20px;background:rgba(255,255,255,0.15);">${course.difficulty}</span>
        </div>
      </div>
    </div>
  `;
}

function renderCourseInfo(course) {
  const container = document.getElementById('courseDescription');
  if (!container) return;

  container.innerHTML = `
    <div class="course-info-section">
      <h3>📝 About This Course</h3>
      <p style="font-size:14px;color:var(--text-secondary);line-height:1.8;">${course.description}</p>
    </div>
    <div class="course-info-section">
      <h3>🎯 Skills You'll Learn</h3>
      <div class="skills-tags">
        ${course.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
    </div>
    <div class="course-info-section">
      <h3>📋 Lesson List</h3>
      <div id="lessonsList" class="lesson-list"></div>
    </div>
  `;
}

function renderLessons(course) {
  const container = document.getElementById('lessonsList');
  if (!container) return;

  container.innerHTML = course.lessons.map((l, i) => `
    <div class="lesson-item ${l.completed ? 'completed' : ''}">
      <div class="lesson-header" data-lesson="${l.id}">
        <div class="lesson-header-left">
          <div class="lesson-number">${l.completed ? '✓' : (i + 1)}</div>
          <span class="lesson-title">${l.title}</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <span class="lesson-duration">⏱️ ${l.duration}</span>
          <span class="lesson-chevron">▼</span>
        </div>
      </div>
      <div class="lesson-content">
        <p>This lesson covers ${l.title.toLowerCase()}. Complete the video and practice exercises to master this topic.</p>
      </div>
    </div>
  `).join('');
}

function initLessonToggles() {
  document.querySelectorAll('.lesson-header').forEach(header => {
    header.addEventListener('click', function() {
      const item = this.closest('.lesson-item');
      const wasOpen = item.classList.contains('open');

      // Close all other lessons
      // document.querySelectorAll('.lesson-item.open').forEach(el => el.classList.remove('open'));

      if (!wasOpen) {
        item.classList.add('open');
      } else {
        item.classList.remove('open');
      }
    });
  });
}

function renderSidebarCard(course) {
  const container = document.getElementById('courseSidebar');
  if (!container) return;

  container.innerHTML = `
    <div class="sidebar-card">
      <div class="course-price">Free <span>$49.99</span></div>
      <button class="btn btn-primary btn-full" onclick="showToast('🎉 Successfully enrolled!', 'success')">
        ${course.enrolled ? 'Continue Learning' : 'Enroll Now'}
      </button>
      <div style="margin-top:20px;">
        <div class="sidebar-detail-item">
          <span class="detail-icon">📖</span>
          <span>${course.lessonsCount} Lessons</span>
        </div>
        <div class="sidebar-detail-item">
          <span class="detail-icon">⏱️</span>
          <span>${course.duration} Total</span>
        </div>
        <div class="sidebar-detail-item">
          <span class="detail-icon">📊</span>
          <span>${course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)} Level</span>
        </div>
        <div class="sidebar-detail-item">
          <span class="detail-icon">🏷️</span>
          <span>${course.category}</span>
        </div>
        ${course.enrolled ? `
          <div class="sidebar-detail-item">
            <span class="detail-icon">✅</span>
            <span>${course.completedLessons}/${course.lessonsCount} Completed</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// ===== Progress Page =====
function initProgressPage() {
  renderCircularProgress();
  renderStreakStats();
  renderWeeklyActivity();
  renderCourseProgressList();
  renderAchievements();
  animateProgressBars();
}

function renderCourseProgressList() {
  const container = document.getElementById('courseProgressList');
  if (!container) return;

  const enrolled = EduData.courses.filter(c => c.enrolled);
  container.innerHTML = enrolled.map(c => `
    <div class="course-info-section">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div>
          <h4 style="font-size:15px;font-weight:600;margin-bottom:4px;">${c.title}</h4>
          <p style="font-size:13px;color:var(--text-secondary);">${c.completedLessons}/${c.lessonsCount} lessons completed</p>
        </div>
        <span style="font-size:18px;font-weight:700;color:var(--primary);">${c.progress}%</span>
      </div>
      <div class="progress-bar-container" style="margin-top:12px;">
        <div class="progress-bar-fill" style="width:${c.progress}%"></div>
      </div>
    </div>
  `).join('');
}

function renderCircularProgress() {
  const container = document.getElementById('circularProgress');
  if (!container) return;

  const pct = EduData.stats.overallProgress;
  const circumference = 440;
  const offset = circumference - (pct / 100) * circumference;

  container.innerHTML = `
    <svg width="160" height="160" viewBox="0 0 160 160">
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4F46E5" />
          <stop offset="100%" stop-color="#7C3AED" />
        </linearGradient>
      </defs>
      <circle class="progress-circle-bg" cx="80" cy="80" r="70" />
      <circle class="progress-circle-fill" cx="80" cy="80" r="70" data-offset="${offset}" />
    </svg>
    <div class="circular-progress-center">
      <span class="percent">${pct}%</span>
      <span class="label">Complete</span>
    </div>
  `;

  // Animate after a small delay
  setTimeout(() => {
    const circle = container.querySelector('.progress-circle-fill');
    if (circle) {
      circle.style.strokeDashoffset = circle.dataset.offset;
    }
  }, 300);
}

function renderStreakStats() {
  const container = document.getElementById('streakStats');
  if (!container) return;

  container.innerHTML = `
    <div class="streak-card animate-slide-up stagger-1">
      <div class="streak-icon">🔥</div>
      <div class="streak-value">${EduData.stats.currentStreak}</div>
      <div class="streak-label">Current Streak</div>
    </div>
    <div class="streak-card animate-slide-up stagger-2">
      <div class="streak-icon">⚡</div>
      <div class="streak-value">${EduData.stats.longestStreak}</div>
      <div class="streak-label">Longest Streak</div>
    </div>
    <div class="streak-card animate-slide-up stagger-3">
      <div class="streak-icon">📊</div>
      <div class="streak-value">${EduData.stats.hoursLearned}h</div>
      <div class="streak-label">Total Study</div>
    </div>
  `;
}

function renderWeeklyActivity() {
  const container = document.getElementById('progressWeeklyActivity');
  if (!container) return;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const max = Math.max(...EduData.stats.weeklyActivity);

  container.innerHTML = `
    <div class="section-header"><h2>Weekly Activity</h2></div>
    <div class="activity-grid">
      ${EduData.stats.weeklyActivity.map((h, i) => `
        <div class="activity-day">
          <div class="activity-bar">
            <div class="activity-fill" style="height:${max > 0 ? (h / max) * 100 : 0}%"></div>
          </div>
          <span class="activity-label">${days[i]}</span>
          <span style="font-size:11px;font-weight:600;color:var(--text-secondary);">${h}h</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAchievements() {
  const container = document.getElementById('achievementsGrid');
  if (!container) return;

  container.innerHTML = EduData.achievements.map(a => `
    <div class="achievement-card ${a.unlocked ? '' : 'locked'} animate-slide-up">
      <div class="achievement-icon">${a.icon}</div>
      <h4>${a.title}</h4>
      <p>${a.description}</p>
    </div>
  `).join('');
}

function animateProgressBars() {
  document.querySelectorAll('.progress-bar-fill').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 200);
  });
}

// ===== Certificates Page =====
function initCertificatesPage() {
  renderCertificates();
}

function renderCertificates() {
  const container = document.getElementById('certificatesGrid');
  if (!container) return;

  container.innerHTML = EduData.certificates.map((c, i) => `
    <div class="certificate-card animate-slide-up stagger-${i + 1}" onclick="openCertificateModal(${i})">
      <div class="certificate-preview">
        <div class="certificate-preview-inner">
          <div class="cert-icon">🎓</div>
          <h3>Certificate of Completion</h3>
        </div>
      </div>
      <div class="certificate-body">
        <h4>${c.courseName}</h4>
        <p>${c.studentName}</p>
        <p>Completed: ${c.date}</p>
        <div class="certificate-id">${c.id}</div>
      </div>
    </div>
  `).join('');
}

function openCertificateModal(index) {
  const cert = EduData.certificates[index];
  if (!cert) return;

  const modal = document.getElementById('certificateModal');
  const content = document.getElementById('certificateModalContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="certificate-frame">
      <h2>Certificate of Completion</h2>
      <p style="color:var(--text-muted);margin-bottom:16px;">This is to certify that</p>
      <div class="cert-student">${cert.studentName}</div>
      <p style="color:var(--text-muted);margin-bottom:16px;">has successfully completed</p>
      <div class="cert-course">${cert.courseName}</div>
      <div class="cert-date">Completed on ${cert.date}</div>
      <div class="cert-id">Certificate ID: ${cert.id}</div>
    </div>
    <button class="btn btn-primary" onclick="showToast('📄 Certificate downloaded successfully!', 'success'); closeModal('certificateModal')">
      ⬇️ Download Certificate
    </button>
  `;

  openModal('certificateModal');
}

// ===== Profile Page =====
function initProfilePage() {
  renderProfile();
  initEditProfile();
}

function renderProfile() {
  const user = EduData.user;

  const avatar = document.getElementById('profileAvatar');
  const name = document.getElementById('profileName');
  const email = document.getElementById('profileEmail');
  const bio = document.getElementById('profileBio');
  const skills = document.getElementById('profileSkills');
  const goals = document.getElementById('profileGoals');
  const certCount = document.getElementById('profileCerts');
  const hours = document.getElementById('profileHours');

  if (avatar) avatar.textContent = user.avatar;
  if (name) name.textContent = user.name;
  if (email) email.textContent = user.email;
  if (bio) bio.textContent = user.bio;

  if (skills) {
    skills.innerHTML = user.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
  }

  if (goals) {
    goals.innerHTML = user.goals.map(g => `<li style="font-size:14px;color:var(--text-secondary);margin-bottom:6px;">🎯 ${g}</li>`).join('');
  }

  if (certCount) certCount.textContent = EduData.stats.certificatesEarned;
  if (hours) hours.textContent = EduData.stats.hoursLearned;

  // Fill edit form
  const editName = document.getElementById('editName');
  const editEmail = document.getElementById('editEmail');
  const editBio = document.getElementById('editBio');

  if (editName) editName.value = user.name;
  if (editEmail) editEmail.value = user.email;
  if (editBio) editBio.value = user.bio;
}

function initEditProfile() {
  const form = document.getElementById('editProfileForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const bio = document.getElementById('editBio').value;

    EduData.user.name = name;
    EduData.user.email = email;
    EduData.user.bio = bio;

    renderProfile();
    closeModal('editProfileModal');
    showToast('Profile updated successfully!', 'success');
  });
}

function getGradientForCategory(category) {
  const gradients = {
    'Programming': '#4F46E5, #7C3AED',
    'Frontend': '#3B82F6, #6366F1',
    'Data Science': '#22C55E, #059669',
    'Cloud': '#F59E0B, #D97706',
    'Design': '#EC4899, #8B5CF6'
  };
  return gradients[category] || '#4F46E5, #7C3AED';
}
