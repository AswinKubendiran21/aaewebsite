// ===== Main JavaScript for AAE Website =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initMobileDropdowns();
    initEventsTimeline();
    initQuotesSlider();
    initStatsCounter();
    initTeamsFilter();
    initMembersSearch();
    initCalendar();
    initEventsViewToggle();
    initScheduleTabs();
    initFAQ();
    initContactForm();
    
    // Load dynamic content based on page
    const page = document.body.id || getCurrentPage();
    
    switch(page) {
        case 'home-page':
            loadHomeEvents();
            break;
        case 'about-page':
            break;
        case 'teams-page':
            loadTeams();
            break;
        case 'members-page':
            loadMembers();
            break;
        case 'events-page':
            loadEventsList();
            break;
        case 'flight26-page':
            loadSchedule();
            break;
        case 'contact-page':
            break;
    }
});

// ===== Utility Functions =====
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('about')) return 'about-page';
    if (path.includes('teams')) return 'teams-page';
    if (path.includes('members')) return 'members-page';
    if (path.includes('events')) return 'events-page';
    if (path.includes('flight26')) return 'flight26-page';
    if (path.includes('contact')) return 'contact-page';
    return 'home-page';
}

// ===== Navigation =====
// ===== Navigation =====
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            navMenu.classList.toggle('active');
            
            // Update menu icon
            if (navMenu.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu on window resize (if resizing to larger screen)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Highlight current page in navigation
    highlightCurrentPage();
}
// Add this function after initNavigation() function
function initMobileDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdownToggles.forEach(otherToggle => {
                    const otherDropdown = otherToggle.parentElement;
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            dropdownToggles.forEach(toggle => {
                const dropdown = toggle.parentElement;
                dropdown.classList.remove('active');
            });
        }
    });
}

function highlightCurrentPage() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href) {
            if (currentPage === 'home-page' && href === 'index.html') {
                link.classList.add('active');
            } else if (currentPage === 'about-page' && href.includes('about')) {
                link.classList.add('active');
            } else if (currentPage === 'teams-page' && href.includes('teams')) {
                link.classList.add('active');
            } else if (currentPage === 'members-page' && href.includes('members')) {
                link.classList.add('active');
            } else if (currentPage === 'events-page' && href.includes('events')) {
                link.classList.add('active');
            } else if (currentPage === 'flight26-page' && href.includes('flight26')) {
                link.classList.add('active');
            } else if (currentPage === 'contact-page' && href.includes('contact')) {
                link.classList.add('active');
            }
        }
    });
}

// ===== Home Page Events Timeline =====
function initEventsTimeline() {
    const timelineContainer = document.getElementById('eventsTimeline');
    if (!timelineContainer) return;
    
    const events = [
        {
            date: 'Aug 22, 2025',
            title: 'Association Inauguration',
            description: 'The grand inauguration of the Association of Aeronautical Engineers (AAE), marking the beginning of a new journey with inspiring talks and cultural highlights.'
        },
        {
            date: 'Aug 22, 2025',
            title: 'Guest Lecture',
            description: 'An insightful session by an eminent speaker sharing knowledge on aerospace advancements and career pathways.'
        },
        {
            date: 'Aug 25, 2025',
            title: 'Guest Lecture',
            description: 'An insightful session by Mr. Muguthan, Lead Engineer at ePlane Company, sharing his expertise on aerospace advancements, cutting-edge technologies, and career pathways in the aviation industry.'
        },
        {
            date: 'Oct 15, 2025',
            title: 'Youth Awakening Technical Symposium',
            description: 'A one-day symposium commemorating Youth Awakening Day, featuring technical paper presentations, workshops, and discussions to ignite young minds.'
        }
    ];
    
    let timelineHTML = '';
    
    events.forEach((event, index) => {
        const sideClass = index % 2 === 0 ? 'left' : 'right';
        timelineHTML += `
            <div class="timeline-item ${sideClass}">
                <div class="timeline-date">${event.date}</div>
                <div class="timeline-content">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                </div>
            </div>
        `;
    });
    
    timelineContainer.innerHTML = timelineHTML;
}

// ===== Quotes Slider =====
function initQuotesSlider() {
    const slides = document.querySelectorAll('.quote-slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (!slides.length || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }
    
    prevBtn.addEventListener('click', () => {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        showSlide(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    });
    
    // Auto-advance slides every 10 seconds
    setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    }, 10000);
}

// ===== Stats Counter =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                stat.textContent = target;
            }
        };
        
        // Start counter when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// ===== Teams Page =====
// ===== Teams Page Functions =====
function initTeamsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const teamsContainer = document.getElementById('teamsContainer');
    
    if (!filterBtns.length || !teamsContainer) return;
    
    // Load all teams initially
    loadTeams();
    
    // Filter teams
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterTeams(filter);
        });
    });
    
    // Initialize team accordions
    initTeamAccordions();
}

function loadTeams() {
    const teamsContainer = document.getElementById('teamsContainer');
    if (!teamsContainer) return;
    
    const teams = getTeamsData();
    let html = '';
    
    teams.forEach(team => {
        html += createTeamHTML(team);
    });
    
    teamsContainer.innerHTML = html;
    
    // Re-initialize accordions after loading
    initTeamAccordions();
}

function createTeamHTML(team) {
    const leadersHTML = team.leaders.map(leader => `
        <div class="leader-card">
            <div class="leader-image">
                ${leader.image ? `<img src="${leader.image}" alt="${leader.name}">` : `<i class="fas fa-user"></i>`}
            </div>
            <h4>${leader.name}</h4>
            <div class="leader-role">${leader.role}</div>
            <div class="leader-department">${leader.department}</div>
            <div class="leader-social">
                <a href="${leader.linkedin || '#'}" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="${leader.email ? 'mailto:' + leader.email : '#'}" title="Email"><i class="fas fa-envelope"></i></a>
            </div>
        </div>
    `).join('');
    
    const membersHTML = team.members.slice(0, 8).map(member => `
        <div class="member-item">
            <div class="member-image">
                ${member.image ? `<img src="${member.image}" alt="${member.name}">` : `<i class="fas fa-user"></i>`}
            </div>
            <h4>${member.name}</h4>
            <div class="member-role">${member.role}</div>
        </div>
    `).join('');
    
    const hasMoreMembers = team.members.length > 8;
    
    return `
        <div class="team-section" data-team="${team.category}">
            <div class="team-header">
                <h2>${team.name}</h2>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="team-content">
                <div class="team-description">
                    <p>${team.description}</p>
                </div>
                
                <div class="team-leadership">
                    <h3>Team Leadership</h3>
                    <div class="leadership-grid">
                        ${leadersHTML}
                    </div>
                </div>
                
                <div class="team-members">
                    <h3>Team Members</h3>
                    <div class="members-grid">
                        ${membersHTML}
                    </div>
                    ${hasMoreMembers ? `
                        <div class="view-more">
                            <button class="view-more-btn" data-team="${team.id}">
                                View All ${team.members.length} Members <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function filterTeams(filter) {
    const teamSections = document.querySelectorAll('.team-section');
    
    teamSections.forEach(section => {
        if (filter === 'all' || section.getAttribute('data-team') === filter) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Close all accordions when filtering
    closeAllTeamAccordions();
}

function initTeamAccordions() {
    const teamHeaders = document.querySelectorAll('.team-header');
    
    teamHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const teamSection = this.parentElement;
            teamSection.classList.toggle('active');
            
            // Close other sections
            teamHeaders.forEach(otherHeader => {
                const otherSection = otherHeader.parentElement;
                if (otherSection !== teamSection && otherSection.classList.contains('active')) {
                    otherSection.classList.remove('active');
                }
            });
        });
    });
    
    // Add click events to view more buttons
    const viewMoreBtns = document.querySelectorAll('.view-more-btn');
    viewMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const teamId = this.getAttribute('data-team');
            alert(`This would show all members for Team ${teamId}. In a real implementation, this would load more members or redirect to a detailed page.`);
        });
    });
}

function closeAllTeamAccordions() {
    const teamSections = document.querySelectorAll('.team-section');
    teamSections.forEach(section => {
        section.classList.remove('active');
    });
}

function getTeamsData() {
    return [
        {
            id: 1,
            name: 'Core Committee',
            category: 'core',
            description: 'The Core Committee is the governing body of AAE, responsible for overall strategy, decision-making, and coordination between all teams. They ensure the smooth functioning of the association and represent AAE at the institute level.',
            leaders: [
                {
                    name: 'Rahul Sharma',
                    role: 'President',
                    department: 'Aerospace Engineering',
                    image: 'assets/logo.png',
                    linkedin: '#',
                    email: 'rahul.sharma@example.com'
                },
                {
                    name: 'Priya Patel',
                    role: 'Vice President',
                    department: 'Aerospace Engineering',
                    image: '',
                    linkedin: '#',
                    email: 'priya.patel@example.com'
                },
                {
                    name: 'Arun Kumar',
                    role: 'General Secretary',
                    department: 'Aerospace Engineering',
                    image: '',
                    linkedin: '#',
                    email: 'arun.kumar@example.com'
                }
            ],
            members: [
                { name: 'Aditya Verma', role: 'Member', image: '' },
                { name: 'Bhavya Singh', role: 'Member', image: '' },
                { name: 'Chetan Reddy', role: 'Member', image: '' },
                { name: 'Divya Nair', role: 'Member', image: '' },
                { name: 'Eshaan Gupta', role: 'Member', image: '' },
                { name: 'Fatima Khan', role: 'Member', image: '' },
                { name: 'Gaurav Mehta', role: 'Member', image: '' },
                { name: 'Harshita Joshi', role: 'Member', image: '' },
                { name: 'Ishaan Sharma', role: 'Member', image: '' },
                { name: 'Jhanvi Patel', role: 'Member', image: '' }
            ]
        },
        {
            id: 2,
            name: 'Technical Team',
            category: 'technical',
            description: 'The Technical Team handles all technical workshops, research collaborations, and innovation projects. They organize hands-on sessions on aerospace technologies, CAD modelling, simulation software, and aeromodelling.',
            leaders: [
                {
                    name: 'Sneha Reddy',
                    role: 'Technical Head',
                    department: 'Aerospace Engineering',
                    image: '',
                    linkedin: '#',
                    email: 'sneha.reddy@example.com'
                },
                {
                    name: 'Deepika Joshi',
                    role: 'Technical Co-Head',
                    department: 'Aerospace Engineering',
                    image: '',
                    linkedin: '#',
                    email: 'deepika.joshi@example.com'
                }
            ],
            members: [
                { name: 'Karthik Nair', role: 'Workshop Coordinator', image: '' },
                { name: 'Lakshmi Iyer', role: 'Research Coordinator', image: '' },
                { name: 'Manish Kumar', role: 'CAD Specialist', image: '' },
                { name: 'Neha Sharma', role: 'Simulation Expert', image: '' },
                { name: 'Omkar Deshpande', role: 'Aeromodelling Lead', image: '' },
                { name: 'Pooja Gupta', role: 'Technical Member', image: '' }
            ]
        },
        {
            id: 3,
            name: 'Events Team',
            category: 'event',
            description: 'The Events Team plans and executes all AAE events including FLIGHT 26, guest lectures, seminars, and symposiums. They handle logistics, venue management, speaker coordination, and event promotion.',
            leaders: [
                {
                    name: 'Vikram Singh',
                    role: 'Events Head',
                    department: 'Aerospace Engineering',
                    image: '',
                    linkedin: '#',
                    email: 'vikram.singh@example.com'
                },
                {
                    name: 'Anjali Mehta',
                    role: 'Events Co-Head',
                    department: 'Aerospace Engineering',
                    image: '',
                    linkedin: '#',
                    email: 'anjali.mehta@example.com'
                }
            ],
            members: [
                { name: 'Rajesh Kumar', role: 'Logistics Coordinator', image: '' },
                { name: 'Sonia Reddy', role: 'Venue Manager', image: '' },
                { name: 'Tarun Sharma', role: 'Speaker Coordinator', image: '' },
                { name: 'Uma Nair', role: 'Event Planner', image: '' },
                { name: 'Varun Gupta', role: 'Hospitality Lead', image: '' }
            ]
        },
        {
            id: 4,
            name: 'Student Welfare Team',
            category: 'welfare',
            description: 'The Student Welfare Team focuses on member support, alumni relations, and career guidance. They organize GATE classes, study groups, internship assistance, and alumni networking events.',
            leaders: [
                {
                    name: 'Rohit Verma',
                    role: 'Welfare Head',
                    department: 'Aerospace Engineering',
                    image: '',
                    linkedin: '#',
                    email: 'rohit.verma@example.com'
                },
                {
                    name: 'Shreya Patel',
                    role: 'Welfare Co-Head',
                    department: 'Aerospace Engineering',
                    image: '',
                    linkedin: '#',
                    email: 'shreya.patel@example.com'
                }
            ],
            members: [
                { name: 'Abhishek Singh', role: 'Alumni Coordinator', image: '' },
                { name: 'Bina Desai', role: 'Career Counselor', image: '' },
                { name: 'Chirag Mehta', role: 'Academic Support', image: '' },
                { name: 'Dipika Nair', role: 'Member Relations', image: '' },
                { name: 'Eshan Joshi', role: 'Mentorship Lead', image: '' }
            ]
        },
        {
            id: 5,
            name: 'Renovation Team',
            category: 'renovation',
            description: 'The Renovation Team manages infrastructure improvements, lab maintenance, and workspace optimization in the Aerospace Department. They work on projects to enhance learning and research facilities.',
            leaders: [
                {
                    name: 'Manoj Kumar',
                    role: 'Renovation Head',
                    department: 'Mechanical Engineering',
                    image: '',
                    linkedin: '#',
                    email: 'manoj.kumar@example.com'
                },
                {
                    name: 'Nisha Reddy',
                    role: 'Renovation Co-Head',
                    department: 'Civil Engineering',
                    image: '',
                    linkedin: '#',
                    email: 'nisha.reddy@example.com'
                }
            ],
            members: [
                { name: 'Prakash Singh', role: 'Infrastructure Lead', image: '' },
                { name: 'Rashmi Gupta', role: 'Lab Coordinator', image: '' },
                { name: 'Suresh Nair', role: 'Project Manager', image: '' },
                { name: 'Tina Sharma', role: 'Design Consultant', image: '' }
            ]
        },
        {
            id: 6,
            name: 'Design & Media Team',
            category: 'design',
            description: 'The Design & Media Team handles all creative work including website management, social media, graphic design, photography, and video production. They create promotional materials and maintain AAE\'s online presence.',
            leaders: [
                {
                    name: 'Karthik Nair',
                    role: 'Design Head',
                    department: 'Computer Science',
                    image: '',
                    linkedin: '#',
                    email: 'karthik.nair@example.com'
                },
                {
                    name: 'Lavanya Iyer',
                    role: 'Media Co-Head',
                    department: 'Electronics Engineering',
                    image: '',
                    linkedin: '#',
                    email: 'lavanya.iyer@example.com'
                }
            ],
            members: [
                { name: 'Mohan Raj', role: 'Web Developer', image: '' },
                { name: 'Nithya S', role: 'Graphic Designer', image: '' },
                { name: 'Pavan Kumar', role: 'Photographer', image: '' },
                { name: 'Ritu Sharma', role: 'Content Writer', image: '' },
                { name: 'Sachin R', role: 'Video Editor', image: '' }
            ]
        }
    ];
}
function loadTeamsGrid(teams) {
    const teamsGrid = document.getElementById('teamsGrid');
    if (!teamsGrid) return;
    
    let html = '';
    
    teams.forEach(team => {
        html += `
            <div class="team-card" data-team="${team.team}">
                <div class="team-image">
                    <i class="fas fa-user"></i>
                </div>
                <div class="team-info">
                    <h3>${team.name}</h3>
                    <div class="team-role">${team.role}</div>
                    <div class="team-department">${team.department} Engineering</div>
                    <div class="team-social">
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        `;
    });
    
    teamsGrid.innerHTML = html;
}

// ===== Members Page =====
function initMembersSearch() {
    const searchInput = document.getElementById('memberSearch');
    const yearFilter = document.getElementById('yearFilter');
    const deptFilter = document.getElementById('departmentFilter');
    
    if (!searchInput && !yearFilter && !deptFilter) return;
    
    // Add event listeners for filtering
    if (searchInput) {
        searchInput.addEventListener('input', filterMembers);
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', filterMembers);
    }
    
    if (deptFilter) {
        deptFilter.addEventListener('change', filterMembers);
    }
}

function loadMembers() {
    const membersGrid = document.getElementById('membersGrid');
    const pagination = document.getElementById('pagination');
    
    if (!membersGrid) return;
    
    // Sample members data
    const members = [
        { id: 1, name: 'Aditya Verma', year: '4', department: 'aerospace' },
        { id: 2, name: 'Bhavya Sharma', year: '3', department: 'aerospace' },
        { id: 3, name: 'Chetan Patel', year: '2', department: 'mechanical' },
        { id: 4, name: 'Divya Reddy', year: '1', department: 'aerospace' },
        { id: 5, name: 'Eshaan Kumar', year: '4', department: 'ece' },
        { id: 6, name: 'Fatima Khan', year: '3', department: 'cse' },
        { id: 7, name: 'Gaurav Singh', year: '2', department: 'aerospace' },
        { id: 8, name: 'Harshita Mehta', year: '1', department: 'aerospace' },
        { id: 9, name: 'Ishaan Nair', year: '4', department: 'mechanical' },
        { id: 10, name: 'Jhanvi Joshi', year: '3', department: 'aerospace' }
    ];
    
    // Display members
    displayMembers(members, 1);
    
    // Generate pagination
    if (pagination) {
        generatePagination(members.length, 6); // 6 members per page
    }
}

function displayMembers(members, page) {
    const membersGrid = document.getElementById('membersGrid');
    if (!membersGrid) return;
    
    const membersPerPage = 6;
    const startIndex = (page - 1) * membersPerPage;
    const endIndex = startIndex + membersPerPage;
    const pageMembers = members.slice(startIndex, endIndex);
    
    let html = '';
    
    pageMembers.forEach(member => {
        const yearText = getYearText(member.year);
        
        html += `
            <div class="member-card" data-year="${member.year}" data-department="${member.department}">
                <div class="member-image">
                    <i class="fas fa-user-graduate"></i>
                </div>
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <div class="member-year">${yearText} Year</div>
                    <div class="member-department">${getDepartmentName(member.department)}</div>
                </div>
            </div>
        `;
    });
    
    membersGrid.innerHTML = html;
}

function filterMembers() {
    const searchInput = document.getElementById('memberSearch');
    const yearFilter = document.getElementById('yearFilter');
    const deptFilter = document.getElementById('departmentFilter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedYear = yearFilter ? yearFilter.value : '';
    const selectedDept = deptFilter ? deptFilter.value : '';
    
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const year = card.getAttribute('data-year');
        const department = card.getAttribute('data-department');
        
        const matchesSearch = name.includes(searchTerm);
        const matchesYear = !selectedYear || year === selectedYear;
        const matchesDept = !selectedDept || department === selectedDept;
        
        if (matchesSearch && matchesYear && matchesDept) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function getYearText(year) {
    switch(year) {
        case '1': return 'First';
        case '2': return 'Second';
        case '3': return 'Third';
        case '4': return 'Fourth';
        default: return year;
    }
}

function getDepartmentName(dept) {
    switch(dept) {
        case 'aerospace': return 'Aerospace Engineering';
        case 'mechanical': return 'Mechanical Engineering';
        case 'ece': return 'Electronics Engineering';
        case 'cse': return 'Computer Science Engineering';
        default: return dept;
    }
}

function generatePagination(totalItems, itemsPerPage) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let html = '';
    
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn" data-page="${i}">${i}</button>`;
    }
    
    pagination.innerHTML = html;
    
    // Add click event to page buttons
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            pageBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Load members for selected page
            const page = parseInt(this.getAttribute('data-page'));
            // This would normally reload members from server
            // For demo, we'll just update the active button
        });
    });
    
    // Set first page as active
    if (pageBtns.length > 0) {
        pageBtns[0].classList.add('active');
    }
}

// ===== Events Calendar =====
function initCalendar() {
    const calendar = document.getElementById('calendar');
    if (!calendar) return;
    
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    const currentMonthEl = document.getElementById('currentMonth');
    
    let currentDate = new Date(2026, 2, 1); // March 2026
    
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Update month display
        if (currentMonthEl) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                               'July', 'August', 'September', 'October', 'November', 'December'];
            currentMonthEl.textContent = `${monthNames[month]} ${year}`;
        }
        
        // Get first day of month and total days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay(); // 0 = Sunday
        
        // Events for March 2026 (for demo)
        const events = {
            21: 'FLIGHT 26 Day 1',
            22: 'FLIGHT 26 Day 2'
        };
        
        // Generate calendar HTML
        let html = `
            <div class="calendar-weekdays">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div class="calendar-days">
        `;
        
        // Empty days before first day of month
        for (let i = 0; i < startingDay; i++) {
            html += `<div class="calendar-day empty"></div>`;
        }
        
        // Days of the month
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = isCurrentMonth && day === today.getDate();
            const dayClass = isToday ? 'calendar-day today' : 'calendar-day';
            
            html += `<div class="${dayClass}" data-day="${day}">`;
            html += `<div class="calendar-day-number">${day}</div>`;
            
            // Add event if exists for this day
            if (events[day]) {
                html += `<div class="calendar-event">${events[day]}</div>`;
            }
            
            html += `</div>`;
        }
        
        html += `</div>`;
        calendar.innerHTML = html;
    }
    
    // Initial render
    renderCalendar(currentDate);
    
    // Navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        });
    }
}

function initEventsViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const eventsList = document.getElementById('eventsList');
    
    if (!viewBtns.length || !eventsList) return;
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update view
            const view = this.getAttribute('data-view');
            eventsList.className = 'events-list ' + view + '-view';
            
            // Update event items
            const eventItems = eventsList.querySelectorAll('.event-item');
            eventItems.forEach(item => {
                item.className = 'event-item ' + view + '-view';
            });
        });
    });
}

function loadEventsList() {
    const eventsList = document.getElementById('eventsList');
    if (!eventsList) return;
    
    // Sample events data
    const events = [
        {
            date: 'Aug 22, 2025',
            title: 'AAE Inauguration 2025',
            description: 'The grand inauguration ceremony of the Association of Aeronautical Engineers for the academic year 2025-26.',
            time: '10:00 AM',
            venue: 'MIT Auditorium'
        },
        {
            date: 'Aug 25, 2025',
            title: 'Guest Lecture by ePlane Engineer',
            description: 'Mr. Muguthan, Lead Engineer at ePlane Company, shares insights on electric aviation and career opportunities.',
            time: '2:00 PM',
            venue: 'Aerospace Department Seminar Hall'
        },
        {
            date: 'Sep 10, 2025',
            title: 'Aeromodelling Workshop',
            description: 'Hands-on workshop on designing and building remote-controlled aircraft models.',
            time: '9:00 AM',
            venue: 'Aerospace Workshop'
        },
        {
            date: 'Oct 15, 2025',
            title: 'Youth Awakening Technical Symposium',
            description: 'One-day symposium with paper presentations, workshops, and expert talks.',
            time: '9:00 AM',
            venue: 'MIT Campus'
        }
    ];
    
    let html = '';
    
    events.forEach(event => {
        html += `
            <div class="event-item list-view">
                <div class="event-image">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="event-details">
                    <div class="event-date">${event.date}</div>
                    <h3>${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                    <div class="event-meta">
                        <span><i class="far fa-clock"></i> ${event.time}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${event.venue}</span>
                    </div>
                    <a href="#" class="btn-outline">View Details</a>
                </div>
            </div>
        `;
    });
    
    eventsList.innerHTML = html;
}

// ===== FLIGHT 26 Schedule =====
function initScheduleTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (!tabBtns.length) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Load schedule for selected day
            const day = this.getAttribute('data-day');
            loadSchedule(day);
        });
    });
}

function loadSchedule(day = 'day1') {
    const scheduleTable = document.getElementById('scheduleTable');
    if (!scheduleTable) return;
    
    // Schedule data
    const schedules = {
        day1: [
            { time: '9:00 AM - 10:00 AM', event: 'Registration & Inauguration', venue: 'Main Auditorium' },
            { time: '10:00 AM - 11:00 AM', event: 'Keynote Address: Future of Aerospace', venue: 'Main Auditorium' },
            { time: '11:00 AM - 1:00 PM', event: 'Paper Presentation Competition', venue: 'Seminar Halls 1 & 2' },
            { time: '1:00 PM - 2:00 PM', event: 'Lunch Break', venue: 'Food Court' },
            { time: '2:00 PM - 5:00 PM', event: 'Aeromodelling Competition', venue: 'Aerospace Workshop' },
            { time: '5:00 PM - 6:00 PM', event: 'Quiz Prelims', venue: 'Lecture Hall 5' }
        ],
        day2: [
            { time: '9:00 AM - 11:00 AM', event: 'CAD Modelling Competition', venue: 'Computer Lab 3' },
            { time: '11:00 AM - 1:00 PM', event: 'Workshop: UAV Design', venue: 'Aerospace Department' },
            { time: '1:00 PM - 2:00 PM', event: 'Lunch Break', venue: 'Food Court' },
            { time: '2:00 PM - 4:00 PM', event: 'Quiz Finals', venue: 'Main Auditorium' },
            { time: '4:00 PM - 5:30 PM', event: 'Panel Discussion: Careers in Aerospace', venue: 'Main Auditorium' },
            { time: '5:30 PM - 6:30 PM', event: 'Prize Distribution & Closing Ceremony', venue: 'Main Auditorium' }
        ]
    };
    
    const selectedSchedule = schedules[day];
    
    let html = `
        <div class="schedule-row header">
            <div class="schedule-cell">Time</div>
            <div class="schedule-cell">Event</div>
            <div class="schedule-cell">Venue</div>
        </div>
    `;
    
    selectedSchedule.forEach(item => {
        html += `
            <div class="schedule-row">
                <div class="schedule-cell">${item.time}</div>
                <div class="schedule-cell">${item.event}</div>
                <div class="schedule-cell">${item.venue}</div>
            </div>
        `;
    });
    
    scheduleTable.innerHTML = html;
}

// ===== FAQ Accordion =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ===== Contact Form =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// ===== Load Home Page Events =====
function loadHomeEvents() {
    // This function is called from DOMContentLoaded for home page
    // Events timeline is already initialized by initEventsTimeline()
}
// Add this to your existing JavaScript file or in a <script> tag
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const content = dropdown.querySelector('.dropdown-content');
        
        // Add click event for mobile
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) { // Mobile breakpoint
                e.preventDefault();
                content.classList.toggle('show');
                
                // Close other dropdowns when opening this one
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.querySelector('.dropdown-content').classList.remove('show');
                    }
                });
            }
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target) && window.innerWidth <= 768) {
                content.classList.remove('show');
            }
        });
    });
});
// Function to include HTML files
function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    
    elements.forEach(element => {
        const file = element.getAttribute('data-include');
        if (file) {
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load ${file}: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    element.innerHTML = data;
                    
                    // Re-initialize navigation after header is loaded
                    if (file === 'header.html') {
                        initNavigation();
                    }
                    
                    // Highlight active page after navigation is loaded
                    setTimeout(() => {
                        highlightCurrentPage();
                    }, 100);
                })
                .catch(error => {
                    console.error('Error loading include file:', error);
                    element.innerHTML = `<p>Error loading ${file}</p>`;
                });
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', includeHTML);