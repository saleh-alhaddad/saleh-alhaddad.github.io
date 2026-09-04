/* Dark pass-card site: minimal JS.
   Years of experience are never hardcoded: the Liquid include renders a
   build-time value and this refreshes it on load, because GitHub Pages
   only rebuilds on push. */
const CAREER_START = '2018-06-01';

function yearsSince(startISO, now) {
  // Local midnight, not UTC: browsers behind UTC would land a day early
  // and lose a year on the anniversary itself.
  const start = new Date(startISO + 'T00:00:00');
  if (isNaN(start.getTime())) return null;
  let years = now.getFullYear() - start.getFullYear();
  const m = now.getMonth() - start.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < start.getDate())) years -= 1;
  return years < 0 ? null : years;
}

function updateExperienceYears() {
  const now = new Date();
  document.querySelectorAll('.calc-years').forEach(function (el) {
    const y = yearsSince(el.getAttribute('data-career-start') || CAREER_START, now);
    if (y !== null) el.textContent = String(y);
  });
}

document.addEventListener('DOMContentLoaded', updateExperienceYears);
window.portfolioFunctions = { yearsSince, updateExperienceYears };
