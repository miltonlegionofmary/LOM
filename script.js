// Rosary Mysteries Data
    const mysteriesData = {
      joyful: {
        name: "The Joyful Mysteries (Mondays & Saturdays)",
        beads: [
          { title: "1. The Annunciation", fruit: "Humility" },
          { title: "2. The Visitation", fruit: "Love of Neighbor" },
          { title: "3. The Nativity", fruit: "Poverty of Spirit" },
          { title: "4. The Presentation", fruit: "Obedience" },
          { title: "5. Finding in Temple", fruit: "Joy in Finding Jesus" }
        ]
      },
      sorrowful: {
        name: "The Sorrowful Mysteries (Tuesdays & Fridays)",
        beads: [
          { title: "1. Agony in the Garden", fruit: "Sorrow for Sin" },
          { title: "2. Scourging at Pillar", fruit: "Purity & Mortification" },
          { title: "3. Crowning with Thorns", fruit: "Moral Courage" },
          { title: "4. Carrying of the Cross", fruit: "Patience in Crosses" },
          { title: "5. The Crucifixion", fruit: "Perseverance & Salvation" }
        ]
      },
      glorious: {
        name: "The Glorious Mysteries (Wednesdays & Sundays)",
        beads: [
          { title: "1. The Resurrection", fruit: "Faith" },
          { title: "2. The Ascension", fruit: "Hope & Desire for Heaven" },
          { title: "3. Descent of Holy Spirit", fruit: "Love of God & Zeal" },
          { title: "4. The Assumption", fruit: "Grace of Happy Death" },
          { title: "5. Coronation of Mary", fruit: "Trust in Mary's Crown" }
        ]
      },
      luminous: {
        name: "The Luminous Mysteries (Thursdays)",
        beads: [
          { title: "1. Baptism in the Jordan", fruit: "Openness to Holy Spirit" },
          { title: "2. Wedding at Cana", fruit: "To Jesus through Mary" },
          { title: "3. Proclamation of Kingdom", fruit: "Repentance & Trust" },
          { title: "4. The Transfiguration", fruit: "Desire for Holiness" },
          { title: "5. Institution of Eucharist", fruit: "Adoration & Thanksgiving" }
        ]
      }
    };

    // Determine Day & Mystery automatically
    function initRosary() {
      const dayIndex = new Date().getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      let key = 'joyful';
      if (dayIndex === 1 || dayIndex === 6) key = 'joyful';
      else if (dayIndex === 2 || dayIndex === 5) key = 'sorrowful';
      else if (dayIndex === 3 || dayIndex === 0) key = 'glorious';
      else if (dayIndex === 4) key = 'luminous';

      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      document.getElementById('today-day-label').innerText = "Today (" + daysOfWeek[dayIndex] + ") Holy Rosary";
      selectMystery(key);
    }

    function selectMystery(key) {
      const data = mysteriesData[key];
      if (!data) return;

      document.getElementById('current-mystery-name').innerText = data.name;

      // Update tabs
      document.querySelectorAll('.mystery-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-day') === key);
      });

      // Render beads
      const container = document.getElementById('mystery-beads-container');
      container.innerHTML = '';
      data.beads.forEach((bead, idx) => {
        const card = document.createElement('div');
        card.className = 'mystery-bead-card';
        card.innerHTML = `
          <div class="bead-number">${idx + 1}</div>
          <h5>${bead.title}</h5>
          <p>Fruit: ${bead.fruit}</p>
        `;
        container.appendChild(card);
      });
    }

    // Tessera Tab Switcher
    function switchTesseraTab(tabId) {
      document.querySelectorAll('.tessera-tab-item').forEach((tab, index) => {
        const tabKeys = ['opening', 'catena', 'concluding'];
        tab.classList.toggle('active', tabKeys[index] === tabId);
      });

      document.getElementById('tessera-tab-opening').style.display = (tabId === 'opening') ? 'block' : 'none';
      document.getElementById('tessera-tab-catena').style.display = (tabId === 'catena') ? 'block' : 'none';
      document.getElementById('tessera-tab-concluding').style.display = (tabId === 'concluding') ? 'block' : 'none';
    }

    let currentFontSize = 16;
    function adjustFontSize(delta) {
      currentFontSize = Math.min(24, Math.max(13, currentFontSize + delta));
      document.getElementById('tessera-body').style.fontSize = currentFontSize + 'px';
    }

    // Membership Vocation Quiz
    let selectedQuizType = null;
    function answerQuiz(hasTime) {
      const resultBox = document.getElementById('quiz-result-box');
      const title = document.getElementById('quiz-result-title');
      const desc = document.getElementById('quiz-result-desc');

      if (hasTime) {
        selectedQuizType = "Active Membership";
        title.innerHTML = "✦ Recommended: <strong>Active Legionary</strong>";
        desc.innerText = "You have the capacity to join us on Tuesdays at 7:00 PM and participate in two-by-two apostolates like Pilgrim Virgin statue visits and caring for seniors in Milton. You will be welcomed as a probationary member with a mentor!";
      } else {
        selectedQuizType = "Auxiliary Membership";
        title.innerHTML = "✦ Recommended: <strong>Auxiliary (Prayer) Member</strong>";
        desc.innerText = "Your prayerful intercession is deeply needed! As an Auxiliary member, you pray the Holy Rosary and Tessera prayers daily from home. You provide the vital spiritual support that empowers active works.";
      }
      resultBox.style.display = 'block';
    }

    function applyQuizResult() {
      if (selectedQuizType) {
        const contactSelect = document.getElementById('contact-type');
        if (contactSelect) {
          contactSelect.value = selectedQuizType;
        }
        window.location.hash = '#contact';
      }
    }

    // Statue Form Handler
    function handleStatueSubmit(e) {
      e.preventDefault();
      const firstName = document.getElementById('statue-first-name').value;
      const lastName = document.getElementById('statue-last-name').value;
      const parish = document.getElementById('statue-parish').value;
      const duration = document.getElementById('statue-duration').value;
      const address = document.getElementById('statue-address').value;
      const phone = document.getElementById('statue-phone').value;

      const randomId = "LOM-FATIMA-" + Math.floor(1000 + Math.random() * 9000);

      const modalContent = document.getElementById('modal-details-content');
      modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
          <strong>Booking Reference:</strong>
          <span style="font-family: monospace; color: var(--gold-dark); font-weight: bold;">${randomId}</span>
        </div>
        <div style="margin-bottom: 0.4rem;"><strong>Host Family:</strong> ${firstName} ${lastName}</div>
        <div style="margin-bottom: 0.4rem;"><strong>Parish:</strong> ${parish}</div>
        <div style="margin-bottom: 0.4rem;"><strong>Address in Milton:</strong> ${address}</div>
        <div style="margin-bottom: 0.4rem;"><strong>Duration:</strong> ${duration}</div>
        <div><strong>Contact Phone:</strong> ${phone}</div>
      `;

      document.getElementById('booking-modal').style.display = 'flex';
      e.target.reset();
    }

    function closeModal() {
      document.getElementById('booking-modal').style.display = 'none';
    }

    // Contact Form Handler
    function handleContactSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const type = document.getElementById('contact-type').value;

      alert(`Thank you, ${name}! Your submission regarding "${type}" has been received. Our Lady of Fatima Praesidium will keep your intention in our prayers and contact you soon.`);
      e.target.reset();
    }

    // Mobile Navigation Toggle
    document.getElementById('mobile-toggle').addEventListener('click', function() {
      const navLinks = document.getElementById('nav-links');
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#ffffff';
        navLinks.style.padding = '1.5rem';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      }
    });

    // Run on load
    window.addEventListener('DOMContentLoaded', () => {
      initRosary();
    });