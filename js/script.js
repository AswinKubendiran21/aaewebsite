// ===== Main JavaScript for AAE Website =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer first
    includeHTML().then(() => {
        // Then initialize all components
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

// ===== Include HTML Function =====
function includeHTML() {
    return new Promise((resolve) => {
        const elements = document.querySelectorAll('[data-include]');
        let loadedCount = 0;
        const totalElements = elements.length;
        
        if (totalElements === 0) {
            resolve();
            return;
        }
        
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
                        loadedCount++;
                        
                        // Remove the data-include attribute to prevent re-processing
                        element.removeAttribute('data-include');
                        
                        if (loadedCount === totalElements) {
                            resolve();
                        }
                    })
                    .catch(error => {
                        console.error('Error loading include file:', error);
                        element.innerHTML = `<p>Error loading ${file}</p>`;
                        loadedCount++;
                        
                        if (loadedCount === totalElements) {
                            resolve();
                        }
                    });
            } else {
                loadedCount++;
                if (loadedCount === totalElements) {
                    resolve();
                }
            }
        });
    });
}

// ===== Navigation =====
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
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
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
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
            date: 'Mar 21-22, 2026',
            title: 'FLIGHT’26',
            description: 'National-level technical symposium organized by the Association of Aeronautical Engineers (AAE), bringing together students, academicians, and industry enthusiasts. The event serves as a platform to explore aerospace innovations through technical events, workshops, and expert interactions, fostering knowledge exchange, creativity, and professional growth in the field of aeronautical engineering.'
        },
        {
            date: '',
            title: 'Guest Lecture on Emerging Trends in Aerospace Engineering',
            description: 'An expert talk focusing on recent advancements in aerodynamics, propulsion, and space technologies. The session aims to give students industry-oriented insights and future research directions.'
        },
        {
            date: '',
            title: 'Hands-on Workshop on Aircraft Design and Analysis',
            description: 'Hands-on Workshop on Aircraft Design and Analysis'
        },
        {
            date: '',
            title: 'Technical Quiz and Ideathon',
            description: 'A competitive event designed to test core aerospace fundamentals and encourage innovative thinking. Students will collaborate, brainstorm solutions, and present ideas related to current aerospace challenges.'
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
                // CHANGE THIS LINE:
                stat.textContent = Math.ceil(current) + "+"; // Added "+"
                setTimeout(updateCounter, 20);
            } else {
                // CHANGE THIS LINE TOO:
                stat.textContent = target + "+"; // Added "+"
            }
        };
        
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
                    name: 'Chelian N G',
                    role: 'Chairperson',
                    department: 'Aerospace Engineering',
                    image: 'assets/chelian.png',
                    linkedin: '#',
                    email: 'rahul.sharma@example.com'
                },
                {
                    name: 'Arun V',
                    role: 'Secretary',
                    department: 'Aerospace Engineering',
                    image: 'assets/arun.png',
                    linkedin: '#',
                    email: 'priya.patel@example.com'
                },
                {
                    name: 'Saniya Banu',
                    role: 'Programme Coordinator',
                    department: 'Aerospace Engineering',
                    image: 'assets/saniya.png',
                    linkedin: '#',
                    email: 'arun.kumar@example.com'
                },
                {
                    name: 'Rohan Kishore',
                    role: 'Vice-chairperson',
                    department: 'Aerospace Engineering',
                    image: 'assets/rohan.png',
                    linkedin: '#',
                    email: 'arun.kumar@example.com'
                },
                {
                    name: 'Ezhilarasu',
                    role: 'Treasurer',
                    department: 'Aerospace Engineering',
                    image: 'assets/ezhil.png',
                    linkedin: '#',
                    email: 'arun.kumar@example.com'
                },
                {
                    name: 'Oviya',
                    role: 'Joint Secretary',
                    department: 'Aerospace Engineering',
                    image: 'assets/oviya.jpeg',
                    linkedin: '#',
                    email: 'arun.kumar@example.com'
                }
            ],
            members: [
            ]
        },
        {
            id: 2,
            name: 'Alumni Contact Team',
            category: 'technical',
            description: 'The long-term vision is to create a complete, accurate, and well-maintained alumni database that serves as the backbone for all engagement activities. For AAE 2025–26, the focus will be on using insights from Google Form responses to design seminars, guest lectures, and other meaningful interactions. A key highlight of the year will be the “Alumni Tunnel” event, aimed at celebrating and reconnecting past students Building harmonical relationship with alumni - This includes refining existing contact records, welcoming new alumni connections, and keeping interactions consistent throughout the year.',
            leaders: [
                {
                    name: 'Agathish M',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/agathish.png',
                    linkedin: '#',
                    email: 'sneha.reddy@example.com'
                },
                {
                    name: 'Parvathvarthini R M',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/parvathavarthini.png',
                    linkedin: '#',
                    email: 'deepika.joshi@example.com'
                },
                {
                    name: 'Kavin',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/kavin.png',
                    linkedin: '#',
                    email: 'deepika.joshi@example.com'
                }
            ],
            members: [
            ]
        },
        {
            id: 3,
            name: 'Academics Teams',
            category: 'event',
            description: 'Our motive is to enrich the technical knowledge of students through focused learning and practical exposure. Our works include structured GATE AE sessions with structured sessions, Students Collaboration Projects through which students with common interests join together working on projects and showcasing aerospace concepts, trends and innovations through association&apos;s YouTube channel "Aero verse". One of the most notable works of our team is the "Magazine". It is a 24 page monthly magazine, that comprises articles based on  a theme, student articles, news related to the field of aeronautics, crossword puzzles, etc.,',
            leaders: [
                {
                    name: 'Jefy Stanly S',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/jefy.png',
                    linkedin: '#',
                    email: 'vikram.singh@example.com'
                },
                {
                    name: 'Pradeesh Vel Nirmal',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/pradeesh.png',
                    linkedin: '#',
                    email: 'anjali.mehta@example.com'
                },
                {
                    name: 'Parvathvarthini R M',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/parvathavarthini.png',
                    linkedin: '#',
                    email: 'deepika.joshi@example.com'
                }
            ],
            members: [
            ]
        },
        {
            id: 4,
            name: 'Student Welfare Team',
            category: 'welfare',
            description:'The Student Welfare Team of the Association of Aeronautical Engineers aims to support and empower students. The team provides a platform for students to voice their concerns, share ideas, and develop professionally.The team also offers opportunities for students to develop their skills and gain industry insights. Our goal is to create a community where students can thrive, share ideas, and grow together.',
            leaders: [
                {
                    name: 'Sudharshana Govindhan',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/sudharasan.png',
                    linkedin: '#',
                    email: 'rohit.verma@example.com'
                },
                {
                    name: 'Saniya Banu',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/saniya.png',
                    linkedin: '#',
                    email: 'arun.kumar@example.com'
                },
                {
                    name: 'Malavika N Raj',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/malavika.png',
                    linkedin: '#',
                    email: 'shreya.patel@example.com'
                }
            ],
            members: [
            ]
        },
        {
            id: 5,
            name: 'Renovation Team',
            category: 'renovation',
            description:'The team has harboured on a task of thorough analysis of the various amenities of our department, such as the classrooms, labs, study models. Following this assessment, listing of necessary facilities, and their quotations, as inquired from trusted sources, compiled with suggestions from professors will constitute a document. This document is our goal, wherein we approach our alumni for potential funding, and forward it to the management so that it takes upon itself the renovation our department demands. The renovation team’s objective is to bring to attention any deficits, and indulge ourselves or the concerned personnel to rectify the same.',
            leaders: [
                {
                    name: 'Swathi P',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/swathi.png',
                    linkedin: '#',
                    email: 'manoj.kumar@example.com'
                },
                {
                    name: 'Jegan',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/jegan.png',
                    linkedin: '#',
                    email: 'nisha.reddy@example.com'
                }
            ],
            members: [
            ]
        },
        {
            id: 6,
            name: 'Design, Editing, and Social Media Handling Team',
            category: 'design',
            description: 'The Design, Editing, and Social Media Handling Team is dedicated to crafting visually stunning and diverse poster designs for our department’s workshops, seminars, and symposiums, ensuring each event is showcased with creativity and impact. Our skilled video editing team produces high-quality, captivating content for our YouTube channel, elevating our brand’s presence with professional and engaging videos. We also expertly manage our Association’s social media platforms, delivering consistent, timely, and dynamic updates to keep our supporters informed, inspired, and connected. With a passion for innovation and excellence, we strive to amplify our department’s vision, foster community engagement, and set new standards in creative communication.',
            leaders: [
                 {
                    name: 'Bharath R',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/bharath.png',
                    linkedin: '#',
                    email: 'nisha.reddy@example.com'
                },
                 {
                    name: 'Joy M Thomas',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/joy.png',
                    linkedin: '#',
                    email: 'nisha.reddy@example.com'
                },
                {
                    name: 'Harish Kumar K',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/harish.png',
                    linkedin: '#',
                    email: 'nisha.reddy@example.com'
                },
                {
                    name: 'Shrinath R R',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/shrinath.png',
                    linkedin: '#',
                    email: 'nisha.reddy@example.com'
                }
            ],
            members: [
            ]
        },
        {
            id: 7,
            name: 'Event Inchargers Teams',
            category: 'incharge',
            description: 'As the Event incharges Team, we take responsibility for planning, coordinating, and ensuring the smooth execution of the event. Especially, we indulge in conducting technical competitions, workshops, seminars, lectures etc., We manage schedules, assign tasks, and maintain clear communication between all the teams.',
            leaders: [
                {
                    name: 'Bharath Kumar R',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/bharathpg.png',
                    linkedin: '#',
                    email: 'vikram.singh@example.com'
                },
                {
                    name: 'Chelian N G',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/chelian.png',
                    linkedin: '#',
                    email: 'rahul.sharma@example.com'
                },
                {
                    name: 'Arun V',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/arun.png',
                    linkedin: '#',
                    email: 'priya.patel@example.com'
                },
            ],
            members: [
            ]
        },
        {
            id: 8,
            name: 'Documentation Team',
            category: 'documentation',
            description: 'This team is responsible for recording and maintaining all official records of events, meetings, and activities conducted by the association. They prepare detailed reports, minutes of meetings, and event summaries to ensure proper archival of information.',
            leaders: [
                {
                    name: 'Saniya Banu',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/saniya.png',
                    linkedin: '#',
                    email: 'arun.kumar@example.com'
                },
                {
                    name: 'Shivani',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/shivani.png',
                    linkedin: '#',
                    email: 'arun.kumar@example.com'
                },
                {
                    name: 'Nilanjana',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/nilanjana.png',
                    linkedin: '#',
                    email: 'arun.kumar@example.com'
                },
                
            ],
            members: [
            ]
        },
        {
            id: 9,
            name: 'Treasury Assistance Team',
            category: 'treasury',
            description:'Our team involves in Preparing a detailed budget estimate for all expected expenses. Also in Collecting and digitally storing all bills and receipts.To keep track of all transactions related to the event. Summarizing all actual expenses with supporting documentation. Analyzing the differences between planned and actual costs and use the analysis to improve future budget estimates.',
            leaders: [
                {
                    name: 'Devapriyan',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/dev.png',
                    linkedin: '#',
                    email: 'vikram.singh@example.com'
                },
                {
                    name: 'Ezhilarasu',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/ezhil.png',
                    linkedin: '#',
                    email: 'vikram.singh@example.com'
                },
                {
                    name: 'Ajmal S',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/ajmal.png',
                    linkedin: '#',
                    email: 'vikram.singh@example.com'
                }
            ],
            members: [
            ]
        },
        {
            id: 10,
            name: 'Organising Committee & Logistics',
            category: 'organising',
            description:'This team plays a pivotal role in planning, coordinating, and executing departmental events and activities. They manage logistics, scheduling, and communication to ensure smooth operations. The team works closely with faculty, students, and external partners to deliver impactful and well-structured programs.',
            leaders: [
                {
                    name: 'Mathivanan T',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/mathi.png',
                    linkedin: '#',
                    email: 'vikram.singh@example.com'
                },
                {
                    name: 'Dheenanath',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/dheena.png',
                    linkedin: '#',
                    email: 'vikram.singh@example.com'
                },
                {
                    name: 'Rohan Kishore',
                    role: 'Head',
                    department: 'Aerospace Engineering',
                    image: 'assets/rohan.png',
                    linkedin: '#',
                    email: 'vikram.singh@example.com'
                }
            ],
            members: [
            ]
        }
    ];
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

    // Check device type on website load
    window.addEventListener('load', function() {
        // Check if it's a mobile device
        if (window.innerWidth <= 768) {
            // Show a message or redirect
            alert('For the best experience, please view this website on a desktop or laptop.');
            
            // Optional: Show a styled message instead of alert
            // You can uncomment the lines below to show a banner instead
            /*
            const mobileWarning = document.createElement('div');
            mobileWarning.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background-color: #f5b042;
                color: #000;
                text-align: center;
                padding: 15px;
                font-weight: bold;
                z-index: 9999;
                border-bottom: 3px solid #0f6cbf;
            `;
            mobileWarning.innerHTML = '📱 For the best experience, please view this website on a desktop or laptop.';
            document.body.prepend(mobileWarning);
            */
        }
    });

    // Optional: Check when window resizes
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            console.log('Mobile view detected');
        } else {
            console.log('Desktop/Laptop view detected');
        }
    });